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
import { deletePlatform } from '@/utils/api/platform';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { useQueryClient } from '@tanstack/react-query';

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
          View summaries
          <Link />
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
