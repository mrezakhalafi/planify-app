"use client";

import { useState, useEffect } from 'react';

export default function CountdownSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set wedding date - November 20, 2024
  const weddingDate = new Date('2024-11-20T14:00:00').getTime();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('countdown');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="countdown-gradient py-24 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-playfair">{timeLeft.days}</span>
            <p className="text-xl text-white/80 mt-2">days until our wedding</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="text-3xl font-bold">{timeLeft.hours}</span>
              <p className="text-sm text-white/80">Hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="text-3xl font-bold">{timeLeft.minutes}</span>
              <p className="text-sm text-white/80">Minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="text-3xl font-bold">{timeLeft.seconds}</span>
              <p className="text-sm text-white/80">Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}