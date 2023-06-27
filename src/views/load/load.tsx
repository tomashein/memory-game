import { useSelector } from '@xstate/react';
import useLoad from '@hooks/useLoad';
import ErrorHandler from './error-handler';
import LoadSpinner from './load-spinner';
import './load.css';

const LoadView = () => {
  const { actor } = useLoad();
  const state = useSelector(actor, (state) => state.value);

  return <div className="load">{state === 'error' ? <ErrorHandler /> : <LoadSpinner />}</div>;
};

export default LoadView;
