// app/page.tsx
"use client"

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import riceimg from '@/public/rice1.jpg'
import farm1 from '@/public/farmer_consumer.png'
import farm2 from '@/public/farmer_brand.png'
import { Playfair_Display } from 'next/font/google';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Header from '@/components/header';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function HomePage() {
  const router = useRouter();

  const handleNavigation = (path: string, from: string) => {
    router.push(`${path}?from=${from}`);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}

      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 px-6 lg:px-16 py-12">
          <div className="max-w-xl mx-auto lg:mx-0 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Harvest the benefits of buying directly from farmers
            </h1>
            <p className="text-xl text-green-700">
              Fresh produce, honest prices, and real relationships with the people who grow your food.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => handleNavigation('/login', '/')}
                className="px-8 py-3 bg-green-700 text-white rounded-full text-lg font-medium hover:bg-green-800 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12">
          <Image
            src={riceimg}
            width={600}
            height={400}
            alt="Organic rice products"
            className="rounded-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Direct to Consumer Sales Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <Image
                src={farm1}
                width={600}
                height={400}
                alt="Farmer holding a crate of fresh strawberries"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Direct to Consumer Sales
              </h2>
              <p className="text-xl text-gray-600">
                Farmers can bypass middlemen, selling directly to consumers and bulk buyers for fairer prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Alliances Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2">
              <Image
                src={farm2}
                width={600}
                height={400}
                alt="Farmer holding a smartphone with Agrevo app"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Brand Alliances for Farmers
              </h2>
              <p className="text-xl text-gray-600">
                By partnering with brands, farmers can strengthen their market presence and value.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
      {/* Footer */}
      <footer className="bg-green-700 text-white py-12 px-6">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Agrevo</h3>
              <p>Connecting farmers and consumers for a sustainable future.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/shop" className="hover:underline">Shop</Link></li>
                <li><Link href="/farmers" className="hover:underline">For Farmers</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>

              <p>Kollam, Amritapuri</p>
              <p>Email: entropy@mail.com</p>
              <p>Phone: (+91) 9888466111</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center">
            <p>&copy; 2024 Agrevo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

    // <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-100">
    //   <h1 className="text-3xl font-bold mb-8">Welcome to Agromart</h1>
    //   <button
    //     onClick={() => handleNavigation('/login', '/')}
    //     className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
    //   >
    //     Shop
    //   </button>
    //   <button
    //     onClick={() => handleNavigation('/for_farmers', '/')}
    //     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
    //   >
    //     Farmer
    //   </button>
    // </div>
  );
}
