// src/constants/quizQuestions.js

export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 8,
  TIME_PER_QUESTION: 15, // seconds
  XP_PER_CORRECT: 10,
  TOTAL_XP: 80,
};

export const QUIZ_QUESTIONS = {
  "Jawa Barat": [
    {
      id: 1,
      question: "Apa nama rumah adat dari Jawa Barat?",
      options: [
        "Rumah Gadang",
        "Rumah Kasepuhan",
        "Rumah Joglo",
        "Rumah Limas",
      ],
      correctAnswer: 1,
      explanation:
        "Rumah Kasepuhan adalah kompleks keraton di Cirebon yang memadukan arsitektur Jawa, Hindu, Islam, Cina, dan Eropa.",
    },
    {
      id: 2,
      question: "Tarian tradisional khas Jawa Barat adalah?",
      options: ["Tari Saman", "Tari Jaipong", "Tari Kecak", "Tari Piring"],
      correctAnswer: 1,
      explanation:
        "Tari Jaipong adalah tarian rakyat modern dengan gerakan pinggul yang eksotis, cepat, dan penuh semangat.",
    },
    {
      id: 3,
      question: "Ibu kota provinsi Jawa Barat adalah?",
      options: ["Surabaya", "Semarang", "Bandung", "Yogyakarta"],
      correctAnswer: 2,
      explanation: "Bandung adalah ibu kota provinsi Jawa Barat.",
    },
    {
      id: 4,
      question: "Alat musik tradisional khas Sunda adalah?",
      options: ["Gamelan", "Angklung", "Sasando", "Kolintang"],
      correctAnswer: 1,
      explanation:
        "Angklung adalah alat musik multitonal yang terbuat dari bambu dan diakui UNESCO sebagai warisan budaya dunia.",
    },
    {
      id: 5,
      question: "Makanan khas Jawa Barat yang terkenal adalah?",
      options: ["Rendang", "Gudeg", "Nasi Liwet", "Rawon"],
      correctAnswer: 2,
      explanation:
        "Nasi Liwet adalah makanan khas Sunda yang dimasak dengan santan dan dimakan dengan lauk pauk khas.",
    },
    {
      id: 6,
      question: "Bahasa daerah yang digunakan di Jawa Barat adalah?",
      options: ["Bahasa Jawa", "Bahasa Sunda", "Bahasa Madura", "Bahasa Bali"],
      correctAnswer: 1,
      explanation:
        "Bahasa Sunda adalah bahasa daerah yang digunakan oleh masyarakat Jawa Barat.",
    },
    {
      id: 7,
      question: "Senjata tradisional khas Jawa Barat adalah?",
      options: ["Keris", "Kujang", "Rencong", "Mandau"],
      correctAnswer: 1,
      explanation:
        "Kujang adalah senjata tradisional khas masyarakat Sunda yang memiliki filosofi mendalam.",
    },
    {
      id: 8,
      question: "Wayang tradisional khas Sunda adalah?",
      options: ["Wayang Kulit", "Wayang Golek", "Wayang Orang", "Wayang Beber"],
      correctAnswer: 1,
      explanation:
        "Wayang Golek adalah wayang kayu tiga dimensi khas Sunda yang berbeda dengan wayang kulit.",
    },
  ],
};

export const getQuizByProvince = (provinceName) => {
  return QUIZ_QUESTIONS[provinceName] || QUIZ_QUESTIONS["Jawa Barat"];
};
