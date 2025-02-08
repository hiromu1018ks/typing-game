"use client";
import { useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import { Score } from "../types/types";
import ResultScreen from "./ResultScreen";

export default function Main() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState<Score[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const [startTime, setStartTime] = useState(0);

  const startScreenProps = {
    userName,
    setIsStarted,
    setStartTime,
    setUserName,
  };

  const gameScreenProps = {
    setTotalTime,
    setScore,
    setIsCompleted,
    isStarted,
    isCompleted,
    setScores,
    userName,
    startTime,
  };

  const resultScreenProps = {
    userName,
    totalTime,
    score,
    scores,
  };

  if (!isStarted) {
    return <StartScreen {...startScreenProps} />;
  }

  if (isCompleted) {
    return <ResultScreen {...resultScreenProps} />;
  }
  return <GameScreen {...gameScreenProps} />;
}
