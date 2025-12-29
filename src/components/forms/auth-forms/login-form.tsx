import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { LoginSchema } from '@/utils/api/user';
import { useAuth } from '@/utils/auth/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InstantFieldError from '../instant-field-error';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import OAuthField from './oauth-field';
import { Spinner } from '@/components/ui/spinner';

const LoginForm = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    data
  ) => {
    try {
      await loginUser(data);
      navigate({ to: '/dashboard' });
    } catch (err) {
      console.log('error', err);
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link to="/init-forget-password">
                      <Button size="sm" variant="link">
                        Forget password?
                      </Button>
                    </Link>
                  </div>
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
          <Button
            className="w-full"
            form="form-rhf"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : 'Login'}
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

export default LoginForm;
