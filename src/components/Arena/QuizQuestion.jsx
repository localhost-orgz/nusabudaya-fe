// src/components/Quiz/QuizQuestion.jsx
import React, { useEffect } from "react";
import { Clock } from "lucide-react";

const QuizQuestion = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  timeLeft,
  isAnswered,
}) => {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Question Header */}
      <div className="bg-[#1a2832] rounded-xl p-4 md:p-6 mb-6 border border-[#5B5B5B]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#c8a668] text-sm md:text-base font-semibold">
            Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <Clock
              className={`w-5 h-5 ${
                timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-[#c8a668]"
              }`}
            />
            <span
              className={`text-lg md:text-xl font-bold ${
                timeLeft <= 5 ? "text-red-500" : "text-white"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full rounded-full h-2 bg-gray-700 mb-4">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft <= 5 ? "bg-red-500" : "bg-[#c8a668]"
            }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          ></div>
        </div>

        {/* Question Text */}
        <h2 className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {question.choices.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.answer;

          let buttonStyle =
            "bg-[#1a2832] border-[#5B5B5B] hover:border-[#c8a668] hover:bg-[#c8a668]/10";

          if (isAnswered) {
            if (isCorrect) {
              buttonStyle = "bg-green-500/20 border-green-500";
            } else if (isSelected && !isCorrect) {
              buttonStyle = "bg-red-500/20 border-red-500";
            }
          } else if (isSelected) {
            buttonStyle = "bg-[#c8a668]/20 border-[#c8a668]";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswerSelect(option)}
              disabled={isAnswered}
              className={`${buttonStyle} border-2 rounded-xl p-4 md:p-5 text-left transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-sm md:text-base ${
                    isAnswered
                      ? isCorrect
                        ? "bg-green-500 border-green-500 text-white"
                        : isSelected
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-[#1a2832] border-[#5B5B5B] text-[#c7c7c7]"
                      : isSelected
                      ? "bg-[#c8a668] border-[#c8a668] text-[#0D1922]"
                      : "bg-[#0D1922] border-[#5B5B5B] text-[#c7c7c7]"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span
                  className={`text-base md:text-lg ${
                    isAnswered
                      ? isCorrect
                        ? "text-green-400 font-semibold"
                        : isSelected
                        ? "text-red-400 font-semibold"
                        : "text-[#c7c7c7]"
                      : "text-white"
                  }`}
                >
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after answering) */}
      {isAnswered && (
        <div className="mt-6 bg-[#1a2832] rounded-xl p-4 md:p-6 border border-[#c8a668] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c8a668] flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-[#0D1922]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-[#c8a668] font-semibold mb-2">Penjelasan:</h4>
              <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
