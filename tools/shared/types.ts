export type AllAxes = 'x' | 'y' | 'z';

export type XYAxes = Omit<AllAxes, 'y'>;

export type xDir = 'rl' | 'rr' | 'll' | 'lr';

export type zDir = 'fl' | 'fr' | 'bl' | 'br';
