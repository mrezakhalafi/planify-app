"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Our first date",
      wide: true,
      tall: false
    },
    {
      src: "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Sunset walk on the beach",
      wide: false,
      tall: true
    },
    {
      src: "https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Beautiful sunrise",
      wide: false,
      tall: false
    },
    {
      src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Weekend getaway",
      wide: true,
      tall: true
    },
    {
      src: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Proposal day",
      wide: false,
      tall: false
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="font-script text-primary text-5xl mb-6">Wedding Gallery</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            A collection of our favorite memories together as we prepare for our special day.
          </p>
        </div>

        <div className="gallery-container max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`gallery-item bg-white p-3 shadow-md rounded-lg overflow-hidden 
                ${image.wide ? 'wide' : ''} 
                ${image.tall ? 'tall' : ''}
                ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-end justify-start p-4 opacity-0 hover:opacity-100">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}