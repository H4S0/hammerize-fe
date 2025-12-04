import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { LoginSchema } from '@/utils/api/user';
import { useAuth } from '@/utils/auth/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InstantFieldError from '../instant-field-error';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    data
  ) => {};

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login form</CardTitle>
        <CardDescription>Login form YEYE</CardDescription>
      </CardHeader>
      <CardContent>
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="••••••••" />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
