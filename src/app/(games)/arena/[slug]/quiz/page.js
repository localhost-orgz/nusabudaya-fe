"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import QuizQuestion from "@/components/Arena/QuizQuestion";
import QuizSummary from "@/components/Arena/QuizSummary";
import { getQuizByProvince, QUIZ_CONFIG } from "@/constants/quizQuestions";
import { useParams } from "next/navigation";
import { provinceService } from "@/services/modules/province.service";
import { quizService } from "@/services/modules/quiz.service";
import GoldEmblem from "@/app/loading/page";
import { gameResultService } from "@/services/modules/game-result.service";
import { GameType } from "@/constants/gameType";

const Quiz = () => {
  const { slug } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.TIME_PER_QUESTION);
  const [xpEarned, setXpEarned] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [province, setProvince] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. fetch province
  useEffect(() => {
    if (!slug) return;

    const fetchProvince = async () => {
      try {
        const data = await provinceService.getBySlug(slug);
        setProvince(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProvince();
  }, [slug]);

  // 2. fetch quizzes
  useEffect(() => {
    if (!province?.id) return;

    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getByProvince(province.id);
        // Transform data to match component format if needed
        const transformedQuizzes = data.map(quiz => ({
          id: quiz.id,
          question: quiz.question,
          choices: quiz.choices,
          answer: quiz.answer,
          explanation: quiz.explanation
        }));
        setQuizzes(transformedQuizzes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [province?.id]);

  // Get questions - for now using Jawa Barat
  const currentQuestion = quizzes[currentQuestionIndex];

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

  const handleAnswerSelect = (answer) => {
    if (isAnswered || !currentQuestion) return;
  
    setSelectedAnswer(answer);
    setIsAnswered(true);
  
    const isCorrect = answer === currentQuestion.answer;
    const isLastQuestion = currentQuestionIndex === quizzes.length - 1;
  
    // Update results
    setResults(prev => {
      const newResults = [
        ...prev,
        {
          quizId: currentQuestion.id,
          isCorrect,
          isTimeout: false,
          selectedAnswer: answer,
          correctAnswer: currentQuestion.answer,
        }
      ];
      
      // If this is the last question, submit after showing explanation
      if (isLastQuestion) {
        setTimeout(() => {
          // Calculate final XP from all results including the last one
          const finalXp = newResults.filter(r => r.isCorrect).length * QUIZ_CONFIG.XP_PER_CORRECT;
          submitQuizResults(newResults, finalXp);
        }, 2000);
      }
      
      return newResults;
    });
  
    // Update XP for display
    if (isCorrect) {
      setXpEarned(prev => prev + QUIZ_CONFIG.XP_PER_CORRECT);
    }
  
    // Only move to next question if not the last question
    if (!isLastQuestion) {
      setTimeout(moveToNextQuestion, 2000);
    }
  };
  

  const handleTimeout = () => {
    if (!currentQuestion) return;
    
    setIsAnswered(true);

    const isLastQuestion = currentQuestionIndex === quizzes.length - 1;

    // Save timeout result
    const newResult = {
      quizId: currentQuestion.id,
      isCorrect: false,
      isTimeout: true,
      selectedAnswer: null,
      correctAnswer: currentQuestion.answer,
    };
    
    setResults(prev => {
      const newResults = [...prev, newResult];
      
      // If this is the last question, submit after showing timeout
      if (isLastQuestion) {
        setTimeout(() => {
          // Calculate final XP from all results (last question is wrong, so no XP added)
          const finalXp = newResults.filter(r => r.isCorrect).length * QUIZ_CONFIG.XP_PER_CORRECT;
          submitQuizResults(newResults, finalXp);
        }, 1000);
      }
      
      return newResults;
    });

    // Move to next question after 1 second if not the last question
    if (!isLastQuestion) {
      setTimeout(() => {
        moveToNextQuestion();
      }, 1000);
    }
  };

  const submitQuizResults = async (finalResults, finalXp) => {
    const provinceId = province.id;
    const type = GameType.QUIZ;
    const finalCorrectAnswers = finalResults.filter((r) => r.isCorrect).length;
    const isCompleted = Math.round((finalCorrectAnswers / quizzes.length) * 100) === 100;
    
    // Update XP state to match final calculation
    setXpEarned(finalXp);
    
    const resultData = {
      provinceId,
      type,
      xp: finalXp,
      time: totalTime,
      is_complete: isCompleted
    };
    
    try {
      await gameResultService.create(resultData);
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    }
    
    setQuizEnded(true);
  };

  const moveToNextQuestion = async () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(QUIZ_CONFIG.TIME_PER_QUESTION);
    }
  };

  const correctAnswers = results.filter((r) => r.isCorrect).length;

  if (loading) return <GoldEmblem />;

  // Summary Page
  if (quizEnded) {
    // Calculate final values for summary
    const finalCorrectAnswers = results.filter((r) => r.isCorrect).length;
    
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
                {province?.name || "Kuis Budaya"}
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
          correctAnswers={finalCorrectAnswers}
          totalQuestions={quizzes.length}
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
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quizzes.length}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            timeLeft={timeLeft}
            isAnswered={isAnswered}
          />
        )}

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {quizzes.map((_, index) => (
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
