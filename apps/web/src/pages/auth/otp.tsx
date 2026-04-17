import { OctaveAuthForm, success } from '@octave-org/ui';
import { IconLockPassword } from '@tabler/icons-react';
import { useRouter } from 'next/router';

interface OtpValues {
  otp: string;
}

const OctaveOtpPage = () => {
  const router = useRouter();
  return (
    <OctaveAuthForm<OtpValues>
      config={{
        title: 'Enter OTP',
        description: 'Enter the OTP sent to your email',
        icon: <IconLockPassword size={80} stroke={1} />,
        pinFieldName: 'otp',
        pinLength: 6,
        primaryAction: {
          label: 'Submit',
          onSubmit: async (values) => {
            console.log('OTP:', values.otp);

            success({
              title: 'OTP Verified',
              description: 'Your OTP has been successfully verified.',
            });

            router.push('/auth/reset'); // back to login
          },
        },
        secondaryAction: { label: 'Cancel', link: '/auth' },
      }}
      initialValues={{ otp: '' }}
      validate={{ otp: (v) => (v.length === 6 ? null : 'Invalid OTP') }}
    />
  );
};

OctaveOtpPage.disabled = true;
OctaveOtpPage.disableAuth = true;
OctaveOtpPage.disablePadding = true;

export default OctaveOtpPage;
