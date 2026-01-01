import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updateUsername, UsernameUpdateSchema } from '@/utils/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import InstantFieldError from '../instant-field-error';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/utils/auth/auth';

const UpdateUsernameForm = ({ username }: { username: string }) => {
  const queryClient = useQueryClient();
  const { refetchUser } = useAuth();
  const form = useForm<z.infer<typeof UsernameUpdateSchema>>({
    resolver: zodResolver(UsernameUpdateSchema),
    defaultValues: {
      username: username,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UsernameUpdateSchema>> = async (
    data
  ) => {
    try {
      const res = await updateUsername(data);
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      await refetchUser();
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
    <Card>
      <CardHeader>
        <CardTitle>Username update</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-link" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input placeholder="test user" {...field} />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            className="mt-5 w-32"
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : 'Update username'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateUsernameForm;
