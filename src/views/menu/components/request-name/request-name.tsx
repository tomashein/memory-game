import React, { useState } from 'react';
import Button from '@components/button';
import Modal from '@components/modal';
import styles from './request-name.module.css';

type RequestNameProps = {
  isOpen: boolean;
  onClose: (value?: string) => void;
};

const RequestName = ({ isOpen, onClose }: RequestNameProps) => {
  const [name, setName] = useState<string>('');

  const handleClose = () => {
    if (name !== '') {
      setName('');
    }
    return onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName('');
    return onClose(name);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title="Enter your name">
      <form onSubmit={handleSubmit}>
        <p className="mb-4">Please enter your name for a personalized experience.</p>
        <input
          className={styles.requestName_input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.requestName_actions}>
          <Button onClick={handleClose} variant="dark">
            Cancel
          </Button>
          <Button disabled={name === ''} type="submit">
            Accept
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestName;
