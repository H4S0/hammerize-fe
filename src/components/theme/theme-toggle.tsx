import { MonitorCog, Moon, Sun } from 'lucide-react';
import { DropdownMenuGroup, DropdownMenuLabel } from '../ui/dropdown-menu';
import { Theme, useTheme } from './theme-provider';
import { Button } from '../ui/button';
import { JSX } from 'react';

type ThemeOptionsProps = {
  icon: JSX.Element;
  theme: Theme;
};

const themeOptions: ThemeOptionsProps[] = [
  {
    icon: <Sun size={20} />,
    theme: 'light',
  },
  {
    icon: <Moon size={20} />,
    theme: 'dark',
  },
  {
    icon: <MonitorCog size={20} />,
    theme: 'system',
  },
];

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenuLabel className="flex flex-col items-start justify-between gap-3">
      Theme
      <DropdownMenuGroup className="flex items-center justify-around gap-3 text-muted-foreground w-full">
        {themeOptions.map((option) => (
          <Button
            size="sm"
            variant={theme === option.theme ? 'default' : 'outline'}
            onClick={() => setTheme(option.theme)}
          >
            {option.icon}
          </Button>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuLabel>
  );
}
