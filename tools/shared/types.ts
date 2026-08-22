export type AllAxles = 'x' | 'y' | 'z';

export type XYAxles = Omit<AllAxles, 'y'>;

export type xDir = 'rl' | 'rr' | 'll' | 'lr';

export type zDir = 'fl' | 'fr' | 'bl' | 'br';
