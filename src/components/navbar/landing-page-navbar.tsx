import { Link } from '@tanstack/react-router';
import HammerizeLogo from '../../../public/hammerize-logo-png.png';
import { Button } from '../ui/button';

const LandingPageNavbar = () => {
  return (
    <div className="flex items-center justify-between h-12 mx-auto max-w-7xl">
      <div className="flex items-center">
        <img
          src={HammerizeLogo}
          alt="hammerize-logo"
          className="w-10 h-10 md:w-25 md:h-25 object-contain"
        />
        <p className="text-lg font-semibold">Hammerize.ai</p>
      </div>

      <Link to="/login">
        <Button size="sm">Get started</Button>
      </Link>
    </div>
  );
};

export default LandingPageNavbar;
