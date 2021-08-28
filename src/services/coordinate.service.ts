interface Coordinate {
  x: number;
  y: number;
}

export class CoordinateService {
  public static getHandCard(): Coordinate {
    const x = window.innerWidth / 2;
    const y = 600;

    return {
      x,
      y,
    };
  }

  public static getDeckCard(): Coordinate {
    const x = window.innerWidth / 2 + 170;
    const y = 600;

    return {
      x,
      y,
    };
  }
}
