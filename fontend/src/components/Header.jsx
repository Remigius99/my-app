import { FaGlobe, FaShoppingCart, FaUser } from 'react-icons/fa';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
      {/* Logo/Title */}
      <h1 className="text-lg sm:text-xl font-bold text-blue-700 flex-shrink-0 font-tesla tracking-wide uppercase">
        KIGAGULA ELECTRONICS SUPPLIER
      </h1>

      {/* Search input */}
      <div className="w-full sm:flex-1 sm:mx-6 sm:max-w-md mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search for electric kettle products..."
          className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex justify-end gap-4 text-gray-600 text-lg mt-2 sm:mt-0">
        <FaGlobe className="cursor-pointer hover:text-blue-500" title="Language" />
        <FaShoppingCart className="cursor-pointer hover:text-blue-500" title="Cart" />
        <FaUser className="cursor-pointer hover:text-blue-500" title="Sign In" />
      </div>
    </header>
  );
}

export default Header;
