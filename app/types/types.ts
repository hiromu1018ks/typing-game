export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Score = {
  userName: string;
  score: number;
};

export type GameScreenProps = {
  setTotalTime: SetState<number>;
  setScore: SetState<number>;
  setIsCompleted: SetState<boolean>;
  isStarted: boolean;
  isCompleted: boolean;
  scores: Score[];
  setScores: SetState<Score[]>;
  userName: string;
  startTime: number;
};

export type startScreenProps = {
  userName: string;
  setIsStarted: SetState<boolean>;
  setStartTime: SetState<number>;
  setUserName: SetState<string>;
};

export type resultScreenProps = {
  userName: string;
  totalTime: number;
  score: number;
  scores: Score[];
};
