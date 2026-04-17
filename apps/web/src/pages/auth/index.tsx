import { OctaveAuthForm, setTokens, success } from '@octave-org/ui';
import { IconLockAccess } from '@tabler/icons-react';
import { useRouter } from 'next/router';

interface LoginValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const OctaveLoginPage = () => {
  const router = useRouter();

  const createDemoJwt = () => {
    const header = { alg: 'HS256', typ: 'JWT' };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: 'demo-user',
      role: 'admin',
      iat: now,
      nbf: now - 10,
      exp: now + 60 * 60,
    };

    const encode = (value: Record<string, unknown>) =>
      btoa(JSON.stringify(value))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');

    return `${encode(header)}.${encode(payload)}.demo-signature`;
  };

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
          onSubmit: async (values: LoginValues) => {
            setTokens(createDemoJwt(), 'demo-refresh-token');

            success({
              title: 'Login successful',
              description: `Welcome back, ${values.email}`,
              baseProps: {
                position: 'top-right',
              },
            });

            await router.push('/');
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
OctaveLoginPage.disableAuth = true;
OctaveLoginPage.disablePadding = true;

export default OctaveLoginPage;
