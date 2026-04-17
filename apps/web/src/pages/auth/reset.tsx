import { OctaveAuthForm, success } from '@octave-org/ui';
import { IconLock } from '@tabler/icons-react';
import { useRouter } from 'next/router';

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

const OctaveResetPasswordPage = () => {
  const router = useRouter();

  return (
    <OctaveAuthForm<ResetPasswordValues>
      config={{
        title: 'Reset Password',
        description: 'Enter your new password to continue',
        icon: <IconLock size={80} stroke={1} />,

        fields: [
          {
            type: 'secure',
            name: 'password',
            props: {
              label: 'New Password',
              placeholder: 'Enter new password',
              required: true,
            },
          },
          {
            type: 'secure',
            name: 'confirmPassword',
            props: {
              label: 'Confirm Password',
              placeholder: 'Confirm new password',
              required: true,
            },
          },
        ],

        primaryAction: {
          label: 'Reset Password',
          onSubmit: async (values) => {
            console.log('Reset password:', values);

            success({
              title: 'Password Reset',
              description: 'Your password has been successfully reset.',
            });
            router.push('/auth'); // back to login
          },
        },

        secondaryAction: {
          label: 'Back to Login',
          link: '/auth',
        },
      }}
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validate={{
        password: (value) =>
          value.length < 8 ? 'Password must be at least 8 characters' : null,

        confirmPassword: (value, values) =>
          value !== values.password ? 'Passwords do not match' : null,
      }}
    />
  );
};

OctaveResetPasswordPage.disabled = true;
OctaveResetPasswordPage.disableAuth = true;
OctaveResetPasswordPage.disablePadding = true;

export default OctaveResetPasswordPage;
