"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function StorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('story');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const timeline = [
    {
      title: "First Met",
      date: "June 2020",
      image: "https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "We first met at a mutual friend's dinner party in Brooklyn. Fandi accidentally spilled wine on Vivi's dress, and their conversation started with apologies but ended with phone numbers exchanged."
    },
    {
      title: "First Date",
      date: "July 2020",
      image: "https://images.pexels.com/photos/4255483/pexels-photo-4255483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Our first date was at a small Italian restaurant in the West Village. What was planned as a quick dinner turned into a five-hour conversation about everything from childhood memories to future dreams."
    },
    {
      title: "In a Relationship",
      date: "October 2020",
      image: "https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "After a few wonderful months of dating, we made it official during a weekend trip to the Catskills. Under a star-filled sky, we realized we had found something special."
    },
    {
      title: "The Proposal",
      date: "December 2023",
      image: "https://images.pexels.com/photos/4611738/pexels-photo-4611738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "On a snowy evening in Central Park, Vivi proposed with a ring hidden inside a book of poetry - Fandi's favorite. Surrounded by twinkling holiday lights, we promised forever to each other."
    }
  ];

  return (
    <section id="story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="font-script text-primary text-5xl mb-6">Our Story</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            The story of how we met, fell in love, and decided to spend the rest of our lives together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              } ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-primary/20">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-playfair text-gray-800 mb-2">{item.title}</h3>
                <p className="text-primary font-medium mb-3">{item.date}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}