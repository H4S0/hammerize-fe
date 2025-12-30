import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { EmailUpdateSchema, updateEmail } from '@/utils/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import InstantFieldError from '../instant-field-error';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';

const UpdateEmailForm = () => {
  const form = useForm<z.infer<typeof EmailUpdateSchema>>({
    resolver: zodResolver(EmailUpdateSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof EmailUpdateSchema>> = async (
    data
  ) => {
    try {
      const res = await updateEmail(data);
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
    <Card>
      <CardHeader>
        <CardTitle>Email address</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-link" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="oldEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Current email</FieldLabel>
                  <Input placeholder="text@example.ha" {...field} />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />

            <Controller
              name="newEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>New email</FieldLabel>
                  <Input placeholder="text@example.ha" {...field} />
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
            {form.formState.isSubmitting ? <Spinner /> : 'Update email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateEmailForm;
