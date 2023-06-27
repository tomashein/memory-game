import { AppProvider } from './app.provider';
import AppRouter from './app.router';
import ThemeToggle from './theme-toggle';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
      <ThemeToggle />
    </AppProvider>
  );
};

export default App;
