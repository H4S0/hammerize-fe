import { cn } from '@/lib/utils';
import { Link, LinkProps, useLocation } from '@tanstack/react-router';
import { ReactElement } from 'react';
import {
  Bot,
  LayoutPanelLeft,
  MessageSquareMore,
  Settings,
} from 'lucide-react';

type NavbarItemsOptions = {
  icon: ReactElement;
  label: string;
  link: LinkProps['to'];
};

const dashboardMainNavbarItems: NavbarItemsOptions[] = [
  {
    icon: <LayoutPanelLeft size={18} />,
    label: 'Overview',
    link: '/dashboard/overview',
  },
  {
    icon: <MessageSquareMore size={18} />,
    label: 'Summaries',
    link: '/dashboard/summaries',
  },
  { icon: <Bot size={18} />, label: 'Bots', link: '/dashboard/bots-page/bots' },
  {
    icon: <Settings size={18} />,
    label: 'Settings',
    link: '/dashboard/user-settings',
  },
];

const DashboardMainNavbar = () => {
  const location = useLocation();

  return (
    <div className="flex sm:flex-row flex-row justify-around sm:justify-start items-center py-2 gap-0 sm:gap-5 w-full">
      {dashboardMainNavbarItems.map((item) => (
        <Link
          to={item.link}
          key={item.label}
          className={cn(
            'flex items-center gap-2 sm:gap-2 px-2 py-1 rounded-md text-muted-foreground hover:bg-primary/70 hover:text-white transition-colors duration-150',
            'sm:flex-row flex-col sm:w-auto w-full justify-center',
            item.link === location.href && 'bg-primary/70 text-white'
          )}
        >
          {item.icon}
          <span className="hidden sm:block">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default DashboardMainNavbar;
