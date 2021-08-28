import React from 'react';
import { Trump } from '../services/trump.service';
import { TrumpService } from '../services/trump.service';

interface Props {
  card: Trump;
}

export const CardImage: React.VFC<Props> = props => {
  return <img src={TrumpService.getImgPath(props.card)} width={100} height={156} alt={`${props.card.suit}${props.card.number}`} />;
};
