import { TrumpService } from '../services/trump.service';
import { useEffect } from 'react';
import { Field } from '../components/field';
import { HandCard } from '../components/hand-card';
import { Deck } from '../components/deck';
import { Header } from '../components/header';
import { ConfigService } from '../services/config.service';
import { Modal } from '../components/modal';
import { ConfigForm } from '../components/config-form';
import { useSetRecoilState } from 'recoil';
import { colsState } from '../states/cols.state';
import { handState } from '../states/hand.state';
import { restState } from '../states/rest.state';

const config = ConfigService.load();
const cards = TrumpService.createCols(TrumpService.createSet(0), config.rowNum, config.colNum);

export function Index() {
  const setCols = useSetRecoilState(colsState);
  const setHand = useSetRecoilState(handState);
  const setRest = useSetRecoilState(restState);

  useEffect(() => {
    // 初回読み込み時の場札、手札、山札をセット
    setCols({ cards: cards.cols });
    setHand({ card: cards.rest[0] });
    setRest({ cards: cards.rest.slice(1) });
  }, [setCols, setHand, setRest]);

  return (
    <>
      <Header />
      <Field />
      <HandCard />
      <Deck />

      <Modal title={'Config'}>
        <ConfigForm />
      </Modal>
    </>
  );
}
