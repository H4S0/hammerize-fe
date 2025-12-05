import { ReactNode } from 'react';
import FormVideoCard from '../card/form-video-card';
import FormHeaderCard, { FormHeaderCardProps } from '../card/form-header-card';

type FormHeaderType = 'login' | 'register' | 'new-password' | 'password-reset';

type AuthLayoutProps = {
  children: ReactNode;
  type: FormHeaderType;
};

const formHeaderContent = {
  login: {
    title: 'Login to your account',
    description: 'Don`t have an account?',
    link: '/register',
    linkLabel: 'Register',
  },
  register: {
    title: 'Create a new account',
    description: 'Already have an account?',
    link: '/login',
    linkLabel: 'Login',
  },
  'new-password': {
    title: 'Enter a new password',
    description: 'Secure your account',
    link: '/login',
    linkLabel: 'Back to login',
  },
  'password-reset': {
    title: 'Reset your password',
    description:
      'Make sure to check you email, so you can reset your password!',
    link: '/login',
    linkLabel: 'Back to login',
  },
} satisfies Record<FormHeaderType, FormHeaderCardProps>;

const AuthLayout = ({ children, type }: AuthLayoutProps) => {
  const content = formHeaderContent[type];

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-10 gap-6">
      <FormVideoCard />

      <div className="md:w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 w-full max-w-md">
          <FormHeaderCard
            title={content.title}
            description={content.description}
            link={content.link}
            linkLabel={content.linkLabel}
          />

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
