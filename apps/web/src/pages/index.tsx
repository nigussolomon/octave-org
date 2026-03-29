import {
  ActionIcon,
  error,
  Flex,
  info,
  Menu,
  OctaveBadge,
  OctaveButton,
  OctaveCheckboxInput,
  OctaveCol,
  OctaveNumberInput,
  OctaveRadioInput,
  OctaveSecureInput,
  OctaveSelectInput,
  OctaveShellProps,
  OctaveStatCard,
  OctaveStatusBadge,
  OctaveTable,
  OctaveTextInput,
  RadioGroup,
  Stack,
  success,
  Title,
  warning,
} from '@octave-org/ui';
import {
  IconBrandTabler,
  IconCheck,
  IconClock,
  IconMessageCircle2,
  IconProps,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';

const statusColorMap: Record<string, string> = {
  pending: 'orange',
  completed: 'green',
  failed: 'red',
};

const statusIconMap: Record<string, React.FC<IconProps>> = {
  pending: IconClock,
  completed: IconCheck,
  failed: IconX,
};

const columns: OctaveCol<{
  firstName: string;
  lastName: string;
  status: string;
}>[] = [
  {
    key: 'firstName',
    label: 'First Name',
    labelProps: { c: 'gray.9' },
    headerActions: (
      <Stack>
        <Menu.Item>Hello</Menu.Item>
      </Stack>
    ),
  },
  {
    key: 'lastName',
    label: 'Last Name',
    labelProps: { c: 'gray.9' },
  },
  {
    key: 'status',
    label: 'Status',
    labelProps: { c: 'gray.9' },
  },
];

const Home: OctaveShellProps = () => {
  const [page, setPage] = useState<number>(1);

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
      <Flex align="center" wrap={{ base: 'wrap', md: 'nowrap' }} gap="xs">
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
        <Flex wrap="wrap" gap="xs">
          <OctaveBadge color="blue" variant="dot" label="Hello World" />
          <OctaveBadge color="green" variant="dot" label="Hello World" />
          <OctaveBadge color="orange" variant="dot" label="Hello World" />
          <OctaveBadge color="red" variant="dot" label="Hello World" />
        </Flex>
        <Flex wrap="wrap" gap="xs">
          <OctaveStatusBadge
            label="pending"
            colorMap={statusColorMap}
            iconMap={statusIconMap}
          />
          <OctaveStatusBadge
            label="completed"
            colorMap={statusColorMap}
            iconMap={statusIconMap}
          />
          <OctaveStatusBadge
            label="failed"
            colorMap={statusColorMap}
            iconMap={statusIconMap}
          />
          <OctaveStatusBadge
            label="unknown"
            colorMap={statusColorMap}
            iconMap={statusIconMap}
          />
        </Flex>
      </Flex>

      <Flex wrap={{ base: 'wrap', md: 'nowrap' }} gap="xs">
        <OctaveStatCard
          icon={IconBrandTabler}
          title="Example Stat"
          description="This is an example stat description that will allow users to test and see how the stat card looks."
          direction="up"
          value={0.2}
          isValuePercent
          color="primary"
        />
        <OctaveStatCard
          icon={IconBrandTabler}
          title="Example Stat"
          description="This is an example stat description that will allow users to test and see how the stat card looks."
          direction="up"
          value={0.2}
          isValuePercent
        />
        <OctaveStatCard
          icon={IconBrandTabler}
          title="Example Stat"
          description="This is an example stat description that will allow users to test and see how the stat card looks."
          direction="up"
          value={0.2}
          isValuePercent
        />
        <OctaveStatCard
          icon={IconBrandTabler}
          title="Example Stat"
          description="This is an example stat description that will allow users to test and see how the stat card looks."
          direction="down"
          value={0.2}
          isValuePercent
          color="orange"
        />
        <OctaveStatCard
          icon={IconBrandTabler}
          title="Example Stat"
          description="This is an example stat description that will allow users to test and see how the stat card looks."
          direction="up"
          value={0.2}
          isValuePercent
          color="red"
        />
      </Flex>
      <OctaveStatCard
        icon={IconBrandTabler}
        title="Example Stat"
        description="This is an example stat description that will allow users to test and see how the stat card looks."
        direction="neutral"
        value={0.2}
        isValuePercent
        color="blue"
      />
      <OctaveTable
        loading
        data={[
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
        ]}
        columns={columns}
        pagination={{
          total: 100,
          page: page,
          pageSize: 10,
          onPageChange: (page) => setPage(page),
        }}
      />
      <OctaveTable
        data={[
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
        ]}
        columns={columns}
        pagination={{
          total: 100,
          page: page,
          pageSize: 10,
          onPageChange: (page) => setPage(page),
        }}
      />
      <OctaveTable
        data={[]}
        columns={columns}
        pagination={{
          total: 100,
          page: page,
          pageSize: 10,
          onPageChange: (page) => setPage(page),
        }}
      />
      <OctaveTable
        data={[
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            status: '',
          },
        ]}
        columns={columns}
      />
    </Stack>
  );
};

Home.disabled = false;
Home.hasBack = true;
Home.title = 'Page Title';
Home.description = 'This page is described as';

export default Home;
