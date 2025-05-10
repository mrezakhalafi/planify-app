"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function DetailsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('details');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="details" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="font-script text-primary text-5xl mb-6">Hello Reza!</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl font-playfair mb-2">June 20th, 2025, Bekasi, Indonesia</p>
            <p className="text-gray-600">We would love to have you join our special day</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-primary/20">
              <Image 
                src="/images/fandi.jpeg" 
                alt="Fandi" 
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="font-script text-primary text-3xl mb-2">Fandi Setiadi</h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              The first and only child of one sibling <br/>(Born in 1998)
            </p>
          </div>

          <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-primary/20">
              <Image 
                src="/images/vivi.jpeg" 
                alt="Vivi" 
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="font-script text-primary text-3xl mb-2">Vivi Natasyah</h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              The first child of two siblings <br/>(Born in 1997)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}