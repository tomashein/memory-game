import { useCallback, useRef, useState } from 'react';
import { useSelector } from '@xstate/react';
import Button from '@components/button';
import Modal from '@components/modal';
import useMenu from '@hooks/useMenu';
import './request-name.css';

const RequestName = () => {
  const { actor } = useMenu();
  const requestName = useSelector(actor, ({ context }) => context.requestName);
  const [done, setDone] = useState(false);
  const nameField = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (nameField.current) nameField.current.value = '';
    setDone(false);
    actor.send({ type: 'TOGGLE_MODAL' });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    actor.send({ type: 'START_GAME', data: nameField.current?.value });
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value && event.target.value !== '') {
        if (!done) setDone(true);
      } else {
        if (done) setDone(false);
      }
    },
    [done]
  );

  return (
    <Modal title="Enter your name" open={requestName} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <p className="mb-4">Please enter your name for a personalized experience.</p>
        <input className="request_name__input" type="text" ref={nameField} onChange={handleChange} />
        <div className="request_name__actions">
          <Button onClick={handleClose} variant="dark">
            Cancel
          </Button>
          <Button disabled={!done} type="submit">
            Accept
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestName;
