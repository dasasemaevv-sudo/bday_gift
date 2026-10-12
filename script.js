// ============================================================
//   📸  ССЫЛКИ НА ФОТО
// ============================================================
// Все фото лежат в папке "photos/" рядом с index.html
// Закинь туда свои файлы с такими именами:
//   photos/photo1.jpg ... photos/photo6.jpg
//   photos/photo-final.jpg  (для финального экрана)
//
// Если твои файлы называются иначе — просто впиши их имена:
//   { src: 'photos/твоё_имя.jpg', caption: 'Подпись' },
// ============================================================

const photos = [
  { src: 'photos/photo1.jpg', caption: 'Помнишь нарядики для наших девочек на любой праздник? День святого Валентина' },
  { src: 'photos/photo2.jpg', caption: 'А наш мир в майне??? Я бы вставила скрины, но у меня их нет :(' },
  { src: 'photos/photo3.jpg', caption: 'Твои глупышки в Тамадачи :3' },
  { src: 'photos/photo4.jpg', caption: 'Помнишь как ты любишь Байченсов??? А помнишь как ты любишь создавать свои любимые отп в симсе?? Те же Пикозонты ;)' },
  { src: 'photos/photo5.jpg', caption: 'А ты помнишь, как я люблю Млб? Помнишь как я сохну по Дэму? Помнишь, что я глава Культа Дэма и Еды?' },
  { src: 'photos/photo6.jpg', caption: 'А как мы играли в последний эпизод Fears to Fathom, помнишь? Как у меня не получилось подключить взломку к серваку и ты купила мне игру :_)' },
];

// ====== ЭЛЕМЕНТЫ ======
const openBtn        = document.getElementById('openBtn');
const toMessageBtn   = document.getElementById('toMessageBtn');
const toPhotosBtn    = document.getElementById('toPhotosBtn');
const nextBtn        = document.getElementById('nextBtn');

const envelopeScreen = document.getElementById('envelopeScreen');
const cardScreen     = document.getElementById('cardScreen');
const messageScreen  = document.getElementById('messageScreen');
const photoScreen    = document.getElementById('photoScreen');
const finalScreen    = document.getElementById('finalScreen');

const photoImg       = document.getElementById('photoImg');
const photoCaption   = document.getElementById('photoCaption');
const nextLabel      = document.getElementById('nextLabel');

let currentIndex = 0;

// ====== ДИНАМИЧЕСКИЕ ЛЯГУШКИ-ПОПРЫГУШКИ ======
function spawnJumpingFrogs() {
  const container = document.querySelector('.frogs');
  if (!container) return;

  const emojis = ['🐸', '🐸', '🐸', '💚'];

  for (let i = 0; i < 8; i++) {
    const frog = document.createElement('div');
    frog.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    frog.style.cssText = `
      position: absolute;
      left: ${Math.random() * 95}vw;
      top: ${Math.random() * 90}vh;
      font-size: ${16 + Math.random() * 18}px;
      opacity: ${0.25 + Math.random() * 0.25};
      pointer-events: none;
      animation: jump ${3 + Math.random() * 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(frog);
  }
}

const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes jump {
    0%   { transform: translate(0, 0)        scale(1); }
    25%  { transform: translate(15px, -25px) scale(1.1); }
    50%  { transform: translate(30px, 0)     scale(0.95); }
    75%  { transform: translate(15px, -15px) scale(1.08); }
    100% { transform: translate(0, 0)        scale(1); }
  }
`;
document.head.appendChild(styleEl);

spawnJumpingFrogs();

// ====== ПОКАЗ ОДНОГО ФОТО ======
function showPhoto() {
  const item = photos[currentIndex];
  photoImg.src = item.src;
  photoImg.alt = item.caption;
  photoCaption.textContent = item.caption;

  const card = photoScreen.querySelector('.photo-card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'fadeSwap 0.4s ease';

  if (currentIndex === photos.length - 1) {
    nextLabel.textContent = 'Финал';
  } else {
    nextLabel.textContent = 'Ещё';
  }
}

// ====== КЛИК ПО "ЕЩЁ" ======
nextBtn.addEventListener('click', () => {
  if (currentIndex < photos.length - 1) {
    currentIndex++;
    showPhoto();
  } else {
    showFinal();
  }
});

// ====== ПЕРЕХОДЫ МЕЖДУ ЭКРАНАМИ ======
function showCard() {
  envelopeScreen.classList.add('hidden');
  setTimeout(() => {
    cardScreen.classList.add('show');
    burstHearts();
  }, 400);
}

function showMessage() {
  cardScreen.classList.remove('show');
  setTimeout(() => {
    messageScreen.classList.add('show');
  }, 250);
}

function showPhotos() {
  messageScreen.classList.remove('show');
  setTimeout(() => {
    photoScreen.classList.add('show');
    currentIndex = 0;
    showPhoto();
  }, 250);
}

function showFinal() {
  photoScreen.classList.remove('show');
  burstHearts();
  setTimeout(() => {
    finalScreen.classList.add('show');
    setTimeout(burstHearts, 600);
    setTimeout(burstHearts, 1400);
  }, 250);
}

// ====== СОБЫТИЯ ======
openBtn.addEventListener('click', showCard);
toMessageBtn.addEventListener('click', showMessage);
toPhotosBtn.addEventListener('click', showPhotos);

// Свайп влево на мобилке
let touchStartX = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', e => {
  if (!photoScreen.classList.contains('show')) return;
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (diff < -50) nextBtn.click();
});

// ====== СЕРДЕЧКИ ======
function burstHearts() {
  const emojis = ['❤️','💕','💖','✨','💝'];
  for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: 100vh;
      font-size: ${18 + Math.random() * 24}px;
      pointer-events: none;
      z-index: 999;
      transition: all ${2 + Math.random() * 2}s ease-out;
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.top = `${-10}vh`;
      el.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 4500);
  }
}