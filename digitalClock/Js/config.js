// config.js
const CLOCK_CONFIG = {
  username: "Sir/Mam", // Buyer can replace with their name

  themes: {
    morning: {
      bgImage: "linear-gradient(135deg, rgba(13, 30, 47, 0.85), rgba(12, 23, 39, 0.85)), url('assets/morning.svg')",
      greeting: "Good morning, {name}!"
    },
    afternoon: {
      bgImage: "linear-gradient(135deg, rgba(54, 37, 22, 0.85), rgba(72, 52, 28, 0.85)), url('assets/afternoon.svg')",
      greeting: "Good afternoon, {name}!"
    },
    evening: {
      bgImage: "linear-gradient(135deg, rgba(36, 19, 61, 0.85), rgba(55, 30, 67, 0.85)), url('assets/evening.svg')",
      greeting: "Good evening, {name}!"
    },
    night: {
      bgImage: "linear-gradient(135deg, rgba(16, 24, 40, 0.92), rgba(12, 18, 31, 0.92)), url('assets/night.svg')",
      greeting: "Good night, {name}!"
    }
  },

  defaultStyle: "radial-gradient" 
};