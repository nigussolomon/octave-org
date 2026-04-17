import { ActionIcon } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function ThemeTrigger() {
  const [mounted, setMounted] = useState(false);
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const icon = {
    dark: <IconSun size={18} />,
    light: <IconMoon size={18} />,
  };

  if (!mounted) {
    return (
      <ActionIcon loading size="lg" variant="default">
        <IconSun size={18} />
      </ActionIcon>
    );
  }

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
