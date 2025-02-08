import React, { useEffect, useRef, useState } from "react";
import { GameScreenProps } from "../types/types";

export default function GameScreen({
  setTotalTime,
  setScore,
  setIsCompleted,
  isStarted,
  isCompleted,
  setScores,
  userName,
  startTime,
}: GameScreenProps) {
  const questions = [
    { question: "React", image: "/monster1.jpg" },
    { question: "TypeScript", image: "/monster2.jpg" },
    { question: "JISOU", image: "/monster3.jpg" },
    { question: "GitHub", image: "/monster4.jpg" },
    { question: "Next.js", image: "/monster5.jpg" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const shotSoundRef = useRef<HTMLAudioElement | null>(null);

  const fetchScores = async () => {
    const res = await fetch("/api/result");
    const data = await res.json();
    return data.results;
  };

  const addResult = async (userName: string, startTime: number) => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const timeInSeconds = totalTime / 1000;
    const baseScore = 10000;
    const timeDeduction = Math.floor(timeInSeconds * 100);
    const score = Math.max(1000, baseScore - timeDeduction);

    await fetch("/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: score,
        userName: userName,
      }),
    });

    return { totalTime, score };
  };

  useEffect(() => {
    bgmRef.current = new Audio("/bgm.mp3");
    bgmRef.current.loop = true;
    shotSoundRef.current = new Audio("/shot.mp3");
  }, []);

  useEffect(() => {
    if (isStarted && bgmRef.current) {
      bgmRef.current.play();
    }
    if (isCompleted && bgmRef.current) {
      bgmRef.current.pause();
    }
  }, [isStarted, isCompleted]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (
        e.key.toLowerCase() ===
        currentQuestion.question[currentPosition].toLowerCase()
      ) {
        setCurrentPosition((prev) => prev + 1);
      }

      if (currentPosition === currentQuestion.question.length - 1) {
        if (currentQuestionIndex === questions.length - 1) {
          if (shotSoundRef.current) {
            shotSoundRef.current.currentTime = 0;
            shotSoundRef.current.play();
          }
          const { totalTime, score } = await addResult(userName, startTime);

          setTotalTime(totalTime);
          setScore(score);
          setIsCompleted(true);

          const scores = await fetchScores();
          setScores(scores);
        } else {
          if (shotSoundRef.current) {
            shotSoundRef.current.currentTime = 0;
            shotSoundRef.current.play();
          }
          setCurrentQuestionIndex((prev) => prev + 1);
          setCurrentPosition(0);
        }
      }
    };
    if (isStarted) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [currentPosition, currentQuestionIndex, isStarted]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="text-center w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${questions[currentQuestionIndex].image})`,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="text-white mb-8 text-xl">
          問題 {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div
          style={{
            fontSize: "48px",
            margin: "20px 0",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
          className="text-white"
        >
          {questions[currentQuestionIndex].question
            .split("")
            .map((char, index) => (
              <span
                key={index}
                style={{
                  color: index < currentPosition ? "#ff0000" : "white",
                  textShadow:
                    index < currentPosition
                      ? "0 0 10px rgba(255, 0, 0, 0.7)"
                      : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                {char}
              </span>
            ))}
        </div>
      </div>
    </main>
  );
}
