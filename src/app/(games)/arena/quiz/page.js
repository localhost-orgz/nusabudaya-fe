// src/app/(games)/arena/quiz/page.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import QuizQuestion from "@/components/Arena/QuizQuestion";
import QuizSummary from "@/components/Arena/QuizSummary";
import { getQuizByProvince, QUIZ_CONFIG } from "@/constants/quizQuestions";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.TIME_PER_QUESTION);
  const [xpEarned, setXpEarned] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  // Get questions - for now using Jawa Barat
  const questions = getQuizByProvince("Jawa Barat");
  const currentQuestion = questions[currentQuestionIndex];

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

    // Save result
    const newResult = {
      questionId: currentQuestion.id,
      isCorrect,
      isTimeout: false,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
    };
    setResults([...results, newResult]);

    if (isCorrect) {
      setXpEarned(xpEarned + QUIZ_CONFIG.XP_PER_CORRECT);
    }

    // Move to next question after 2 seconds
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
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
      setTimeLeft(QUIZ_CONFIG.TIME_PER_QUESTION);
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
                Kuis Budaya
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

        <QuizSummary
          correctAnswers={correctAnswers}
          totalQuestions={questions.length}
          xpEarned={xpEarned}
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
        <div className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
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
        <QuizQuestion
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          timeLeft={timeLeft}
          isAnswered={isAnswered}
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
      </div>
    </main>
  );
};

export default Quiz;
