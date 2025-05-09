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
          <h2 className="font-script text-primary text-5xl mb-6">Hello!</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl font-playfair mb-2">November 20th, 2024, New York, USA</p>
            <p className="text-gray-600">We would love to have you join our special day</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-primary/20">
              <Image 
                src="https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Fandi" 
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="font-script text-primary text-3xl mb-2">Fandi Johnson</h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              Daughter of Mr. and Mrs. Johnson, Fandi is a creative soul with a passion for art and nature.
            </p>
          </div>

          <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-primary/20">
              <Image 
                src="https://images.pexels.com/photos/1982852/pexels-photo-1982852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Vivi" 
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="font-script text-primary text-3xl mb-2">Vivi Martinez</h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              Daughter of Mr. and Mrs. Martinez, Vivi is a dedicated educator with a love for literature and travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}