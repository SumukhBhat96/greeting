AOS.init({
  duration: 900,
  once: true
});

const translations = {
  ko: {
    title: "결혼을 진심으로 축하합니다",
    subtitle: "사랑과 행복이 가득한 인생의 새로운 시작을 축복합니다",
    messageTitle: "축복의 말씀",
    messageBody:
      "두 분의 결혼이 서로에 대한 믿음과 사랑으로 언제나 빛나길 바랍니다. 함께 웃고, 함께 성장하는 아름다운 가정을 이루시길 기원합니다.",
    quote: "“사랑은 약속이 아니라, 매일 선택하는 것입니다.”",
    footer: "두 분의 행복한 결혼 생활을 진심으로 기원합니다"
  },
  en: {
    title: "Heartfelt Congratulations on Your Wedding",
    subtitle: "Wishing you a beautiful new beginning filled with love and happiness",
    messageTitle: "A Message of Blessings",
    messageBody:
      "May your marriage shine with love and trust. Wishing you a lifetime of laughter, growth, and a beautiful journey together.",
    quote: "“Love is not a promise, but a choice made every day.”",
    footer: "Wishing you a lifetime of love and a happy married life"
  }
};

let lang = "ko";

document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "ko" ? "en" : "ko";
  document.getElementById("langBtn").textContent =
    lang === "ko" ? "ENGLISH" : "한국어";

  document.querySelectorAll("[data-key]").forEach(el => {
    el.textContent = translations[lang][el.dataset.key];
  });

  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
});
