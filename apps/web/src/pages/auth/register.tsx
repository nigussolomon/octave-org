import { OctaveAuthForm, AuthFormRow } from '@octave-org/ui';
import { IconMoodHappy } from '@tabler/icons-react';

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const OctaveRegisterPage = () => {
  const rows: AuthFormRow<RegisterValues>[] = [
    {
      columns: [
        [
          {
            type: 'text',
            name: 'firstName',
            props: {
              label: 'First Name',
              required: true,
              placeholder: 'Enter your first name',
            },
          },
        ],
        [
          {
            type: 'text',
            name: 'lastName',
            props: {
              label: 'Last Name',
              required: true,
              placeholder: 'Enter your last name',
            },
          },
        ],
      ],
    },
    {
      columns: [
        [
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
              required: true,
              placeholder: 'Enter your password',
            },
          },
          {
            type: 'secure',
            name: 'confirmPassword',
            props: {
              label: 'Confirm Password',
              required: true,
              placeholder: 'Confirm your password',
            },
          },
          {
            type: 'checkbox',
            name: 'agree',
            props: {
              label: 'I accept Terms',
              description: 'Terms & Service for Octave',
            },
          },
        ],
      ],
    },
  ];

  return (
    <OctaveAuthForm<RegisterValues>
      config={{
        title: 'Welcome to Octave',
        description: 'Enter your information to continue',
        icon: <IconMoodHappy size={80} stroke={1} />,
        rows,
        primaryAction: { label: 'Sign up', onSubmit: (v) => console.log(v) },
        secondaryAction: {
          label: 'Already have an account? ',
          link: '/auth',
          linkLabel: 'Login Now!',
        },
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
      }}
      validate={{
        firstName: (v) => (v.length < 1 ? 'Required' : null),
        lastName: (v) => (v.length < 1 ? 'Required' : null),
        email: (v) => (/^\S+@\S+$/.test(v as string) ? null : 'Invalid email'),
        password: (v) => (v.length < 8 ? 'Min 8 chars' : null),
        confirmPassword: (v, vals) =>
          v !== vals.password ? 'Passwords do not match' : null,
        agree: (v) => (v ? null : 'Must accept'),
      }}
    />
  );
};

OctaveRegisterPage.disabled = true;
OctaveRegisterPage.disableAuth = true;
OctaveRegisterPage.disablePadding = true;

export default OctaveRegisterPage;
