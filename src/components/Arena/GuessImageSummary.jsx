// src/components/GuessImage/GuessImageSummary.jsx
import React from "react";
import Link from "next/link";
import {
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  ArrowLeft,
  Crown,
  Eye,
  EyeOff,
} from "lucide-react";

const GuessImageSummary = ({
  correctAnswers,
  totalQuestions,
  xpEarned,
  maxPossibleXp,
  totalTime,
  results,
}) => {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceRating = () => {
    if (accuracy === 100 && xpEarned >= maxPossibleXp * 0.9)
      return { text: "Sempurna! 🌟", color: "text-yellow-400" };
    if (accuracy >= 83) return { text: "Hebat! 🎉", color: "text-green-400" };
    if (accuracy >= 66) return { text: "Bagus! 👍", color: "text-blue-400" };
    if (accuracy >= 50)
      return { text: "Cukup Baik 💪", color: "text-purple-400" };
    return { text: "Tetap Semangat! 💫", color: "text-gray-400" };
  };

  const performance = getPerformanceRating();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStageIcon = (stage) => {
    if (stage === "Kabur") return <EyeOff className="w-4 h-4 text-red-400" />;
    if (stage === "Agak Kabur")
      return <Eye className="w-4 h-4 text-yellow-400" />;
    return <Eye className="w-4 h-4 text-green-400" />;
  };

  const getStageColor = (stage) => {
    if (stage === "Kabur") return "text-red-400";
    if (stage === "Agak Kabur") return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="w-full max-w-[900px] mx-auto p-5 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="mb-4">
          <Trophy className="w-20 h-20 md:w-24 md:h-24 mx-auto text-[#c8a668] animate-bounce" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Tebak Gambar Selesai! 🎉
        </h1>
        <p className="text-lg md:text-xl text-[#c7c7c7]">
          Berikut adalah ringkasan hasil permainan kamu
        </p>
      </div>

      {/* Performance Rating */}
      <div className="bg-[#1a2832] rounded-xl p-6 mb-6 border border-[#5B5B5B]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Target className={`w-8 h-8 ${performance.color}`} />
          <h2 className={`text-2xl md:text-3xl font-bold ${performance.color}`}>
            {performance.text}
          </h2>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* XP Earned */}
        <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
          <Zap className="w-8 h-8 text-[#c8a668] mb-2" />
          <span className="text-sm text-[#c7c7c7] mb-1">Total XP</span>
          <span className="text-2xl md:text-3xl font-bold text-[#c8a668]">
            {xpEarned}
          </span>
          <span className="text-xs text-[#c7c7c7] mt-1">
            dari {maxPossibleXp}
          </span>
        </div>

        {/* Correct Answers */}
        <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
          <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
          <span className="text-sm text-[#c7c7c7] mb-1">Benar</span>
          <span className="text-2xl md:text-3xl font-bold text-white">
            {correctAnswers}/{totalQuestions}
          </span>
        </div>

        {/* Accuracy */}
        <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
          <Trophy className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-sm text-[#c7c7c7] mb-1">Akurasi</span>
          <span className="text-2xl md:text-3xl font-bold text-white">
            {accuracy}%
          </span>
        </div>

        {/* Total Time */}
        <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
          <Clock className="w-8 h-8 text-purple-400 mb-2" />
          <span className="text-sm text-[#c7c7c7] mb-1">Waktu</span>
          <span className="text-2xl md:text-3xl font-bold text-white">
            {formatTime(totalTime)}
          </span>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-[#1a2832] rounded-xl p-6 mb-8 border border-[#5B5B5B]">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-[#c8a668]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Ringkasan Jawaban
        </h3>
        <div className="space-y-3">
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 md:p-4 rounded-lg ${
                result.isCorrect
                  ? "bg-green-500/10 border border-green-500/30"
                  : result.isTimeout
                  ? "bg-yellow-500/10 border border-yellow-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                {result.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : result.isTimeout ? (
                  <Clock className="w-5 h-5 text-yellow-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <span className="text-white text-sm md:text-base font-medium block">
                    Pertanyaan {index + 1}
                  </span>
                  {result.isCorrect && (
                    <div className="flex items-center gap-2 mt-1">
                      {getStageIcon(result.stage)}
                      <span
                        className={`text-xs ${getStageColor(result.stage)}`}
                      >
                        Dijawab saat {result.stage}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-semibold block ${
                    result.isCorrect
                      ? "text-green-400"
                      : result.isTimeout
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {result.isCorrect
                    ? "Benar ✓"
                    : result.isTimeout
                    ? "Waktu Habis ⏱️"
                    : "Salah ✗"}
                </span>
                {result.isCorrect && (
                  <span className="text-xs text-[#c8a668] font-bold">
                    +{result.xpEarned} XP
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* XP Breakdown */}
      <div className="bg-[#1a2832] rounded-xl p-6 mb-8 border border-[#5B5B5B]">
        <h3 className="text-lg font-bold text-white mb-4">
          Rincian Perolehan XP
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-red-400" />
              <span className="text-[#c7c7c7] text-sm">
                Jawaban saat Kabur (14 XP):
              </span>
            </div>
            <span className="text-white font-semibold">
              {results.filter((r) => r.stage === "Kabur" && r.isCorrect).length}{" "}
              jawaban
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-yellow-400" />
              <span className="text-[#c7c7c7] text-sm">
                Jawaban saat Agak Kabur (10 XP):
              </span>
            </div>
            <span className="text-white font-semibold">
              {
                results.filter((r) => r.stage === "Agak Kabur" && r.isCorrect)
                  .length
              }{" "}
              jawaban
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-400" />
              <span className="text-[#c7c7c7] text-sm">
                Jawaban saat Jelas (6 XP):
              </span>
            </div>
            <span className="text-white font-semibold">
              {results.filter((r) => r.stage === "Jelas" && r.isCorrect).length}{" "}
              jawaban
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/arena"
          className="flex-1 bg-[#1a2832] text-white py-4 rounded-lg border border-[#5B5B5B] hover:bg-[#0D1922] transition font-semibold text-center flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Arena
        </Link>
        <Link
          href="/leaderboard"
          className="flex-1 bg-[#c8a668] text-[#0D1922] py-4 rounded-lg hover:bg-[#d4b876] transition font-semibold text-center flex items-center justify-center gap-2"
        >
          <Crown className="w-5 h-5" />
          Lihat Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default GuessImageSummary;
