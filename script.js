function setLang(lang) {
  const btnJpn = document.getElementById("btnJpn");
  const btnEng = document.getElementById("btnEng");

  if (lang === "jpn") {
    btnJpn.classList.add("selected");
    btnEng.classList.remove("selected");

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 100);

  } else {
    btnEng.classList.add("selected");
    btnJpn.classList.remove("selected");

    setTimeout(() => {
      window.location.href = "en/index.html";
    }, 100);
  }
}



// ナビゲーションメニュー開閉
function toggleMenu() {
  const menu = document.querySelector(".navbar-nav"); // idではなくclassに修正
  menu.classList.toggle("show");
}

// ナビゲーション内リンククリックで閉じる
document.querySelectorAll('.navbar-nav a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.querySelector(".navbar-nav");
    menu.classList.remove("show"); 
  });
});

document.addEventListener("DOMContentLoaded", () => {

  // PC はカルーセル無効
  if (window.matchMedia("(min-width: 1025px)").matches) return;

  const slider = document.querySelector(".slider");
  const track = slider.querySelector(".track");
  const slides = Array.from(track.children);
  const dotsContainer = slider.querySelector(".dots");

  const slideCount = slides.length;

  // ============================
  // ① ドット生成
  // ============================
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  // ============================
  // ② ドット同期
  // ============================
  function updateDots(index) {
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function getIndex() {
    return Math.round(track.scrollLeft / slider.clientWidth);
  }

  track.addEventListener("scroll", () => {
    updateDots(getIndex());
  });

  // ============================
  // ③ ドットタップで移動
  // ============================
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      track.scrollTo({
        left: i * slider.clientWidth,
        behavior: "smooth"
      });
    });
  });

  // ============================
  // ④ 自動再生
  // ============================
  let autoPlay = setInterval(() => {
    const next = (getIndex() + 1) % slideCount;
    track.scrollTo({
      left: next * slider.clientWidth,
      behavior: "smooth"
    });
  }, 3500); // ← 自動再生速度（調整可）

  // スワイプ開始で自動再生停止（気持ちよさ重視）
  track.addEventListener("touchstart", () => {
    clearInterval(autoPlay);
  });

  // ============================
  // ⑤ 無限ループ（3→1 / 1→3）
  // ============================
  track.addEventListener("scroll", () => {
    const slideWidth = slider.clientWidth;
    const maxScroll = slideWidth * (slideCount - 1);

    // 最後 → 最初へ
    if (track.scrollLeft >= maxScroll + slideWidth / 2) {
      track.scrollTo({ left: 0, behavior: "instant" });
    }

    // 最初 → 最後へ
    if (track.scrollLeft <= -slideWidth / 2) {
      track.scrollTo({ left: maxScroll, behavior: "instant" });
    }
  });

});




// FLOWセクションのステップ切り替え
let currentStep = 0;
const steps = document.querySelectorAll('.step');
const buttons = document.querySelectorAll('.step-buttons button');
const flowSection = document.querySelector('.flow');

function showStep(index) {
  if (index < 0) index = 0;
  if (index >= steps.length) index = steps.length - 1;
  currentStep = index;

  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    showStep(parseInt(btn.dataset.step, 10));
  });
});

flowSection.addEventListener('wheel', (event) => {
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  if (!isLastStep && event.deltaY > 0) {
    event.preventDefault();
    showStep(currentStep + 1);
  } else if (!isFirstStep && event.deltaY < 0) {
    event.preventDefault();
    showStep(currentStep - 1);
  }
});

// スクロールでセクションを表示
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.05 // 5%見えたら発火に変更
});

sections.forEach(section => {
  observer.observe(section);
});

// ヘッダー画像はロード時に表示
window.addEventListener("load", () => {
  const headImage = document.querySelector(".head-image");
  if (headImage) headImage.classList.add("show");
});

// 画像ストリップ生成
const strip = document.querySelector('.image-strip');
if (strip) {
  const imgWidth = 300;
  const screenWidth = window.innerWidth;
  const count = Math.floor(screenWidth / imgWidth);

  strip.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = "/m-parfum.jp/pic/Parfum de reve/test1.jpg";
    img.style.height = "200px";
    img.style.width = imgWidth + "px";
    img.style.objectFit = "cover";
    strip.appendChild(img);
  }
}

// トップへ戻るボタン
document.querySelector('.back-to-top a').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
