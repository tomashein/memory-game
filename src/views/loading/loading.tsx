import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
};

export default Loading;
