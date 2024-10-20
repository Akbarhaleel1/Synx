
import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import menuBar from '../assets/images/menuBar.png';
import { useNavigate } from 'react-router-dom';
import CompanyNameModal from '../sections/components/CompanyNameModal';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyModal, setCompanyModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    const user = JSON.parse(getUser);
    console.log('user is', user.companyname);
    let cName = user.companyname
    if(!cName || cName.trim() === ""){
      setCompanyModal(true); 
    return
    }
    setCompanyName(user.companyname);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Reviews', href: '/reviews', icon: 'https://img.icons8.com/?size=100&id=WLXjp8v1lQpQ&format=png&color=FFFFFF' },
    { name: 'Get Reviews', href: '/GetReviews', icon: 'https://img.icons8.com/?size=100&id=12631&format=png&color=FFFFFF' },
    { name: 'Review Link', href: '/EditReviews', icon: 'https://img.icons8.com/?size=100&id=7867&format=png&color=FFFFFF' },
    { name: 'Analytics', href: '/analytics', icon: 'https://img.icons8.com/?size=100&id=wdfmkgweCGDk&format=png&color=FFFFFF' },
    { name: 'Utility', href: '/UtilityPage', icon: 'https://img.icons8.com/ios/50/FFFFFF/ai.png' },
    { name: 'Automate with AI', href: '/AiFeature', icon: 'https://img.icons8.com/?size=100&id=gYcGVfx0I1jc&format=png&color=FFFFFF' },
    { name: 'Integrations', href: '/integrations', icon: 'https://img.icons8.com/?size=100&id=sLJTHeCEleTd&format=png&color=FFFFFF' },
  ];

  const bottomItems = [
    { name: 'Negative Reviews', href: '/negetiveReview', icon: 'https://img.icons8.com/?size=100&id=77574&format=png&color=FFFFFF' },
    { name: 'Logout', href: '/login', icon: 'https://img.icons8.com/?size=100&id=8119&format=png&color=FFFFFF' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCloseModal = ()=>{
    console.log('handleCloseModal')
  }

  const NavItem = ({ item }) => (
    <div
      onClick={() => navigate(item.href)}
      className='flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer'
    >
      <img src={item.icon} alt={item.name} width={22} className='w-5 h-5' />
      <p className='text-white text-sm'>{item.name}</p>
    </div>
  );

  return (
    <header>
      <style>
        {`
          @keyframes colorShift {
            0%, 100% {
              color: rgb(174, 233, 137);
              text-shadow: 0 0 5px rgba(174, 233, 137, 0.5);
            }
            50% {
              color: rgb(137, 220, 235);
              text-shadow: 0 0 10px rgba(137, 220, 235, 0.7);
            }
          }
          .animate-colorShift {
            animation: colorShift 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
      <nav className="fixed h-screen w-64 p-6 bg-black hidden lg:block">
        <img src={logo} alt="headerLogo" className='w-24 mb-12' />
        <h1
         
          className="text-white text-2xl font-bold ml-[50px] mt-[40px] mb-[26px] animate-colorShift animate-float"
        >
          {companyName}
        </h1>
        <div className='space-y-4 mb-12'>
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
        <div className='absolute bottom-6 left-6 space-y-4'>
          {bottomItems.map((item, index) => (
            <div key={index} onClick={item.name === 'Logout' ? handleLogout : () => navigate(item.href)}>
              <NavItem item={item} />
            </div>
          ))}
        </div>
      </nav>
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
                <div key={index} onClick={item.name === 'Logout' ? handleLogout : () => navigate(item.href)}>
                  <NavItem item={item} />
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
      <CompanyNameModal isOpen={companyModal} onClose={handleCloseModal} />

    </header>
  );
};

export default Nav;
