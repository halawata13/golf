import React, { useRef, useState } from 'react';
import { CardImage } from './card-image';
import styles from './deck.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { CoordinateService } from '../services/coordinate.service';
import { useRecoilState } from 'recoil';
import { handState } from '../states/hand.state';
import { restState } from '../states/rest.state';

interface Props {
}

export const Deck: React.VFC<Props> = () => {
  const [ moving, setMoving ] = useState(false);
  const [ hand, setHand ] = useRecoilState(handState);
  const [ rest, setRest ] = useRecoilState(restState);
  const frontControls = useAnimation();
  const backControls = useAnimation();
  const card = useRef<HTMLDivElement>(null);

  if (!hand || !rest) {
    return <></>;
  }

  const onClick = async () => {
    setMoving(true);
    const startX = window.pageXOffset + (card.current?.getBoundingClientRect().left ?? 0);
    const startY = window.pageYOffset + (card.current?.getBoundingClientRect().top ?? 0);
    const target = CoordinateService.getHandCard();

    await Promise.all([
      frontControls.start({
        left: [0, (target.x - startX) / 2, target.x - startX],
        top: [0, (target.y - startY) / 2, target.y - startY],
        scaleX: [0, 0, 1],
        translateX: '-50%',
      }, {
        ease: 'easeIn',
      }),
      backControls.start({
        left: [0, (target.x - startX) / 2, target.x - startX],
        top: [0, (target.y - startY) / 2, target.y - startY],
        scaleX: [1, 0, 0],
        translateX: '-50%',
      }, {
        ease: 'easeOut',
      }),
    ]).finally(() => {
      setMoving(false);

      frontControls.set({
        left: 0,
        top: 0,
        scaleX: 0,
        translateX: 0,
      });

      backControls.set({
        left: 0,
        top: 0,
        scaleX: 1,
        translateX: 0,
      });
    });

    if (rest.cards.length > 0) {
      setHand({ card: rest.cards.slice(-1)[0] });
      setRest({ cards: rest.cards.slice(0, -1) });
    }
  };

  return (
    <div className={styles.container} style={{ left: CoordinateService.getDeckCard().x ,top: CoordinateService.getDeckCard().y }} ref={card}>
      {rest.cards.length > 0 && (
        <>
          <motion.button className={styles.front} disabled={moving} animate={frontControls}>
            <CardImage card={rest.cards[rest.cards.length - 1]} />
          </motion.button>
          <motion.div className={styles.back} animate={backControls} onClick={() => onClick()}>
            <img src={'/images/back.png'} width={100} height={156} alt={``} />
          </motion.div>
        </>
      )}
      {rest.cards.length > 1 && (
        <img src={'/images/back.png'} width={100} height={156} alt={``} />
      )}
    </div>
  );
};
