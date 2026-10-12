document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Register GSAP plugins
  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1
      })
      .from('.hero-headline span', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      }, '-=0.5')
      .from('.hero-subhead', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from('.hero-stats', {
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
      .from('.hero-visual-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
      }, '-=0.8');

    // 2. Parallax and Floating Elements
    gsap.to('.float-element-slow', {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.float-element-fast', {
      y: 14,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 3. Scroll Triggered Reveals
    const cardGrids = document.querySelectorAll('.cards-stagger-container');
    cardGrids.forEach((grid) => {
      const cards = grid.querySelectorAll('.stagger-card');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });
    });

    ScrollTrigger.refresh();
  }

  // 4. Interactive Letter Simulator
  const tagButtons = document.querySelectorAll('.letter-tag-btn');
  const letterTagDisplay = document.getElementById('letterTagDisplay');
  const letterTextarea = document.getElementById('letterInput');
  const letterPreviewText = document.getElementById('letterPreviewText');
  const foldButton = document.getElementById('foldLetterBtn');
  const letterPaper = document.getElementById('letterPaper');
  const waxSeal = document.getElementById('waxSeal');
  const resetLetterBtn = document.getElementById('resetLetterBtn');
  const foldedStatusText = document.getElementById('foldedStatusText');

  const sampleLetters = {
    'night': 'The city is quiet tonight. What is something you keep thinking about when the rest of the world is asleep?',
    'poetry': 'A cup of chai, rainy windows, and an unread chapter. Do we miss people, or just who we were around them?',
    'thoughts': 'Most conversations scratch the surface. If you could tell a stranger one honest thing without judgment, what would it be?',
    'music': 'Listening to old acoustic melodies on repeat. Tell me that one song that instantly transports you back in time.'
  };

  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => {
        b.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
        b.classList.add('bg-white', 'text-neutral-700', 'border-neutral-300');
      });
      btn.classList.add('bg-neutral-900', 'text-white', 'border-neutral-900');
      btn.classList.remove('bg-white', 'text-neutral-700', 'border-neutral-300');

      const tagKey = btn.dataset.tagKey || 'night';
      const tagLabel = btn.innerText.trim();
      if (letterTagDisplay) {
        letterTagDisplay.innerText = tagLabel;
      }

      if (sampleLetters[tagKey]) {
        if (letterTextarea) letterTextarea.value = sampleLetters[tagKey];
        if (letterPreviewText) letterPreviewText.innerText = sampleLetters[tagKey];
      }
    });
  });

  if (letterTextarea && letterPreviewText) {
    letterTextarea.addEventListener('input', (e) => {
      letterPreviewText.innerText = e.target.value.trim() || 'Your thoughts will appear here...';
    });
  }

  if (letterTextarea && letterPreviewText) {
    letterTextarea.addEventListener('input', (e) => {
      letterPreviewText.innerText = e.target.value.trim() || 'Your thoughts will appear here...';
    });
  }

  // 5. Interactive Phone Mockup Tab Switcher
  const mockupTabs = document.querySelectorAll('.mockup-tab-btn');
  const mockupImage = document.getElementById('phoneMockupScreen');
  const mockupTitle = document.getElementById('mockupFeatureTitle');
  const mockupDesc = document.getElementById('mockupFeatureDesc');

  const mockupData = [
    {
      img: 'assets/screen_letter.jpg',
      title: 'Handcrafted Letter Feed',
      desc: 'Browse thoughtful letters written by anonymous souls looking for authentic connection, not hasty swipes.'
    },
    {
      img: 'assets/screen_call.png',
      title: 'Voice Blends & Call Screen',
      desc: 'When two letters resonate, unlock real-time voice calls with crystal-clear audio and zero intrusive cameras.'
    },
    {
      img: 'assets/screen_blender.png',
      title: 'The Blender Experience',
      desc: 'Connect minds, send folded letters, and build meaningful relationships with respectful souls.'
    }
  ];

  mockupTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      mockupTabs.forEach(t => {
        t.classList.remove('border-neutral-900', 'bg-neutral-900', 'text-white');
        t.classList.add('border-neutral-300', 'bg-white', 'text-neutral-700');
      });
      tab.classList.add('border-neutral-900', 'bg-neutral-900', 'text-white');
      tab.classList.remove('border-neutral-300', 'bg-white', 'text-neutral-700');

      if (mockupImage && window.gsap) {
        gsap.to(mockupImage, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            mockupImage.src = mockupData[index].img;
            if (mockupTitle) mockupTitle.innerText = mockupData[index].title;
            if (mockupDesc) mockupDesc.innerText = mockupData[index].desc;
            gsap.to(mockupImage, { opacity: 1, duration: 0.35 });
          }
        });
      }
    });
  });

  // 6. Accordion for FAQ
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // close all
      accordionItems.forEach(i => i.classList.remove('active'));
      // toggle clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 8. Blog Article Modal / View More
  const readArticleBtns = document.querySelectorAll('.read-article-btn');
  const blogModal = document.getElementById('blogModal');
  const closeModalBtn = document.getElementById('closeBlogModal');
  const modalTitle = document.getElementById('modalArticleTitle');
  const modalContent = document.getElementById('modalArticleContent');

  const articleDetails = {
    '1': {
      title: 'Why Slow Connections Beat 100 Fast Swipes in 2026',
      content: `In an era defined by lightning-fast algorithms and superficial micro-decisions, modern dating apps created a fatigue crisis. Users report spending 90 minutes a day swiping, only to end up with ghosted chats and zero emotional resonance.<br><br>
      <strong>The Blender Antidote:</strong> By removing profile pictures on first touch and substituting them with written letters, users engage with the mind first. Psychology shows that reading someone's raw thoughts activates empathetic mirroring, sparking authentic curiosity rather than optical dopamine spikes.<br><br>
      When you reply to a letter, you are entering a conversation with someone who willingly took 5 minutes of their day to be vulnerable. That difference transforms everything.`
    },
    '2': {
      title: 'The Lost Art of Vulnerability in a Hyper-Curated World',
      content: `Social feeds reward filtered perfection. We present our best lighting, our highlight reels, and witty one-liners rehearsed for applause.<br><br>
      Letters, historically, were the sanctuary where lovers, philosophers, and travelers poured their unresolved truths. In Blender, our anonymous letter mechanic frees users from aesthetic anxiety.<br><br>
      Nobody knows what you look like when they read your midnight ponderings about loneliness, old songs, or career dilemmas. You are valued purely for the depth of your soul.`
    },
    '3': {
      title: 'How a 5.0 Star Rating System Eradicated Toxic Behavior',
      content: `Every online space struggles with moderation. Traditional apps rely on delayed reporting forms after harassment has already happened.<br><br>
      <strong>The Mutual Honor Rule:</strong> Blender introduces an immediate post-call rating. Users start at 5.00 stars. If a user acts disrespectfully, their rating drops. Fall below 2.00 stars, and our automatic Jail Protocol enforces a cooling-off period and temporary suspension.<br><br>
      The result? Over 98.4% of all Blender conversations are described by users as polite, warm, and deeply comforting.`
    }
  };

  readArticleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = btn.dataset.articleId || '1';
      const data = articleDetails[articleId];
      if (data && blogModal && modalTitle && modalContent) {
        modalTitle.innerText = data.title;
        modalContent.innerHTML = data.content;
        blogModal.classList.remove('hidden');
        blogModal.classList.add('flex');
      }
    });
  });

  if (closeModalBtn && blogModal) {
    closeModalBtn.addEventListener('click', () => {
      blogModal.classList.add('hidden');
      blogModal.classList.remove('flex');
    });
  }

  if (blogModal) {
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
        blogModal.classList.add('hidden');
        blogModal.classList.remove('flex');
      }
    });
  }

  // 9. Retro Snake Arcade Engine
  const canvas = document.getElementById('snakeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const startOverlay = document.getElementById('snakeStartOverlay');
    const gameOverOverlay = document.getElementById('snakeGameOverOverlay');
    const startBtn = document.getElementById('snakeStartBtn');
    const restartBtn = document.getElementById('snakeRestartBtn');
    const scoreDisplay = document.getElementById('snakeScore');
    const highScoreDisplay = document.getElementById('snakeHighScore');
    const speedDisplay = document.getElementById('snakeSpeedDisplay');
    const finalScoreText = document.getElementById('finalScoreText');

    const gridSize = 20; // 20px per square
    const tileCount = 17; // 17 * 20 = 340px canvas
    let snake = [];
    let food = { x: 5, y: 5 };
    let dx = 1;
    let dy = 0;
    let nextDx = 1;
    let nextDy = 0;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('blender_snake_high') || '0', 10);
    let gameLoop = null;
    let isGameRunning = false;
    let currentSpeed = 200; // comfortable calm starting speed

    if (highScoreDisplay) highScoreDisplay.innerText = highScore.toString();

    function getSpeed() {
      // Starts at 200ms. Each eaten fruit speeds up by 6ms down to a fast cap of 70ms
      return Math.max(70, 200 - (snake.length - 3) * 6);
    }

    function updateSpeedDisplay() {
      if (speedDisplay) {
        const mult = (200 / currentSpeed).toFixed(1);
        speedDisplay.innerText = mult + 'x';
      }
    }

    function resetGame() {
      snake = [
        { x: 8, y: 8 },
        { x: 7, y: 8 },
        { x: 6, y: 8 },
      ];
      dx = 1;
      dy = 0;
      nextDx = 1;
      nextDy = 0;
      score = 0;
      currentSpeed = 200;
      if (scoreDisplay) scoreDisplay.innerText = '0';
      updateSpeedDisplay();
      spawnFood();
    }

    function spawnFood() {
      let valid = false;
      while (!valid) {
        food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
        valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
      }
    }

    function startGame() {
      resetGame();
      if (startOverlay) startOverlay.classList.add('hidden');
      if (gameOverOverlay) gameOverOverlay.classList.add('hidden');
      isGameRunning = true;
      currentSpeed = getSpeed();
      updateSpeedDisplay();
      clearInterval(gameLoop);
      gameLoop = setInterval(stepGame, currentSpeed);
    }

    function endGame() {
      isGameRunning = false;
      clearInterval(gameLoop);
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('blender_snake_high', highScore.toString());
        if (highScoreDisplay) highScoreDisplay.innerText = highScore.toString();
      }
      if (finalScoreText) finalScoreText.innerText = score.toString();
      if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
    }

    function stepGame() {
      dx = nextDx;
      dy = nextDy;

      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Wall collision check
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
      }

      // Self collision check
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          endGame();
          return;
        }
      }

      snake.unshift(head);

      // Eat food check
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        if (scoreDisplay) scoreDisplay.innerText = score.toString();
        spawnFood();

        // Progressive speed acceleration as snake grows
        const newSpeed = getSpeed();
        if (newSpeed !== currentSpeed) {
          currentSpeed = newSpeed;
          updateSpeedDisplay();
          clearInterval(gameLoop);
          gameLoop = setInterval(stepGame, currentSpeed);
        }
      } else {
        snake.pop();
      }

      drawGame();
    }

    function drawGame() {
      // Clear canvas
      ctx.fillStyle = '#141416';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid lines
      ctx.strokeStyle = '#1F1F24';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw Food (Juicy Strawberry/Heart Fruit)
      const fx = food.x * gridSize + gridSize / 2;
      const fy = food.y * gridSize + gridSize / 2;
      ctx.fillStyle = '#FF1E6D';
      ctx.beginPath();
      ctx.arc(fx, fy, gridSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Fruit green stem/leaf
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(fx, fy - 6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw Snake
      snake.forEach((segment, index) => {
        const sx = segment.x * gridSize;
        const sy = segment.y * gridSize;
        const r = 6;

        if (index === 0) {
          // Snake Head (Bright Cream/Gold with Eyes)
          ctx.fillStyle = '#F8F5EE';
          ctx.beginPath();
          ctx.roundRect(sx + 1, sy + 1, gridSize - 2, gridSize - 2, 7);
          ctx.fill();

          // Cute Eyes
          ctx.fillStyle = '#0D0D0D';
          const eyeOffset = 4;
          if (dx === 1) { // right
            ctx.fillRect(sx + 12, sy + 4, 3, 3);
            ctx.fillRect(sx + 12, sy + 12, 3, 3);
          } else if (dx === -1) { // left
            ctx.fillRect(sx + 4, sy + 4, 3, 3);
            ctx.fillRect(sx + 4, sy + 12, 3, 3);
          } else if (dy === -1) { // up
            ctx.fillRect(sx + 4, sy + 4, 3, 3);
            ctx.fillRect(sx + 12, sy + 4, 3, 3);
          } else { // down
            ctx.fillRect(sx + 4, sy + 12, 3, 3);
            ctx.fillRect(sx + 12, sy + 12, 3, 3);
          }
        } else {
          // Snake Body (Soft Rose/Cream gradient)
          ctx.fillStyle = index % 2 === 0 ? '#E8E1D3' : '#D5CBB5';
          ctx.beginPath();
          ctx.roundRect(sx + 1.5, sy + 1.5, gridSize - 3, gridSize - 3, 5);
          ctx.fill();
        }
      });
    }

    if (startBtn) startBtn.addEventListener('click', startGame);
    if (restartBtn) restartBtn.addEventListener('click', startGame);

    // Direction handler
    function setDirection(newDx, newDy) {
      if (!isGameRunning) return;
      // Prevent reversing
      if (newDx !== 0 && dx === -newDx) return;
      if (newDy !== 0 && dy === -newDy) return;
      nextDx = newDx;
      nextDy = newDy;
    }

    // Keyboard Arrow Controls
    window.addEventListener('keydown', (e) => {
      if (!snakeContainer || snakeContainer.classList.contains('hidden')) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        e.preventDefault(); // Prevent page scroll
      }

      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          setDirection(0, -1);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setDirection(0, 1);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setDirection(-1, 0);
          break;
        case 'ArrowRight':
        case 'KeyD':
          setDirection(1, 0);
          break;
      }
    });

    // Touch / Button D-pad Controls
    const upBtn = document.getElementById('ctrlUp');
    const downBtn = document.getElementById('ctrlDown');
    const leftBtn = document.getElementById('ctrlLeft');
    const rightBtn = document.getElementById('ctrlRight');

    if (upBtn) upBtn.addEventListener('click', () => setDirection(0, -1));
    if (downBtn) downBtn.addEventListener('click', () => setDirection(0, 1));
    if (leftBtn) leftBtn.addEventListener('click', () => setDirection(-1, 0));
    if (rightBtn) rightBtn.addEventListener('click', () => setDirection(1, 0));

    // Initial draw
    resetGame();
    drawGame();
  }
});
