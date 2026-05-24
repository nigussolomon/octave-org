import {
  Box,
  Card,
  Center,
  Flex,
  Overlay,
  OverlayProps,
  SimpleGrid,
  TextProps,
} from '@mantine/core';
import { OctaveStackedText } from '../../text';
import { OctaveBranding, useOctaveBranding } from '../../branding';

export interface OctaveAuthWrapperProps {
  children: React.ReactNode;
  flip?: boolean;
  branding?: OctaveBranding;
  brandingTextProps?: {
    title?: TextProps;
    description?: TextProps;
  };
  wrapper?: React.ReactNode;
  overlayProps?: OverlayProps;
}

export function OctaveAuthWrapper(props: OctaveAuthWrapperProps) {
  const branding = useOctaveBranding(props.branding);

  return (
    <SimpleGrid p="md" cols={{ base: 1, md: 2 }} h="100vh">
      {props.flip && props.children}
      <Card
        bg={props.wrapper ? 'transparent' : 'primary'}
        h="100%"
        visibleFrom="md"
        pos="relative"
        withBorder={props.wrapper ? true : false}
      >
        <Overlay
          style={{ zIndex: 1 }}
          blur={5}
          bg="transparent"
          {...props.overlayProps}
        />
        <Box
          style={{ zIndex: 0 }}
          h="100%"
          w="100%"
          pos="absolute"
          top={0}
          left={0}
          right={0}
        >
          {props.wrapper}
        </Box>
        {!props.wrapper && (
          <Flex style={{ zIndex: 0 }} pos="absolute" top={0} left={0} w="100%">
            {[5, 4, 3, 2, 1, 1].map((shade, index) => (
              <Card
                key={index}
                radius={0}
                bg={`primary.${shade}`}
                flex={1}
                h={`${400 - index * 70}px`}
              />
            ))}
          </Flex>
        )}
        <Center style={{ zIndex: 10 }} w="100%" h="100%">
          <Flex align="center" gap="xs">
            {branding.logo}

            <OctaveStackedText
              title={branding.companyName}
              description={branding.slogan}
              titleProps={{
                c: 'light-dark(var(--mantine-color-white), var(--mantine-color-black))',
                ...props.brandingTextProps?.title,
              }}
              descProps={{
                c: 'light-dark(var(--mantine-color-white), var(--mantine-color-black))',
                ...props.brandingTextProps?.description,
              }}
            />
          </Flex>
        </Center>
        {!props.wrapper && (
          <Flex
            style={{ zIndex: 0 }}
            align="flex-end"
            pos="absolute"
            bottom={0}
            right={0}
            w="100%"
          >
            {[1, 1, 2, 3, 4, 5].map((shade, index) => (
              <Card
                key={index}
                radius={0}
                bg={`primary.${shade}`}
                flex={1}
                h={`${50 + index * 70}px`}
              />
            ))}
          </Flex>
        )}
      </Card>
      {!props.flip && props.children}
    </SimpleGrid>
  );
}
