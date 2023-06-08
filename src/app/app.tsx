import Router from './router';
import { AppProvider } from './state';

const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
