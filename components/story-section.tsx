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
      date: "March 2012",
      image: "/images/together.jpeg",
      description: "We first met in junior high school. We were in the same class and became fast friends. We would sit together during lunch and recess, and we would study together for exams."
    },
    {
      title: "First Date",
      date: "June 2018",
      image: "/images/together.jpeg",
      description: "After graduating from high school, we started dating. We would go on dates to the movies and try out new restaurants. We loved trying new foods and drinks together."
    },
    {
      title: "In a Relationship",
      date: "October 2022",
      image: "/images/together.jpeg",
      description: "We started college and began living together. We would study together and go on adventures on the weekends. We loved exploring new places and trying new things together."
    },
    {
      title: "The Proposal",
      date: "January 2025",
      image: "/images/together.jpeg",
      description: "After graduating from college, we started working. I proposed to her on a romantic getaway to Bekasi. I took her to a beautiful restaurant overlooking the city, and I got down on one knee and asked her to be my wife."
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
                <p className="text-primary text-1xl mb-3">{item.date}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}