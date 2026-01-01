import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { NewPasswordSchema, unlinkAndSetPassword } from '@/utils/api/user';
import { isApiResponse } from '@/utils/axios-config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import SharedPasswordFields from '../shared-fields/password-field';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useQueryClient } from '@tanstack/react-query';

const UnlinkPasswordContent = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof NewPasswordSchema>> = async (
    data
  ) => {
    try {
      const res = await unlinkAndSetPassword(data);
      toast.success(res.message);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      form.reset();
    } catch (err) {
      if (isApiResponse(err)) {
        const apiError = err;

        toast.error(
          apiError.message || 'Something went wrong please try again'
        );
      } else {
        toast.error('Something went wrong please,check your connection');
      }
    }
  };

  return (
    <form id="form-rhf-link" onSubmit={form.handleSubmit(onSubmit)}>
      <SharedPasswordFields form={form} />

      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button variant="outline" size="sm">
            Cancle
          </Button>
        </DialogClose>
        <Button size="sm" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Spinner /> : 'Set password'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UnlinkPasswordContent;
