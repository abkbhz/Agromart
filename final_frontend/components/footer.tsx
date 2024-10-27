import Link from 'next/link';
const Footer = () => {
    return (
        <footer className="bg-green-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2024 Agrevo. All rights reserved.</p>
                <div className="mt-4">
                    <Link href="/privacy" className="hover:underline mr-4">Privacy Policy</Link>
                    <Link href="/terms" className="hover:underline mr-4">Terms of Service</Link>
                    <Link href="/contact" className="hover:underline">Contact Us</Link>
                </div>
            </div>
        </footer>

    );
};
export default Footer
