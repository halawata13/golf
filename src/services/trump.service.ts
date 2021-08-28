const suits = ['spade', 'club', 'heart', 'diamond'] as const;
const trumpNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

type Suit = typeof suits[number];
type TrumpNumber = typeof trumpNumbers[number]

export interface Trump {
  suit: Suit | 'joker';
  number: TrumpNumber;
}

export class TrumpService {
  public static create(suit: Suit | 'joker', number: TrumpNumber): Trump {
    return {
      suit,
      number,
    };
  }

  public static createSet(joker: number): Trump[] {
    const trumps: Trump[] = [];

    suits.forEach(suit => {
      trumpNumbers.forEach(number => {
        trumps.push(TrumpService.create(suit, number));
      });
    });

    Array.from(Array(joker)).forEach(_ => {
      trumps.push(TrumpService.create('joker', 1));
    });

    return TrumpService.shuffle(trumps);
  }

  public static shuffle(trumps: Trump[]): Trump[] {
    for (let i = trumps.length; 1 < i; i--) {
      const n = Math.floor(Math.random() * i);
      [trumps[n], trumps[i - 1]] = [trumps[i - 1], trumps[n]];
    }

    return trumps;
  }

  public static isPassed(a: Trump, b: Trump) {
    if (a.suit === 'joker' || b.suit === 'joker') {
      return true;
    }

    if (a.number === b.number + 1 || a.number === b.number - 1) {
      return true;
    }

    return (a.number === 1 && b.number === 13) || (a.number === 13 && b.number === 1);
  }

  public static getImgPath(trump: Trump) {
    return `/images/${trump.suit}${trump.number}@3x.png`;
  }

  public static createCols(trumps: Trump[], row: number, col: number): { cols: Trump[][], rest: Trump[] } {
    const cols: Trump[][] = [];
    Array.from(Array(row)).forEach((_, i) => {
      cols.push(trumps.slice(i * col, (i + 1) * col));
    });

    return {
      cols: cols,
      rest: trumps.slice(row * col),
    };
  }
}
