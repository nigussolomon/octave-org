import { ActionIcon } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ThemeTrigger() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const icon = {
    light: <IconSun size={18} />,
    dark: <IconMoon size={18} />,
  };

  return (
    <ActionIcon
      size="lg"
      variant="default"
      onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
    >
      {icon[colorScheme as keyof typeof icon]}
    </ActionIcon>
  );
}
