import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MonitorCog, Moon, Sun, User, UserCog } from 'lucide-react';
import { useAuth } from '@/utils/auth/auth';
import LogoutButton from '../buttons/logout-button';
import ThemeToggle from '../theme/theme-toggle';

const UserDropdown = () => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="px-2">
          <DropdownMenuLabel className="p-0">
            {user?.username}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-0">{user?.email}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ThemeToggle />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between">
          <UserCog />
          User settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
