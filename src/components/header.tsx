import React from 'react';
import styles from './header.module.scss';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../states/modal.state';

/**
 * ヘッダ
 */
export const Header: React.VFC = () => {
  const setModalState = useSetRecoilState(modalState);

  return (
    <header className={styles.header}>
      <button className={styles.button} onClick={() => window.location.reload()}>Restart</button>
      <h1 className={styles.title}>Golf</h1>
      <button className={styles.button} onClick={() => setModalState({ show: true })}>Config</button>
    </header>
  );
};
