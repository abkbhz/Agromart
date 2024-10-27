"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.svg';

export default function Header() {
    const router = useRouter();

    const handleNavigation = (path: string, from: string) => {
        router.push(`${path}?from=${from}`);
    };
    return(
        <nav className="flex items-center justify-between p-4 ">
        <Link href="/" className="text-l font-semibold text-green-700 flex items-center pl-12">
          <Image src={ logo } width={200} height={10} alt="Agrevo Logo" />
        </Link>

        <div className="flex items-center justify-center gap-20 border-b p-8">
          <button
            onClick={() => router.push('/shop')}
            className="text-gray-600 hover:text-gray-900"
          >
            Shop
          </button>
          <button
            onClick={() => router.push('/for_farmers')} className="text-gray-600 hover:text-gray-900">
            For Farmers
          </button>
          <button
            onClick={() => router.push('/contact')}
            className="text-gray-600 hover:text-gray-900"
          >
            Contact Us
          </button>
          <button onClick={() => handleNavigation('/login', '/')} className="inline-block bg-yellow-700 text-white px-9 py-3 rounded-full text-lg font-semibold hover:bg-yellow-800 transition-colors">
              Login
          </button>
        </div>
      </nav>
    );
}