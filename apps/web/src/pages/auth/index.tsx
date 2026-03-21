import { error, OctaveAuthForm } from '@octave-org/ui';
import { IconLockAccess } from '@tabler/icons-react';

interface LoginValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const OctaveLoginPage = () => {
  return (
    <OctaveAuthForm<LoginValues>
      config={{
        title: 'Welcome back',
        description: 'Enter your credentials to continue',
        icon: <IconLockAccess size={80} stroke={1} />,
        fields: [
          {
            type: 'text',
            name: 'email',
            props: {
              label: 'Email',
              required: true,
              placeholder: 'Enter your email',
            },
          },
          {
            type: 'secure',
            name: 'password',
            props: {
              label: 'Password',
              placeholder: 'Enter password',
              enableForgotPassword: true,
              forgotPasswordHref: '/auth/fp',
            },
          },
        ],
        primaryAction: {
          label: 'Sign in',
          onSubmit: (values: LoginValues) => {
            error({
              title: 'Login Failed',
              description: 'Invalid credentials',
              baseProps: {
                position: 'top-right',
              },
            });
          },
        },
        secondaryAction: { label: 'Sign up', link: '/auth/register' },
      }}
      initialValues={{ email: '', password: '', rememberMe: false }}
      validate={{
        email: (v) => (/^\S+@\S+$/.test(v as string) ? null : 'Invalid email'),
        password: () => null,
        rememberMe: () => null,
      }}
    />
  );
};

OctaveLoginPage.disabled = true;
OctaveLoginPage.disablePadding = true;

export default OctaveLoginPage;
