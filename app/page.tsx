"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const questions = [
    { question: "react", image: "./monster1.jpg" },
    { question: "Typescript", image: "./monster2.jpg" },
    { question: "JISOU", image: "./monster3.jpg" },
    { question: "GitHub", image: "./monster4.jpg" },
    { question: "Next.js", image: "./monster5.jpg" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (
        e.key.toLowerCase() ===
        currentQuestion.question[currentPosition]?.toLowerCase()
      ) {
        setCurrentPosition((prev) => prev + 1);
      }
      if (currentPosition === currentQuestion.question.length - 1) {
        if (currentQuestionIndex === questions.length - 1) {
          setIsCompleted(true);
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setCurrentPosition(0);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPosition, currentQuestionIndex]);

  const handleStart = () => {
    if (!userName) {
      alert("名前を入力してください");
      return;
    }
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="text-center p-8">
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-64 p-3 text-lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <button
            className="px-8 py-3 text-center bg-red-900"
            onClick={handleStart}
          >
            Start Game
          </button>
        </div>
      </main>
    );
  }

  if (isCompleted) {
    return <div>ゲーム終了！</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="text-center w-full h-screen bg-cover flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${questions[currentQuestionIndex].image})`,
          backgroundColor: "rgba(0,0,0,0.7)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div>
          {questions[currentQuestionIndex].question
            .split("")
            .map((char, index) => (
              <span
                key={index}
                style={{ color: index < currentPosition ? "#ff0000" : "white" }}
              >
                {char}
              </span>
            ))}
        </div>
      </div>
    </main>
  );
}
