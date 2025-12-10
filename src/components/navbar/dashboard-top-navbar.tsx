import HammerizeLogo from '../../../public/hammerize-logo-png.png';
import UserDropdown from '../dropdown/user-dropdown';

const DashboardTopNavbar = () => {
  return (
    <div className="flex items-center justify-between h-12">
      <div className="flex items-center">
        <img
          src={HammerizeLogo}
          alt="hammerize-logo"
          className="w-10 h-10 md:w-25 md:h-25 object-contain"
        />
        <p className="text-lg font-semibold">Hammerize.ai</p>
      </div>

      <UserDropdown />
    </div>
  );
};

export default DashboardTopNavbar;
