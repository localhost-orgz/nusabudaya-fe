// src/app/(games)/arena/tebak-gambar/page.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import GuessImageQuestion from "@/components/Arena/GuessImageQuestion";
import GuessImageSummary from "@/components/Arena/GuessImageSummary";
import {
  getGuessImageQuizByProvince,
  GUESS_IMAGE_CONFIG,
} from "@/constants/guessImageQuestions";

const TebakGambar = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    GUESS_IMAGE_CONFIG.TIME_PER_QUESTION
  );
  const [xpEarned, setXpEarned] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  // Get questions - for now using Jawa Barat
  const questions = getGuessImageQuizByProvince("Jawa Barat");
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate potential XP based on current time
  const potentialXP = GUESS_IMAGE_CONFIG.calculateXP(timeLeft);
  const maxPossibleXP = GUESS_IMAGE_CONFIG.BASE_XP * questions.length;

  // Timer countdown
  useEffect(() => {
    if (quizEnded) return;

    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTotalTime(totalTime + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      // Timeout - automatically move to next question
      handleTimeout();
    }
  }, [timeLeft, isAnswered, quizEnded, totalTime]);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const earnedXP = isCorrect ? potentialXP : 0;
    const currentStage = GUESS_IMAGE_CONFIG.getBlurStage(timeLeft);

    // Save result
    const newResult = {
      questionId: currentQuestion.id,
      isCorrect,
      isTimeout: false,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      xpEarned: earnedXP,
      stage: currentStage.label,
      timeRemaining: timeLeft,
    };
    setResults([...results, newResult]);

    if (isCorrect) {
      setXpEarned(xpEarned + earnedXP);
    }

    // Move to next question after 2.5 seconds
    setTimeout(() => {
      moveToNextQuestion();
    }, 2500);
  };

  const handleTimeout = () => {
    setIsAnswered(true);

    // Save timeout result
    const newResult = {
      questionId: currentQuestion.id,
      isCorrect: false,
      isTimeout: true,
      selectedAnswer: null,
      correctAnswer: currentQuestion.correctAnswer,
      xpEarned: 0,
      stage: "Timeout",
      timeRemaining: 0,
    };
    setResults([...results, newResult]);

    // Move to next question after 1 second
    setTimeout(() => {
      moveToNextQuestion();
    }, 1000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(GUESS_IMAGE_CONFIG.TIME_PER_QUESTION);
    } else {
      // Quiz ended
      setQuizEnded(true);
    }
  };

  const correctAnswers = results.filter((r) => r.isCorrect).length;

  // Summary Page
  if (quizEnded) {
    return (
      <main className="min-h-screen w-full bg-[#0D1922] flex flex-col items-center overflow-y-auto">
        {/* Navigation bar */}
        <nav className="w-full h-20 bg-[#1a2832] px-4 md:px-10 flex items-center">
          <div className="w-full md:w-[80%] mx-auto flex items-center justify-between">
            <div className="flex flex-col justify-start">
              <span className="text-[#c8a668] text-xs uppercase tracking-wider">
                Tebak Gambar
              </span>
              <span className="text-xl md:text-2xl text-white font-medium">
                Jawa Barat
              </span>
            </div>
            <Link
              href="/arena"
              className="text-white py-1.5 px-4 rounded-lg border border-[#5B5B5B] bg-[#0D1922] hover:bg-[#1a2832] transition text-sm md:text-base"
            >
              Kembali ke Arena
            </Link>
          </div>
        </nav>

        <GuessImageSummary
          correctAnswers={correctAnswers}
          totalQuestions={questions.length}
          xpEarned={xpEarned}
          maxPossibleXp={maxPossibleXP}
          totalTime={totalTime}
          results={results}
        />
      </main>
    );
  }

  // Game Play Screen
  return (
    <main className="min-h-screen w-full bg-[#0D1922] flex flex-col items-center overflow-y-auto">
      {/* Navigation bar */}
      <nav className="w-full h-20 bg-[#1a2832] px-4 md:px-10 flex items-center">
        <div className="w-full md:w-[80%] mx-auto flex flex-row items-center justify-between gap-2 md:gap-0">
          <div className="flex flex-col justify-start">
            <span className="text-[#c8a668] text-xs uppercase tracking-wider">
              Kuis Budaya
            </span>
            <span className="text-xl md:text-2xl text-white font-medium">
              Jawa Barat
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#c7c7c7] text-sm md:text-lg">
                Total XP:{" "}
              </span>
              <span className="text-[#c8a668] font-bold text-sm md:text-lg">
                {xpEarned}
              </span>
            </div>
            <Link
              href="/arena"
              className="text-red-500 py-1.5 px-3 md:px-4 rounded-lg border border-red-500 bg-red-500/30 hover:bg-red-500/50 transition text-sm md:text-base"
            >
              Quit
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="w-full flex-1 p-4 md:p-8 mt-4 md:mt-8">
        <GuessImageQuestion
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          timeLeft={timeLeft}
          isAnswered={isAnswered}
          potentialXP={potentialXP}
        />

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < currentQuestionIndex
                  ? "bg-[#c8a668] w-8"
                  : index === currentQuestionIndex
                  ? "bg-[#c8a668]"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* XP Guide */}
        <div className="mt-8 bg-[#1a2832] rounded-xl p-4 md:p-6 border border-[#5B5B5B] max-w-[900px] mx-auto">
          <h3 className="text-white font-semibold mb-3 text-sm md:text-base">
            💡 Panduan Perolehan XP:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xs md:text-sm text-[#c7c7c7]">
                <span className="text-red-400 font-semibold">Kabur</span>{" "}
                (20-14s): <span className="text-white font-bold">14 XP</span>
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-xs md:text-sm text-[#c7c7c7]">
                <span className="text-yellow-400 font-semibold">
                  Agak Kabur
                </span>{" "}
                (13-7s): <span className="text-white font-bold">10 XP</span>
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs md:text-sm text-[#c7c7c7]">
                <span className="text-green-400 font-semibold">Jelas</span>{" "}
                (6-0s): <span className="text-white font-bold">6 XP</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TebakGambar;
