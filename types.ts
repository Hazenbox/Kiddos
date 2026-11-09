
export interface LearningItem {
  key: string;
  type: 'letter' | 'number';
  examples: LearningExample[];
  color: string;
  gradient: string;
}

export interface LearningExample {
  word: string;
  imageUrl: string;
  hex?: string;
}

export interface AppState {
  currentKey: string | null;
  currentItem: LearningItem | null;
  isAudioPlaying: boolean;
}
