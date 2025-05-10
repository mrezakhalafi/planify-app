"use client";

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="hero-gradient min-h-screen flex flex-col items-center justify-center text-white relative"
    >
      <div className="container mx-auto px-4 py-20 text-center z-10">
        <div className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <p className="text-lg md:text-xl text-white/80 mb-8 font-mono">The Wedding of</p>
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-white mb-2">
            Fandi & Vivi
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 font-mono">
            Dear <strong>Reza</strong>, We're so excited to share this special moment with you ♥
          </p>
          
          <div className="flex justify-center space-x-4 my-8">
            {[
              { icon: <Instagram size={20} />, href: "#" },
              { icon: <Facebook size={20} />, href: "#" },
              { icon: <Twitter size={20} />, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="bg-primary/90 hover:bg-primary text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <Button 
            variant="default" 
            className="bg-white text-primary font-bold hover:bg-primary hover:text-white mt-4 rounded-full px-8 py-6 text-md shadow font-mono"
          >
            <Mail size={20} className="mr-2 font-bold" />
            OPEN INVITATION
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a 
          href="#details" 
          className="text-white animate-bounce"
          aria-label="Scroll down"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}