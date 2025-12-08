import { cn } from '@/lib/utils';
import { Link, LinkProps, useLocation } from '@tanstack/react-router';
import { ReactElement } from 'react';
import {
  Bot,
  Key,
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
    icon: <LayoutPanelLeft size={15} />,
    label: 'Overview',
    link: '/dashboard/overview',
  },
  {
    icon: <MessageSquareMore size={15} />,
    label: 'Summaries',
    link: '/dashboard/summaries',
  },
  {
    icon: <Bot size={15} />,
    label: 'Bots',
    link: '/dashboard/bots',
  },
  {
    icon: <Settings size={15} />,
    label: 'Settings',
    link: '/dashboard/user-settings',
  },
];
const DashboardMainNavbar = () => {
  const location = useLocation();
  console.log('location', location);
  return (
    <div className="flex items-center gap-5 py-2">
      {dashboardMainNavbarItems.map((item) => (
        <Link
          to={item.link}
          key={item.label}
          className={cn(
            'flex items-center gap-2 hover:bg-primary/70 rounded-md px-2 py-1 text-muted-foreground hover:text-white',
            item.link === location.href && 'bg-primary/70 text-white'
          )}
        >
          {item.icon}
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardMainNavbar;
