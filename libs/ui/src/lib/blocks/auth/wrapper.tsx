import {
  Card,
  Center,
  Divider,
  Flex,
  Overlay,
  SimpleGrid,
  useMantineColorScheme,
} from '@mantine/core';
import { OctaveStackedText } from '../../text';
import { OctaveBranding, useOctaveBranding } from '../../branding';

export interface OctaveAuthWrapperProps {
  children: React.ReactNode;
  flip?: boolean;
  branding?: OctaveBranding;
}

export function OctaveAuthWrapper(props: OctaveAuthWrapperProps) {
  const { colorScheme } = useMantineColorScheme();
  const branding = useOctaveBranding(props.branding);

  return (
    <SimpleGrid p="md" cols={{ base: 1, md: 2 }} h="100vh">
      {props.flip && props.children}
      <Card bg="primary" h="100%" visibleFrom="md" pos="relative">
        <Overlay style={{ zIndex: 1 }} blur={5} bg="transparent" />
        <Flex style={{ zIndex: 0 }} pos="absolute" top={0} left={0}>
          <Card radius={0} bg="primary.5" w="152px" h="400px" />
          <Card radius={0} bg="primary.4" w="152px" h="330px" />
          <Card radius={0} bg="primary.3" w="152px" h="260px" />
          <Card radius={0} bg="primary.2" w="152px" h="190px" />
          <Card radius={0} bg="primary.1" w="152px" h="120px" />
          <Card radius={0} bg="primary.1" w="152px" h="50px" />
        </Flex>
        <Center style={{ zIndex: 10 }} w="100%" h="100%">
          <Flex align="center" gap="xs">
            {branding.logo}

            <Divider orientation="vertical" />
            <OctaveStackedText
              title={branding.companyName}
              description={branding.slogan}
              titleProps={{
                c: colorScheme === 'light' ? 'white' : 'black',
              }}
              descProps={{
                c: colorScheme === 'light' ? 'white' : 'black',
              }}
            />
          </Flex>
        </Center>
        <Flex
          style={{ zIndex: 0 }}
          align="flex-end"
          pos="absolute"
          bottom={0}
          right={0}
        >
          <Card radius={0} bg="primary.1" w="152px" h="50px" />
          <Card radius={0} bg="primary.1" w="152px" h="120px" />
          <Card radius={0} bg="primary.2" w="152px" h="190px" />
          <Card radius={0} bg="primary.3" w="152px" h="260px" />
          <Card radius={0} bg="primary.4" w="152px" h="330px" />
          <Card radius={0} bg="primary.5" w="152px" h="400px" />
        </Flex>
      </Card>
      {!props.flip && props.children}
    </SimpleGrid>
  );
}
