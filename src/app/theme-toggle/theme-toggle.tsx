import { useSelector } from '@xstate/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import useApp from '@hooks/useApp';
import './theme-toggle.css';

const ThemeToggle = () => {
  const { service } = useApp();
  const theme = useSelector(service, ({ context }) => context.theme);

  return (
    <button className="theme-toggle" onClick={() => service.send({ type: 'TOGGLE_THEME' })} type="button">
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
