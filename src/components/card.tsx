import React, { useRef } from 'react';
import { Trump, TrumpService } from '../services/trump.service';
import { CardImage } from './card-image';
import { motion, useAnimation } from 'framer-motion';
import { CoordinateService } from '../services/coordinate.service';
import { useRecoilValue } from 'recoil';
import { handState } from '../states/hand.state';

interface Props {
  card: Trump;
  onClick: (trump: Trump) => void;
}

export const Card: React.VFC<Props> = props => {
  const controls = useAnimation();
  const hand = useRecoilValue(handState);
  const card = useRef<HTMLButtonElement>(null);

  const onClick = async () => {
    if (card !== null && hand !== null && TrumpService.isPassed(props.card, hand?.card)) {
      const startX = window.pageXOffset + (card.current?.getBoundingClientRect().left ?? 0);
      const startY = window.pageYOffset + (card.current?.getBoundingClientRect().top ?? 0);

      controls.set({
        position: 'absolute',
        left: startX,
        top: startY,
        zIndex: 9,
      });

      await controls.start({
        left: Number(CoordinateService.getHandCard().x),
        top: Number(CoordinateService.getHandCard().y),
        translateX: '-50%',
      }, {
        ease: 'easeInOut',
      });

      props.onClick(props.card);
    }
  };

  return (
    <motion.button onClick={() => onClick()} animate={controls} ref={card}>
      <CardImage card={props.card} />
    </motion.button>
  );
};
