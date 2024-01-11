import {
  ActionIcon,
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "./ColorScheme.module.css";
import { clsx } from 'clsx';
export const ColorScheme = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
      // style={{marginRight:'0.5rem', border:'none'}}
      className={classes.button}
    >
      <IconSun className={clsx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={clsx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};
