document.addEventListener("DOMContentLoaded", () => {

  const loader = document.getElementById("loader");
  const startBtn = document.getElementById("startBtn");
  const app = document.getElementById("app");
  const bgMusic = document.getElementById("bgMusic");
  const langBtn = document.getElementById("langBtn");
  const timer = document.getElementById("timer");
  const tick = document.getElementById("tickSound");


  /* ================= START JOURNEY ================= */
 
  startBtn.addEventListener("click", () => {
  bgMusic.volume = 0.8;
  bgMusic.play().catch(() => {});
  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";

    // 🔹 SHOW PAGE 2 (Story)
    story.classList.remove("hidden");
  }, 700);
});


  /* ================= LANGUAGE DATA ================= */
  let lang = "ko";

  const text = {
    ko: {
      title: "다가오는 결혼을 진심으로 축하합니다",
      subtitle: "말이 아닌 마음으로 새겨진 서약.",
      countTitle: "결혼식까지 남은 시간",
      messageTitle: "곧 서약이 오가고, 약속은 영원으로 이어집니다.",
      messageBody: "축제가 시작되기 전의 고요한 순간 속에서,그들의 마음은 함께 써 내려갈 삶을 향해 준비하고 있습니다.",
      promiseTitle: "사랑이라는 약속",
      promiseBody: "결혼은 일상의 순간들 속에 조용히 속삭여지는 약속입니다.사랑하고, 함께 성장하며, 언제나 곁에 머무르겠다는 약속.",
      quote: "“사랑이란 서로를 바라보는 것이 아니라, 같은 방향을 함께 바라보는 것이다.” — 앙투안 드 생텍쥐페리",
      footer: "영원으로 향한 카운트다운이 시작되었고, 기쁨은 매 순간마다 춤을 춥니다.2026년 3월 5일을 향해 걸어가는 이 길 위에서, 사랑이 늘 함께하고 웃음이 따라오며, 하루하루가 지날수록 행복이 더욱 깊어지기를 바랍니다."
    },
    en: {
      title: "Warm Congratulations on Your Upcoming Wedding",
      subtitle: "A vow written not in words, but in hearts.",
      countTitle: "Time Remaining Until the Wedding",
      messageTitle: "Soon, vows will be spoken and promises sealed",
      messageBody: "In the stillness before the celebration, their hearts prepare to step into a life written together.",
      promiseTitle: "A Promise Called Love",
      promiseBody: "Marriage is a quiet promise whispered in everyday moments: to love, to grow, and to remain—always.",
      quote: "“Love does not consist of gazing at each other, but in looking outward together in the same direction.”  ——— Antoine de Saint-Exupéry",

      footer: "The countdown to forever has begun, and joy dances in every moment. As you walk toward March 5, 2026, may love surround you, laughter follow you, and happiness grow deeper with each passing day."
    }
  };

  const timeLabels = {
    ko: { d: "일", h: "시간", m: "분", s: "초" },
    en: { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }
  };

  function applyLanguage(animate = true) {
    const nodes = document.querySelectorAll("[data-key]");

    if (!animate) {
      nodes.forEach(el => {
        el.textContent = text[lang][el.dataset.key];
      });
      return;
    }

    gsap.to(nodes, {
      opacity: 0,
      duration: 0.25,
      stagger: 0.01,
      onComplete: () => {
        nodes.forEach(el => {
          el.textContent = text[lang][el.dataset.key];
        });
        gsap.to(nodes, {
          opacity: 1,
          duration: 0.35,
          stagger: 0.01
        });
      }
    });
  }

  applyLanguage(false);

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lang = lang === "ko" ? "en" : "ko";
    langBtn.textContent = lang === "ko" ? "ENGLISH" : "한국어";
    applyLanguage(true);
  });

  /* ================= COUNTDOWN (LANGUAGE-AWARE) ================= */
  /* ================= PER-DIGIT COUNTDOWN ================= */

  const weddingDate = new Date("2026-03-05T10:00:00").getTime();
  let prevString = "";

  function renderTimer(str) {
    timer.innerHTML = "";

    [...str].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "digit";
      span.textContent = char;

      if (prevString[i] !== char) {
        span.classList.add("flip");
      }

      timer.appendChild(span);
    });

    prevString = str;
  }

  setInterval(() => {
    const diff = weddingDate - Date.now();

    tick.currentTime = 0;
    tick.volume = 0.15;
    tick.play().catch(() => { });


    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    let output =
      lang === "en"
        ? `${d}d ${h}h ${m}m ${s}s`
        : `${d}일 ${h}시간 ${m}분 ${s}초`;

    renderTimer(output);
  }, 1000);


  /* ================= FLOWER BACKGROUND ================= */
  const petals = document.getElementById("petals");
  const flowerTypes = ["🌸", "🌼", "🍃", "💮", "✨"];

  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDelay = Math.random() * 10 + "s";
    p.classList.add(Math.random() > 0.5 ? "slow" : "fast");
    if (Math.random() > 0.7) p.classList.add("fade");
    if (Math.random() > 0.8) p.classList.add("glow");
    petals.appendChild(p);
  }

  /* ================= SCROLL ANIMATIONS ================= */
  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      duration: 1.1,
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    });
  });

});

const toHome = document.getElementById("toHome");
const story = document.getElementById("story");
const app = document.getElementById("app"); // make sure this exists

toHome.addEventListener("click", () => {
  story.style.opacity = "0";

  setTimeout(() => {
    // Hide Page 2
    story.classList.add("hidden");
    story.style.display = "none";

    // Show Page 3
    app.classList.remove("hidden");

    // ✅ Reset scroll AFTER layout is visible
    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // ✅ FORCE GSAP to re-calc reveal animations
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh(true);
      }
    });

  }, 500);
});



// /* ===============================
//    PAGE 2 → PAGE 3 TRANSITION
//    =============================== */

// const toHomeBtn = document.getElementById("toHomeBtn");
// const storyPage = document.getElementById("story");
// const appPage = document.getElementById("app");

// if (toHomeBtn) {
//   toHomeBtn.addEventListener("click", () => {
//     storyPage.classList.add("hidden");
//     appPage.classList.remove("hidden");

//     // smooth start position
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });
// }




