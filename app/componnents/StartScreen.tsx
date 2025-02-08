import { startScreenProps } from "../types/types";

export default function StartScreen({
  userName,
  setIsStarted,
  setStartTime,
  setUserName,
}: startScreenProps) {
  const handleStart = () => {
    if (!userName) {
      alert("名前を入力してください");
      return;
    }
    setIsStarted(true);
    setStartTime(Date.now());
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="text-center p-8 bg-black/50 rounded-lg border border-red-800 shadow-2xl">
        <h1
          className="text-5xl font-bold mb-8 text-red-600 tracking-wider"
          style={{ textShadow: "0 0 10px rgba(255, 0, 0, 0.7)" }}
        >
          Typing Game
        </h1>
        <div className="mb-6">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name..."
            className="w-64 p-3 text-lg bg-black/70 text-red-500 border-2 border-red-800 rounded-md 
                       placeholder:text-red-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            style={{ textShadow: "0 0 5px rgba(255, 0, 0, 0.5)" }}
          />
        </div>
        <div>
          <button
            onClick={handleStart}
            className="px-8 py-3 text-xl bg-red-900 text-white rounded-md hover:bg-red-700 
                       transition-colors duration-300 border border-red-600"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Start Game
          </button>
        </div>
      </div>
    </main>
  );
}
