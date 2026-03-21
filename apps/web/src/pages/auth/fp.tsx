import { info, OctaveAuthForm } from '@octave-org/ui';
import { IconMail } from '@tabler/icons-react';
import { useRouter } from 'next/router';

interface ForgotPasswordValues {
  email: string;
}

const OctaveForgotPasswordPage = () => {
  const router = useRouter();

  return (
    <OctaveAuthForm<ForgotPasswordValues>
      config={{
        title: 'Forgot Password',
        description: 'Enter your email to reset your password',
        icon: <IconMail size={80} stroke={1} />,
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
        ],
        primaryAction: {
          label: 'Reset Password',
          onSubmit: (v) => {
            info({
              title: 'Password Reset',
              description: 'Instructions have been sent to your email.',
            });
            router.push('/auth/otp');
          },
        },
        secondaryAction: { label: 'Go Back', link: '/auth' },
      }}
      initialValues={{ email: '' }}
      validate={{
        email: (v) => (/^\S+@\S+$/.test(v as string) ? null : 'Invalid email'),
      }}
    />
  );
};

OctaveForgotPasswordPage.disabled = true;
OctaveForgotPasswordPage.disablePadding = true;

export default OctaveForgotPasswordPage;
