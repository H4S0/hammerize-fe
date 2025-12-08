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
        <DropdownMenuLabel className="flex flex-col items-start justify-between gap-3">
          Theme
          <DropdownMenuGroup className="flex items-center justify-around gap-3 text-muted-foreground w-full">
            <MonitorCog size={20} />
            <Moon size={20} />
            <MonitorCog size={20} />
          </DropdownMenuGroup>
        </DropdownMenuLabel>
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
