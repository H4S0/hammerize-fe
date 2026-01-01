import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { NewPasswordSchema, updatePassword } from '@/utils/api/user';
import { isApiResponse } from '@/utils/axios-config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import SharedPasswordFields from '../shared-fields/password-field';

const UnlinkPasswordContent = ({ onCancle }: { onCancle: () => void }) => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof NewPasswordSchema>> = async (
    data
  ) => {
    try {
      const res = await updatePassword(data);
      toast.success(res.message);
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
      <div className="flex items-center justify-end gap-4">
        <Button className="mt-5" size="sm" variant="outline" onClick={onCancle}>
          Cancle
        </Button>
        <Button
          className="mt-5 w-32"
          size="sm"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <Spinner /> : 'Set password'}
        </Button>
      </div>
    </form>
  );
};

export default UnlinkPasswordContent;
