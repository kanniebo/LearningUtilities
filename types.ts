
export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  thumbnail: string;
}

export type Category = 'All' | 'Logic' | 'Skill' | 'Classic' | 'Multiplayer';
