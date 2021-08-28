import React from 'react';
import { CardImage } from './card-image';
import styles from './hand-card.module.scss';
import { CoordinateService } from '../services/coordinate.service';
import { useRecoilValue } from 'recoil';
import { handState } from '../states/hand.state';

export const HandCard: React.VFC = () => {
  const hand = useRecoilValue(handState);

  if (!hand) {
    return <></>;
  }

  return (
    <div className={styles.handCard} style={{ left: CoordinateService.getHandCard().x, top: CoordinateService.getHandCard().y }}>
      <CardImage card={hand.card} />
    </div>
  );
};
