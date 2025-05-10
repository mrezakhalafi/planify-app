"use client";

import { useState, useEffect } from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function EventsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('events');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const events = [
    {
      title: "Main Ceremony",
      date: "June 20, 2024",
      time: "16:00 PM - 17:00 PM",
      location: "Rumah UI/UX",
      address: "Jl. Cluster Nirwana, RT.004/RW.003, Jatibening Baru, Bekasi",
      description: "Join us for our wedding ceremony where we will exchange vows and begin our journey together as a married couple."
    },
    {
      title: "Wedding Party",
      date: "June 20, 2024",
      time: "18:00 PM - 20:00 PM",
      location: "SMA Muhammadiyah 11",
      address: "Jl. Balai Pustaka Barat No.2 4, RT.4/RW.12, Rawamangun, East Jakarta",
      description: "After the ceremony, join us for dinner, dancing, and celebration at our wedding reception."
    }
  ];

  return (
    <section id="events" className="events-gradient py-20 text-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="font-script text-5xl mb-6">Wedding Events</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            We have planned the perfect day and would be delighted to have your company as we celebrate our love.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <div 
              key={index}
              className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 + index * 0.2}s` }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-playfair mb-4">{event.title}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CalendarDays className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-white/70 text-sm">{event.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-6 text-white/80 text-sm">{event.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}