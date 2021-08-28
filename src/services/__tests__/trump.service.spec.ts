import { TrumpService } from '../trump.service';

describe('TrumpService', () => {
  test('create', () => {
    const trump = TrumpService.create('spade', 13);
    expect(trump).toStrictEqual({
      suit: 'spade',
      number: 13,
    });
  });

  test('createSet', () => {
    let trumps = TrumpService.createSet(0);
    expect(trumps.length).toBe(52);

    trumps = TrumpService.createSet(2);
    expect(trumps.length).toBe(54);
  });

  test('shuffle', () => {
    const trumps = TrumpService.createSet(0);
    const shuffled = TrumpService.shuffle(trumps);
    expect(shuffled).toBeDefined();
  });

  test('isPassed', () => {
    const t1 = TrumpService.create('spade', 1);
    const t3 = TrumpService.create('spade', 3);
    const t4 = TrumpService.create('spade', 4);
    const t13 = TrumpService.create('spade', 13);

    expect(TrumpService.isPassed(t1, t3)).toStrictEqual(false);
    expect(TrumpService.isPassed(t3, t4)).toStrictEqual(true);
    expect(TrumpService.isPassed(t4, t3)).toStrictEqual(true);
    expect(TrumpService.isPassed(t1, t13)).toStrictEqual(true);
    expect(TrumpService.isPassed(t13, t1)).toStrictEqual(true);
  });

  test('getImgPath', () => {
    const t1 = TrumpService.create('spade', 1);
    expect(TrumpService.getImgPath(t1)).toStrictEqual('/images/spade1.png');
  });

  test('createCols', () => {
    const set = TrumpService.createCols(TrumpService.createSet(0), 5, 7);
    expect(set.cols.length).toStrictEqual(5);
    expect(set.cols[0].length).toStrictEqual(7);
    expect(set.rest.length).toStrictEqual(17);
  });
});
