import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">© {currentYear} Bake Store. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-white text-sm">About Us</Link>
          <Link href="/contact" className="hover:text-white text-sm">Contact</Link>
          <Link href="/privacy" className="hover:text-white text-sm">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
