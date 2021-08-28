import React from 'react';
import { Trump } from '../services/trump.service';
import { Card } from './card';
import styles from './card-column.module.scss';

interface Props {
  cards: Trump[];
  onClick: (trump: Trump) => void;
}

export const CardColumn: React.VFC<Props> = props => {
  return (
    <div className={styles.container}>
      {props.cards.map((trump, index) => (
        <div key={index} className={styles.card}>
          <Card card={trump} onClick={props.onClick} />
        </div>
      ))}
    </div>
  );
};
