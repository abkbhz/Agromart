"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import f1 from '@/public/happy_farmer.png';
import { ChevronRight, Sprout, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from '@/components/footer';

const ForFarmers = () => {
  const router = useRouter();
  const handleNavigation = (path: string, from: string) => {
    router.push(`${path}?from=${from}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Subtle improvements */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" width={120} height={20} alt="Agrevo Logo" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Shop</Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors duration-200">About</Link>
            <Link href="/farmers" className="text-green-600 font-semibold">For Farmers</Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero section - Enhanced contrast and spacing */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[80vh] md:h-[88.5vh] order-2 md:order-1">
          <div className="relative h-full w-full overflow-hidden">
            <Image  
              src={f1}
              alt="Happy farmer in a field"
              layout="fill"
              objectFit="cover"
              className="contrast-125 brightness-105 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-green-900/30 mix-blend-multiply"></div>
          </div>
        </div>

        <div className="flex items-center justify-center order-1 md:order-2 min-h-[90vh] bg-gradient-to-br from-gray-50 to-white">
          <div className="px-8 md:px-12 lg:px-16 py-12 max-w-xl">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Empower Your Farm with Agrevo
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join our network of passionate farmers and revolutionize the way you connect with consumers.
                Grow your business, increase your profits, and contribute to sustainable agriculture.
              </p>
              <Button
                onClick={() => handleNavigation('/login', '/for_farmers')}
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl w-full md:w-auto group"
              >
                Join Agrevo Today 
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Why Partner section - Improved spacing and contrast */}
        <section className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Why Partner with Us?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Agrevo, we believe in empowering farmers and creating a sustainable future for agriculture.
              Our platform provides you with the tools and resources you need to thrive in the modern market.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Our Commitment</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're dedicated to supporting local farmers and promoting sustainable agricultural practices.
              By joining Agrevo, you become part of a movement that values fair prices, quality produce, and
              direct farmer-to-consumer relationships.
            </p>
          </div>
        </section>

        {/* Benefits section - Enhanced cards */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Benefits for Farmers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sprout, title: "Direct Market Access", desc: "Connect directly with consumers and sell your produce without intermediaries." },
              { icon: TrendingUp, title: "Increased Profits", desc: "Earn more by setting your own prices and reducing supply chain costs." },
              { icon: Users, title: "Community Support", desc: "Join a network of like-minded farmers and share knowledge and resources." },
              { icon: Zap, title: "Technology Integration", desc: "Access modern tools and analytics to optimize your farming operations." }
            ].map((item, i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <item.icon className="h-10 w-10 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <CardTitle className="text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default ForFarmers;