import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Link as LinkIcon, Menu, Trash } from 'lucide-react';
import { deletePlatform } from '@/utils/api/platform';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

const PlatformSettingsDropdown = ({
  platformChatId,
}: {
  platformChatId: string;
}) => {
  const queryClient = useQueryClient();
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
          <Link
            to="/dashboard/bots-page/platform-page/$platformId"
            params={{ platformId: platformChatId }}
          >
            View summaries
            <LinkIcon />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between"
          onClick={async () => {
            try {
              const res = await deletePlatform({ platformChatId });
              toast.success(res.message);
              queryClient.invalidateQueries({
                queryKey: ['user-platform-chat'],
              });
            } catch (err) {
              if (isApiResponse(err)) {
                const apiError = err;

                toast.error(
                  apiError.message || 'Something went wrong please try again'
                );
              } else {
                toast.error(
                  'Something went wrong please,check your connection'
                );
              }
            }
          }}
        >
          Delete
          <Trash />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlatformSettingsDropdown;
