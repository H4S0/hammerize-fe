import { Link } from '@tanstack/react-router';
import {
  Bot,
  Key,
  LayoutPanelLeft,
  MessageSquareMore,
  Settings,
} from 'lucide-react';
import React from 'react';

const dashboardMainNavbarItems = [
  {
    icon: <LayoutPanelLeft size={15} />,
    label: 'Overview',
    link: '',
  },
  {
    icon: <MessageSquareMore size={15} />,
    label: 'Summaries',
    link: '',
  },
  {
    icon: <Bot size={15} />,
    label: 'Bots',
    link: '',
  },
  {
    icon: <Key size={15} />,
    label: 'Keys',
    link: '',
  },
  {
    icon: <Settings size={15} />,
    label: 'Settings',
    link: '',
  },
];
const DashboardMainNavbar = () => {
  return (
    <div className="flex items-center gap-5 py-5">
      {dashboardMainNavbarItems.map((item) => (
        <Link
          to={item.link}
          key={item.label}
          className="flex items-center gap-2 hover:bg-primary/20 rounded-md px-2 py-1 text-muted-foreground hover:text-black "
        >
          {item.icon}
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardMainNavbar;
