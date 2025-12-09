import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { useNavigate } from '@tanstack/react-router';
import { register, RegisterSchema } from '@/utils/api/user';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import InstantFieldError from '../instant-field-error';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import OAuthField from './oauth-field';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';

const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data
  ) => {
    try {
      const res = await register(data);

      toast.success(res.message);

      form.reset();
      navigate({ to: '/login' });
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
      <CardContent className="pt-6">
        <form id="form-rhf" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="text@example.ha" />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input {...field} placeholder="user231" />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} placeholder="••••••••" type="password" />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col items-center w-full space-y-4">
          <Button className="w-full" form="form-rhf">
            Register
          </Button>

          <div className="flex items-center w-full space-x-2">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <OAuthField />
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
