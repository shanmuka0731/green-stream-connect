
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/account" className="text-base text-gray-500 hover:text-gray-900">
              Account
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/settings" className="text-base text-gray-500 hover:text-gray-900">
              Settings
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Trash2Cash. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
