import { useSelector } from '@xstate/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from '@components/button';
import useLoad from '@hooks/useLoad';
import './error-handler.css';

const ErrorHandler = () => {
  const { actor } = useLoad();
  const error = useSelector(actor, ({ context }) => context.error);

  if (!error) return false;

  return (
    <>
      <ExclamationTriangleIcon className="error-handler__icon" />
      <h1 className="error-handler__title">
        {error.code} {error.name}
      </h1>
      <p className="error-handler__message">{error.message}</p>
      <Button className="error-handler__retry" onClick={() => actor.send({ type: 'RETRY_LOAD' })}>
        Retry
      </Button>
    </>
  );
};

export default ErrorHandler;
