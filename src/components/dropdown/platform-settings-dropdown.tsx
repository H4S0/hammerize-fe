import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Link, Menu, Trash } from 'lucide-react';

const PlatformSettingsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Platform chat settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between">
          View summaries
          <Link />
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-between">
          Delete
          <Trash />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlatformSettingsDropdown;
