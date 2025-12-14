import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { deletePlatform } from '@/utils/api/platform';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';

const DeleteServerModal = ({ serverId }: { serverId: string }) => {
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete server
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            server and remove all of you channels, same as summaries from our
            servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline" size="sm">
              Cancle
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
            onClick={async () => {
              try {
                const res = await deletePlatform({ serverId: serverId });
                toast.success(res.message);
                navigate({ to: '/dashboard/bots-page/bots' });
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
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
