import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = (process.env.CURRENCY || "usd").toLowerCase();
const deliveryCharge = Number(process.env.DELIVERY_FEE || 10);

const getStripeClient = () => {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const getOrderItems = async (requestedItems) => {
    if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
        throw new Error("Your cart is empty.");
    }

    const normalizedItems = requestedItems.map((item) => ({
        productId: item.productId || item._id,
        quantity: Number(item.quantity),
        size: item.size || ""
    }));

    if (normalizedItems.some((item) => !item.productId || !Number.isInteger(item.quantity) || item.quantity < 1)) {
        throw new Error("The cart contains an invalid product or quantity.");
    }

    const products = await productModel.find({
        _id: { $in: normalizedItems.map((item) => item.productId) }
    });
    const productsById = new Map(products.map((product) => [String(product._id), product]));

    const items = normalizedItems.map((item) => {
        const product = productsById.get(String(item.productId));
        if (!product) throw new Error("A product in your cart is no longer available.");

        const availableSizes = Array.isArray(product.sizes) ? product.sizes : [];
        if (availableSizes.length && !availableSizes.includes(item.size)) {
            throw new Error("Choose an available option for " + product.name + ".");
        }

        return {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: item.size,
            quantity: item.quantity
        };
    });

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    return { items, amount: Number((subtotal + deliveryCharge).toFixed(2)) };
};

const placeOrder = async (req, res) => {
    try {
        const orderItems = await getOrderItems(req.body.items);
        const newOrder = await orderModel.create({
            userId: req.body.userId,
            items: orderItems.items,
            amount: orderItems.amount,
            address: req.body.address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        });

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        return res.json({ success: true, message: "Order placed", orderId: newOrder._id });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const placeOrderStripe = async (req, res) => {
    const stripe = getStripeClient();
    if (!stripe) {
        return res.status(503).json({ success: false, message: "Online payment is not configured yet." });
    }

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
        return res.status(503).json({ success: false, message: "The checkout return URL is not configured." });
    }

    let newOrder;
    try {
        const orderItems = await getOrderItems(req.body.items);
        newOrder = await orderModel.create({
            userId: req.body.userId,
            items: orderItems.items,
            amount: orderItems.amount,
            address: req.body.address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        });

        const lineItems = orderItems.items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));
        if (deliveryCharge > 0) {
            lineItems.push({
                price_data: {
                    currency,
                    product_data: { name: "Delivery" },
                    unit_amount: Math.round(deliveryCharge * 100)
                },
                quantity: 1
            });
        }

        const cleanFrontendUrl = frontendUrl.replace(/\/+$/, "");
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: cleanFrontendUrl + "/verify?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: cleanFrontendUrl + "/cart",
            metadata: {
                orderId: String(newOrder._id),
                userId: String(req.body.userId)
            }
        });

        newOrder.stripeSessionId = session.id;
        await newOrder.save();
        return res.json({ success: true, sessionUrl: session.url });
    } catch (error) {
        if (newOrder) await orderModel.findByIdAndDelete(newOrder._id);
        console.error("Stripe checkout setup failed:", error.message);
        return res.status(502).json({ success: false, message: "Could not start checkout. Please try again." });
    }
};

const verifyStripe = async (req, res) => {
    const stripe = getStripeClient();
    if (!stripe) {
        return res.status(503).json({ success: false, message: "Online payment is not configured yet." });
    }

    try {
        const sessionId = req.body.sessionId;
        if (!sessionId) {
            return res.status(400).json({ success: false, message: "Missing checkout session." });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid" || session.metadata?.userId !== String(req.body.userId)) {
            return res.status(400).json({ success: false, message: "Payment could not be verified." });
        }

        const order = await orderModel.findOneAndUpdate(
            { _id: session.metadata.orderId, userId: req.body.userId },
            { payment: true, stripePaymentIntentId: String(session.payment_intent || "") },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        return res.json({ success: true });
    } catch (error) {
        console.error("Stripe payment verification failed:", error.message);
        return res.status(400).json({ success: false, message: "Payment could not be verified." });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: "Order not found." });
        return res.json({ success: true, message: "Status updated" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
