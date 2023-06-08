import { useContext } from 'react';
import { AppContext } from '@app/state';

const useApp = () => useContext(AppContext);

export default useApp;
