export const endpoints = {
  provinces: {
    getAll: '/provinces',
    getBySlug: (slug) => `/provinces/slug/${slug}`,
  },

  gameResults: {
    getAll: '/game-results',
    create: '/game-results',
  },

  quizzes: {
    getAll: '/quizzes',
  },

  achievements: {
    getAll: (provinceId) => `/achievements/all?province_id=${provinceId}`,
  },

  imageGuesses: {
    getAll: (provinceId) => `/image-guesses?provinceId=${provinceId}`,
  }
}