import React from 'react';
import { TrumpService } from '../services/trump.service';
import { CardColumn } from './card-column';
import styles from './field.module.scss';
import { useRecoilState } from 'recoil';
import { colsState } from '../states/cols.state';
import { handState } from '../states/hand.state';

export const Field: React.VFC = () => {
  const [ cols, setCols ] = useRecoilState(colsState);
  const [ hand, setHand ] = useRecoilState(handState);

  if (!cols || !hand) {
    return <></>;
  }

  const onFieldCardClicked = (index: number) => {
    const selectedCard = cols.cards[index]?.[cols.cards[index].length - 1];
    if (selectedCard && TrumpService.isPassed(selectedCard, hand.card) && cols.cards[index]) {
      let updatedCols = cols.cards.slice();
      updatedCols[index] = updatedCols[index].slice(0, -1);

      setCols({ cards: updatedCols });
      setHand({ card: selectedCard });
    }
  };

  return (
    <div className={styles.field}>
      {cols.cards.map((col, index) => (
        <CardColumn key={index} cards={col} onClick={() => onFieldCardClicked(index)} />
      ))}
    </div>
  );
};
