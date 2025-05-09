import Link from 'next/link';
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="font-script text-3xl text-primary">
            Fandi & Vivi
          </Link>
          <p className="mt-2 text-white/70">November 20th, 2024</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          {[
            { icon: <Instagram size={18} />, href: "#" },
            { icon: <Facebook size={18} />, href: "#" },
            { icon: <Twitter size={18} />, href: "#" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="text-white/70 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <div className="text-center text-white/50 text-sm">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart size={14} className="text-primary fill-current" /> for our special day
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Fandi & Vivi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}