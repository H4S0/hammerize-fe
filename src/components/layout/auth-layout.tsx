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
    linkLabel: 'Sign up',
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
      'Make sure to check your email so you can reset your password!',
    link: '/login',
    linkLabel: 'Back to login',
  },
} satisfies Record<FormHeaderType, FormHeaderCardProps>;

const AuthLayout = ({ children, type }: AuthLayoutProps) => {
  const content = formHeaderContent[type];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <FormVideoCard />

      <div className="flex flex-1 items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-lg flex flex-col gap-4">
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
