// src/components/GuessImage/GuessImageQuestion.jsx
import React from "react";
import { Clock, Eye, EyeOff } from "lucide-react";
import { GUESS_IMAGE_CONFIG } from "@/constants/guessImageQuestions";

const GuessImageQuestion = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  timeLeft,
  isAnswered,
  potentialXP,
}) => {
  const currentStage = GUESS_IMAGE_CONFIG.getBlurStage(timeLeft);

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* Question Header */}
      <div className="bg-[#1a2832] rounded-xl p-4 md:p-6 mb-6 border border-[#5B5B5B]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#c8a668] text-sm md:text-base font-semibold">
            Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
          </span>
          <div className="flex items-center gap-3">
            {/* Blur Stage Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0D1922] rounded-lg border border-[#5B5B5B]">
              {currentStage.blurAmount > 7 ? (
                <EyeOff className={`w-4 h-4 ${currentStage.color}`} />
              ) : (
                <Eye className={`w-4 h-4 ${currentStage.color}`} />
              )}
              <span className={`text-sm font-semibold ${currentStage.color}`}>
                {currentStage.label}
              </span>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock
                className={`w-5 h-5 ${
                  timeLeft <= 5
                    ? "text-red-500 animate-pulse"
                    : "text-[#c8a668]"
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
        </div>

        {/* Progress Bar */}
        <div className="w-full rounded-full h-2 bg-gray-700 mb-4">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft <= 5 ? "bg-red-500" : "bg-[#c8a668]"
            }`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          ></div>
        </div>

        {/* Potential XP Badge */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl text-white font-semibold">
            {question.question}
          </h2>
          {!isAnswered && (
            <div className="ml-4 px-3 py-1.5 bg-[#c8a668]/20 border border-[#c8a668] rounded-lg shrink-0">
              <span className="text-[#c8a668] font-bold text-sm md:text-base">
                +{potentialXP} XP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Image Display */}
      <div className="bg-[#1a2832] rounded-xl p-4 md:p-6 mb-6 border border-[#5B5B5B]">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
          <img
            src={question.image_url}
            alt="Tebak gambar"
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: `blur(${currentStage.blurAmount}px)`,
            }}
          />

          {/* Blur Stage Indicator (Mobile) */}
          <div className="md:hidden absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg border border-[#5B5B5B]">
            <div className="flex items-center gap-2">
              {currentStage.blurAmount > 7 ? (
                <EyeOff className={`w-4 h-4 ${currentStage.color}`} />
              ) : (
                <Eye className={`w-4 h-4 ${currentStage.color}`} />
              )}
              <span className={`text-sm font-semibold ${currentStage.color}`}>
                {currentStage.label}
              </span>
            </div>
          </div>

          {/* XP Info Overlay */}
          {!isAnswered && (
            <div className="absolute bottom-3 right-3 flex flex-col gap-1">
              <div
                className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                  timeLeft >= 14
                    ? "bg-red-500/80 text-white"
                    : timeLeft >= 7
                    ? "bg-yellow-500/80 text-gray-900"
                    : "bg-green-500/80 text-white"
                }`}
              >
                Sekarang: +{potentialXP} XP
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {question.choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = choice === question.answer;

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
              onClick={() => !isAnswered && onAnswerSelect(choice)}
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
                  {choice}
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

export default GuessImageQuestion;
