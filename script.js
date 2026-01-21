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
    bgMusic.play().catch(() => { });
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      app.classList.remove("hidden");
    }, 700);
  });

  /* ================= LANGUAGE DATA ================= */
  let lang = "ko";

  const text = {
    ko: {
      title: "다가오는 결혼을 진심으로 축하합니다",
      subtitle: "사랑이 평생의 약속이 되는 순간을 축복합니다",
      countTitle: "결혼식까지 남은 시간",
      messageTitle: "결혼을 앞둔 두 분께",
      messageBody: "서로를 선택한 순간부터 가장 아름다운 이야기는 시작되었습니다.",
      promiseTitle: "사랑이라는 약속",
      promiseBody: "결혼은 완벽함이 아니라 매일 사랑을 선택하는 것입니다.",
      quote: "“결혼은 사랑의 끝이 아니라 사랑을 매일 선택하는 시작입니다.”",
      footer: "2026년 3월 5일을 향한 두 분의 여정을 응원합니다"
    },
    en: {
      title: "Warm Congratulations on Your Upcoming Wedding",
      subtitle: "Celebrating the moment love becomes a lifelong promise",
      countTitle: "Time Remaining Until the Wedding",
      messageTitle: "To the Soon-to-Be Married Couple",
      messageBody: "From the moment you chose each other, a beautiful story began.",
      promiseTitle: "A Promise Called Love",
      promiseBody: "Marriage is not about perfection, but choosing love every day.",
      quote: "“Marriage is not the end of love, but the beginning of choosing it daily.”",
      footer: "Cheering for your beautiful journey toward March 5, 2026"
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

