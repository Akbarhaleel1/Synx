// // Nav.jsx
// import { useState } from 'react';
// import logo from '../assets/images/logo.png';
// import reviewLogo from '../assets/images/reviewLogo.png';
// import menuBar from '../assets/images/menuBar.png';

// const Nav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const navItems = [
//     { name: 'Reviews', href: '/reviews' },
//     { name: 'Get Reviews', href: '/GetReviews' },
//     { name: 'Review Link', href: '/EditReviews' },
//     { name: 'Analytics', href: '/analytics' },
//     { name: 'Automate with AI', href: '/reviews' },
//     { name: 'Integrations', href: '/integrations' },
//   ];

//   const bottomItems = [
//     { name: 'Settings', href: '/reviews' },
//     { name: 'Logout', href: '/reviews' },
//   ];

//   const NavItem = ({ item }) => (
//     <a href={item.href} className='flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md'>
//       <img src={reviewLogo} alt={item.name} width={22} className='w-5 h-5'/>
//       <p className='text-white text-sm'>{item.name}</p>
//     </a>
//   );

//   return (
//     <header>
//       {/* Desktop Navigation */}
//       <nav className="fixed h-screen w-64 p-6 bg-black hidden lg:block">
//         <img src={logo} alt="headerLogo" className='w-24 mb-12' />
//         <div className='space-y-4 mb-12'>
//           {navItems.map((item, index) => (
//             <NavItem key={index} item={item} />
//           ))}
//         </div>
//         <div className='absolute bottom-6 left-6 space-y-4'>
//           {bottomItems.map((item, index) => (
//             <NavItem key={index} item={item} />
//           ))}
//         </div>
//       </nav>

//       {/* Mobile Navigation */}
//       <div className="lg:hidden">
//         {!isMenuOpen && (
//           <button
//             className='fixed top-2 right-4 z-50 p-2'
//             onClick={toggleMenu}
//           >
//             <img src={menuBar} alt="Menu" className='w-8 h-8' />
//           </button>
//         )}

//         {isMenuOpen && (
//           <nav className="fixed inset-0 bg-black z-40 p-6">
//             <div className="flex justify-between items-center mb-12">
//               <img src={logo} alt="headerLogo" className='w-24' />
//               <button onClick={toggleMenu} className="text-white text-2xl">&times;</button>
//             </div>
//             <div className='space-y-4 mb-12'>
//               {navItems.map((item, index) => (
//                 <NavItem key={index} item={item} />
//               ))}
//             </div>
//             <div className='space-y-4 mt-auto'>
//               {bottomItems.map((item, index) => (
//                 <NavItem key={index} item={item} />
//               ))}
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Nav;

import { useState } from 'react';
import logo from '../assets/images/logo.png';
import reviewLogo from '../assets/images/reviewLogo.png';
import menuBar from '../assets/images/menuBar.png';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Reviews', href: '/reviews' },
    { name: 'Get Reviews', href: '/GetReviews' },
    { name: 'Review Link', href: '/EditReviews' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Automate with AI', href: '/reviews' },
    { name: 'Integrations', href: '/integrations' },
  ];

  const bottomItems = [
    { name: 'Settings', href: '/reviews' },
    { name: 'Logout', href: '/reviews' },
  ];

  const NavItem = ({ item }) => (
    <a href={item.href} className='flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md'>
      <img src={reviewLogo} alt={item.name} width={22} className='w-5 h-5'/>
      <p className='text-white text-sm'>{item.name}</p>
    </a>
  );

  return (
    <header>
      {/* Desktop Navigation - Kept fixed as in the original */}
      <nav className="fixed h-screen w-64 p-6 bg-black hidden lg:block">
        <img src={logo} alt="headerLogo" className='w-24 mb-12' />
        <div className='space-y-4 mb-12'>
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
        <div className='absolute bottom-6 left-6 space-y-4'>
          {bottomItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Changed to be scrollable */}
      <div className="lg:hidden">
        <button
          className='fixed top-2 right-4 z-50 p-2'
          onClick={toggleMenu}
        >
          <img src={menuBar} alt="Menu" className='w-8 h-8' />
        </button>
        {isMenuOpen && (
          <nav className="absolute inset-0 bg-black z-40 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-12">
              <img src={logo} alt="headerLogo" className='w-24' />
              <button onClick={toggleMenu} className="text-white text-2xl">&times;</button>
            </div>
            <div className='space-y-4 mb-12'>
              {navItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
            <div className='space-y-4 mt-12'>
              {bottomItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Nav;