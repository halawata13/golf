import React, { PropsWithChildren, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../states/modal.state';
import styles from './modal.module.scss';

interface Props {
  title: string;
}

export const Modal: React.VFC<PropsWithChildren<Props>> = props => {
  const [ modal, setModal ] = useRecoilState(modalState);
  const container = useRef(null);
  const onContainerClicked = (ev: React.MouseEvent) => {
    if (ev.target === container.current) {
      setModal({
        show: false,
      });
    }
  };

  return (
    <div className={[styles.container, modal.show ? styles.show : ''].join(' ')} onClick={onContainerClicked} ref={container}>
      <section className={styles.content}>
        <header className={styles.header}>
          <h1>{props.title}</h1>
        </header>
        <main>{props.children}</main>
      </section>
    </div>
  );
};
