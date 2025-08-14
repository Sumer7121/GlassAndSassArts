import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

// Import artist portraits and artwork
import patPortrait from '../assets/3.png'
import patArtwork1 from '../assets/9.png'
import patArtwork2 from '../assets/10.png'
import patArtwork3 from '../assets/11.png'

import DiannePortrait from '../assets/2.png'
import DianneArt1 from '../assets/6.png'
import DianneArt2 from '../assets/7.png'
import DianneArt3 from '../assets/8.png'

import JimPortrait from '../assets/1.png'
import JimArt1 from '../assets/12.png'
import JimArt2 from '../assets/4.png'
import JimArt3 from '../assets/5.png'

const About = () => {
  return (
    <div>

      {/* Meet the Artists Section */}
      <div className="text-2xl text-center py-10 border-t">
        <Title text1={'MEET THE'} text2={'ARTISTS'} />
        <p className="text-gray-600 text-base mt-2">Discover the creative minds behind our unique collection</p>
      </div>

      <div className="space-y-20 pb-20">
        {/* Pat */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex gap-6 items-center">
            <img src={patPortrait} alt="Pat the Artist" className="w-32 h-32 object-cover rounded-full" />
            <div>
              <h3 className="text-xl font-semibold">Pat</h3>
              <p className="text-gray-500">Mixed Media Artist</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">Artist Statement</h4>
            <p className="text-gray-600 mt-2">
              I have always enjoyed the art of others as well as engaging in various mediums myself.
              When transitioning into retirement I was lucky enough to have taken a workshop under Dianne in fused glass art in our local community.
              I have taken many of her workshops and enjoyed pushing myself to attempt new challenges.
              Some of my projects I consider successful and then there are those that fall under the category of a learning experience.
              Both are extremely rewarding and expand my knowledge base.
              I retired from the military at age 60, and still maintain some work in clinical social work, but glass art is my current focus.
              I have three studio areas devoted to supporting my art projects and over the past year I have literally transitioned our garage into a fourth supporting studio.
              The garage not only houses my three larger kilns, but also contains the welders, a plasma cutter and other metal fabrication tools needed to build metal stands/fames for the larger pieces of glass art and to experiment with some metal sculpture.
              I learned these skills over the past year thanks to some patient and helpful employees at a local welding supply business!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img 
               src={patArtwork1} 
               alt="Pat's Artwork 1" 
              className="transform scale-y-[0.76] -translate-y-[52px] object-cover rounded"
            />
            <img src={patArtwork2} alt="Pat's Artwork 2" />
            <img src={patArtwork3} alt="Pat's Artwork 3" />
          </div>
        </div>

        {/* Dianne */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex gap-6 items-center">
            <img src={DiannePortrait} alt="Dianne the Glass Artist" className="w-32 h-32 object-cover rounded-full" />
            <div>
              <h3 className="text-xl font-semibold">Dianne</h3>
              <p className="text-gray-500">Glass Artist</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">Journey into Glass Art</h4>
            <p className="text-gray-600 mt-2">
              I hijacked my husband’s glass tools, glass, and other supplies years ago,
              and I’m not sorry! Beginning with stained glass, the glass-cutting both
              challenged and frustrated me as I learned the art. Eventually, the glass-
              cutter and I agreed to work in harmony. I discovered that I enjoyed the
              solitude found in copper foiling a project as it afforded me quiet time to
              contemplate the vagaries of life. Soldering was another challenge until I
              bought a quality soldering iron. I was on my way to many years of creating
              suncatchers, window panels, and lamps.
            </p>
            <p className="text-gray-600 mt-2">
              Wanting to create 3-D glass art, I embarked on another learning curve. As a retired high school
              English teacher, I believe in being a lifelong learner so I jumped in. Books by acclaimed glass
              fusers, online tutorials, and some in-person workshops were priceless in my new found love. I
              particularly enjoy creating a variety of fused glass art, whether it is functional or decorative. As a
              member of a gallery that has a great workroom, I offer workshops and share my love of glass as
              often as I can.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <img src={DianneArt1} alt="Dianne's Glass Art 1" />
            <img src={DianneArt2} alt="Dianne's Glass Art 2" />
            <img src={DianneArt3} alt="Dianne's Glass Art 3" />
            {/* Optionally add a fourth image if you have one */}
          </div>
        </div>

        {/* Jim */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex gap-6 items-center">
            <img src={JimPortrait} alt="Jim the Woodturner" className="w-32 h-32 object-cover rounded-full" />
            <div>
              <h3 className="text-xl font-semibold">Jim</h3>
              <p className="text-gray-500">Woodturner & Craftsman</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">Hands on with Woodturning</h4>
            <p className="text-gray-600 mt-2">
              Upon retiring from a career in production, project management, and engineering, I knew that just
              stopping work at retirement would not be for me. I enjoy working with my hands to create
              something. Since my father and both grandfathers had been into woodworking, it seems to be in
              my genes as well. Over the years with minimal tools available, I built some furniture for us and
              others. In 2017, I started putting together my dream woodworking shop to play in while my wife
              spent time in her glass studio. I create flat work as well as turnings. Most of the wood I use comes
              from fallen or dead trees on our property.
            </p>
            <p className="text-gray-600 mt-2">
              I enjoy wood turning because it allows me to be more creative as sycamore, walnut, hackberry,
              cherry, and oak behave differently. I may start off with one design and end up with something
              completely different. That’s fun for me and relatively stress free since I do not have a rigid design
              that I need to adhere to. Surprisingly, I find that other people like my work! Now, I am looking
              for an avenue to get my woodturning out there so it doesn’t wind up on the burn pile.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img src={JimArt1} alt="Jim's Woodwork 1" />
            <img src={JimArt2} alt="Jim's Woodwork 2" />
            <img src={JimArt3} alt="Jim's Woodwork 3" />
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
