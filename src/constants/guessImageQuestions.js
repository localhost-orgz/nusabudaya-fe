// src/constants/guessImageQuestions.js

export const GUESS_IMAGE_CONFIG = {
  TOTAL_QUESTIONS: 6,
  TIME_PER_QUESTION: 20, // seconds
  BASE_XP: 14,

  // Blur stages based on time remaining
  BLUR_STAGES: {
    BLURRY: {
      timeRange: [14, 20], // 20-14 seconds remaining
      blurAmount: 15,
      xpMultiplier: 1.0, // Full XP (14 XP)
      label: "Kabur",
      color: "text-red-500",
    },
    A_BIT_BLURRY: {
      timeRange: [7, 13], // 13-7 seconds remaining
      blurAmount: 7,
      xpMultiplier: 0.71, // ~10 XP
      label: "Agak Kabur",
      color: "text-yellow-500",
    },
    CLEAR: {
      timeRange: [0, 6], // 6-0 seconds remaining
      blurAmount: 0,
      xpMultiplier: 0.43, // ~6 XP
      label: "Jelas",
      color: "text-green-500",
    },
  },

  // Calculate XP based on time remaining
  calculateXP: (timeRemaining) => {
    if (timeRemaining >= 14) {
      return Math.round(
        GUESS_IMAGE_CONFIG.BASE_XP *
          GUESS_IMAGE_CONFIG.BLUR_STAGES.BLURRY.xpMultiplier
      );
    } else if (timeRemaining >= 7) {
      return Math.round(
        GUESS_IMAGE_CONFIG.BASE_XP *
          GUESS_IMAGE_CONFIG.BLUR_STAGES.A_BIT_BLURRY.xpMultiplier
      );
    } else {
      return Math.round(
        GUESS_IMAGE_CONFIG.BASE_XP *
          GUESS_IMAGE_CONFIG.BLUR_STAGES.CLEAR.xpMultiplier
      );
    }
  },

  // Get current blur stage
  getBlurStage: (timeRemaining) => {
    if (timeRemaining >= 14) return GUESS_IMAGE_CONFIG.BLUR_STAGES.BLURRY;
    if (timeRemaining >= 7) return GUESS_IMAGE_CONFIG.BLUR_STAGES.A_BIT_BLURRY;
    return GUESS_IMAGE_CONFIG.BLUR_STAGES.CLEAR;
  },
};

export const GUESS_IMAGE_QUESTIONS = {
  "Jawa Barat": [
    {
      id: 1,
      imageUrl:
        "https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg",
      question: "Apa nama tarian tradisional yang ditampilkan pada gambar?",
      options: ["Tari Jaipong", "Tari Saman", "Tari Kecak", "Tari Piring"],
      correctAnswer: 0,
      explanation:
        "Tari Jaipong adalah tarian tradisional khas Jawa Barat yang terkenal dengan gerakan dinamis dan ekspresif.",
    },
    {
      id: 2,
      imageUrl:
        "https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg",
      question: "Alat musik tradisional apa yang terlihat pada gambar?",
      options: ["Gamelan", "Angklung", "Sasando", "Kolintang"],
      correctAnswer: 1,
      explanation:
        "Angklung adalah alat musik multitonal tradisional Indonesia yang terbuat dari bambu, berasal dari Jawa Barat.",
    },
    {
      id: 3,
      imageUrl:
        "https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg",
      question: "Bangunan tradisional apa yang ditunjukkan pada gambar?",
      options: [
        "Rumah Gadang",
        "Rumah Kasepuhan",
        "Rumah Joglo",
        "Rumah Limas",
      ],
      correctAnswer: 1,
      explanation:
        "Rumah Kasepuhan adalah kompleks keraton di Cirebon yang merupakan rumah adat khas Jawa Barat.",
    },
    {
      id: 4,
      imageUrl:
        "https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg",
      question: "Makanan khas apa yang terlihat pada gambar?",
      options: ["Rendang", "Gudeg", "Nasi Liwet", "Rawon"],
      correctAnswer: 2,
      explanation:
        "Nasi Liwet adalah makanan khas Sunda dari Jawa Barat yang dimasak dengan santan dan rempah-rempah.",
    },
    {
      id: 5,
      imageUrl:
        "https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg",
      question: "Senjata tradisional apa yang ditampilkan pada gambar?",
      options: ["Keris", "Kujang", "Rencong", "Mandau"],
      correctAnswer: 1,
      explanation:
        "Kujang adalah senjata tradisional khas masyarakat Sunda yang memiliki filosofi mendalam dalam budaya Jawa Barat.",
    },
    {
      id: 6,
      imageUrl:
        "https://cdn.antaranews.com/cache/1200x800/2011/01/20110122034405saman.jpg",
      question: "Pakaian adat apa yang dikenakan pada gambar?",
      options: ["Kebaya Jawa", "Kebaya Sunda", "Baju Bodo", "Ulos"],
      correctAnswer: 1,
      explanation:
        "Kebaya Sunda adalah pakaian adat tradisional dari Jawa Barat yang sering dikenakan dalam acara-acara formal.",
    },
  ],
};

export const getGuessImageQuizByProvince = (provinceName) => {
  return (
    GUESS_IMAGE_QUESTIONS[provinceName] || GUESS_IMAGE_QUESTIONS["Jawa Barat"]
  );
};
