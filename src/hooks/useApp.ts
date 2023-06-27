import { useContext } from 'react';
import { AppContext } from '@app';

const useApp = () => useContext(AppContext);

export default useApp;
