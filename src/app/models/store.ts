import { Game } from './game';
import { GameDetails } from './gameDetails';

export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
  games: Game[];
  description: string;
}
