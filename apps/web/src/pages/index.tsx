import {
  error,
  Flex,
  info,
  OctaveButton,
  OctaveCheckboxInput,
  OctaveNumberInput,
  OctaveRadioInput,
  OctaveSecureInput,
  OctaveSelectInput,
  OctaveShellProps,
  OctaveTextInput,
  RadioGroup,
  Stack,
  success,
  warning,
} from '@octave-org/ui';

const Home: OctaveShellProps = () => {
  return (
    <Stack>
      <Flex wrap={{ base: 'wrap', md: 'nowrap' }} gap="xs">
        <OctaveButton
          btnProps={{
            label: 'Click me',
            action: () =>
              info({
                baseProps: {
                  position: 'top-right',
                },
                title: 'Info Notification',
                description: 'This is a custom styled info Notification.',
              }),
          }}
          labelProps={{ case: 'uppercase', fw: 900 }}
        />
        <OctaveButton
          btnProps={{
            context: 'success',
            label: 'Click me',
            action: () =>
              success({
                title: 'Success Notification',
                description: 'This is a custom styled success Notification.',
              }),
          }}
          labelProps={{ case: 'uppercase', fw: 900 }}
        />
        <OctaveButton
          btnProps={{
            context: 'warning',
            label: 'Click me',
            action: () =>
              warning({
                title: 'Warning Notification',
                description: 'This is a custom styled warning Notification.',
              }),
          }}
          labelProps={{ case: 'uppercase', fw: 900 }}
        />
        <OctaveButton
          btnProps={{
            context: 'destructive',
            label: 'Click me',
            action: () =>
              error({
                title: 'Destructive Notification',
                description:
                  'This is a custom styled destructive Notification.',
              }),
          }}
          labelProps={{ case: 'uppercase', fw: 900 }}
        />
      </Flex>
      <Flex wrap={{ base: 'wrap', md: 'nowrap' }} gap="xs">
        <OctaveTextInput
          label="Text Input"
          placeholder="Your name"
          description="Enter your name here"
        />

        <OctaveNumberInput
          label="Number Input"
          placeholder="Your age"
          description="Enter your age here"
        />

        <OctaveSelectInput
          label="Select Input"
          placeholder="Select an option"
          description="Select your name from the list"
          data={['Bruh', 'Bro']}
        />

        <OctaveSecureInput
          enableForgotPassword
          label="Secure Input"
          placeholder="Your password"
          description="Enter your password here"
        />
      </Flex>
      <Flex wrap={{ base: 'wrap', md: 'nowrap' }} gap="xs">
        <Stack>
          <OctaveCheckboxInput
            label="Checkbox Input"
            description="Select an option"
          />
        </Stack>
        <RadioGroup>
          <Stack>
            <OctaveRadioInput
              value="react"
              label="Radio Input"
              description="Select an option"
            />
          </Stack>
        </RadioGroup>
      </Flex>
    </Stack>
  );
};

Home.disabled = false;
Home.hasBack = true;
Home.title = 'Page Title';
Home.description = 'This page is described as';

export default Home;
