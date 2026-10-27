/* ==========================================================
   CAPITAL MYSTERY — Игровая логика
   ================================================---------- */

const DB = {
    capitals: [
        { country: "Япония", capital: "Токио", hint: "Страна восходящего солнца" },
        { country: "Франция", capital: "Париж", hint: "Родина Эйфелевой башни" },
        { country: "Италия", capital: "Рим", hint: "Полуостров в форме сапога" },
        { country: "Египет", capital: "Каир", hint: "Страна пирамид и фараонов" },
        { country: "Австралия", capital: "Канберра", hint: "Материк с кенгуру и коалами" },
        { country: "Канада", capital: "Оттава", hint: "Кленовый сироп и северная природа" },
        { country: "Германия", capital: "Берлин", hint: "Центральная Европа, Бранденбургские ворота" },
        { country: "Испания", capital: "Мадрид", hint: "Фламенко, коррида и солнце" },
        { country: "Бразилия", capital: "Бразилиа", hint: "Южная Америка, карнавал" },
        { country: "Индия", capital: "Нью-Дели", hint: "Тадж-Махал и пряности" }
    ],
    flags: [
        { name: "Япония", flag: "🇯🇵" },
        { name: "Франция", flag: "🇫🇷" },
        { name: "Бразилия", flag: "🇧🇷" },
        { name: "Германия", flag: "🇩🇪" },
        { name: "Канада", flag: "🇨🇦" },
        { name: "Италия", flag: "🇮🇹" },
        { name: "Австралия", flag: "🇦🇺" },
        { name: "Индия", flag: "🇮🇳" }
    ],
    logic: [
        { q: "Какая планета ближе всего к Солнцу?", options: ["Меркурий", "Венера", "Марс", "Земля"], answer: "Меркурий" },
        { q: "Сколько градусов в сумме составляют углы треугольника?", options: ["180", "360", "90", "270"], answer: "180" },
        { q: "Самый большой океан на Земле?", options: ["Тихий", "Атлантический", "Индийский", "Северный Ледовитый"], answer: "Тихий" },
        { q: "Какая страна имеет наибольшую площадь в мире?", options: ["Россия", "Канада", "Китай", "США"], answer: "Россия" }
    ]
};

const SoundManager = {
    ctx: null,
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playTone(freq, duration, type = 'sine') {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    },
    success() { this.playTone(587.33, 0.3); setTimeout(() => this.playTone(880, 0.4), 150); },
    error() { this.playTone(150, 0.4, 'sawtooth'); },
    click() { this.playTone(440, 0.08); }
};

const Game = {
    currentMode: 'capital',
    questions: [],
    currentIndex: 0,
    score: 0,
    lives: 3,
    combo: 0,
    maxCombo: 0,
    correctCount: 0,
    timer: null,
    timeLeft: 30,
    isPaused: false,

    startMode(mode) {
        SoundManager.click();
        this.currentMode = mode;
        this.currentIndex = 0;
        this.score = 0;
        this.lives = 3;
        this.combo = 0;
        this.maxCombo = 0;
        this.correctCount = 0;

        document.getElementById('current-mode-name').innerText = mode === 'capital' ? 'Столицы' : mode === 'flag' ? 'Флаги' : 'Логика';
        
        this.generateQuestions();
        UI.switchScreen('game-screen');
        this.loadQuestion();
    },

    generateQuestions() {
        let raw = [];
        if (this.currentMode === 'capital') {
            raw = [...DB.capitals].sort(() => Math.random() - 0.5);
        } else if (this.currentMode === 'flag') {
            raw = [...DB.flags].sort(() => Math.random() - 0.5);
        } else if (this.currentMode === 'logic') {
            raw = [...DB.logic].sort(() => Math.random() - 0.5);
        }
        this.questions = raw.slice(0, 5);
    },

    loadQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.endGame(true);
            return;
        }

        const q = this.questions[this.currentIndex];
        document.getElementById('question-counter').innerText = `Вопрос ${this.currentIndex + 1} / ${this.questions.length}`;
        document.getElementById('stat-lives').innerText = this.lives;
        document.getElementById('stat-score').innerText = this.score;
        document.getElementById('stat-combo').innerText = this.combo;

        const progressPercent = (this.currentIndex / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;

        const titleEl = document.getElementById('question-title');
        const visualEl = document.getElementById('visual-cue-container');
        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = '';

        if (this.currentMode === 'capital') {
            titleEl.innerText = `Какая столица у страны: ${q.country}?`;
            visualEl.innerHTML = `🏛️`;
            document.getElementById('question-prompt').innerText = q.hint;

            let options = [q.capital];
            while (options.length < 4) {
                let randomCap = DB.capitals[Math.floor(Math.random() * DB.capitals.length)].capital;
                if (!options.includes(randomCap)) options.push(randomCap);
            }
            options.sort(() => Math.random() - 0.5);

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => this.checkAnswer(opt === q.capital, btn);
                optionsGrid.appendChild(btn);
            });
        } 
        else if (this.currentMode === 'flag') {
            titleEl.innerText = `Чей это государственный флаг?`;
            visualEl.innerHTML = q.flag;
            document.getElementById('question-prompt').innerText = `Выберите правильную страну:`;

            let options = [q.name];
            while (options.length < 4) {
                let randomName = DB.flags[Math.floor(Math.random() * DB.flags.length)].name;
                if (!options.includes(randomName)) options.push(randomName);
            }
            options.sort(() => Math.random() - 0.5);

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => this.checkAnswer(opt === q.name, btn);
                optionsGrid.appendChild(btn);
            });
        }
        else if (this.currentMode === 'logic') {
            titleEl.innerText = q.q;
            visualEl.innerHTML = `🧠`;
            document.getElementById('question-prompt').innerText = `Выберите правильный вариант:`;

            let options = [...q.options].sort(() => Math.random() - 0.5);
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => this.checkAnswer(opt === q.answer, btn);
                optionsGrid.appendChild(btn);
            });
        }

        this.startTimer();
    },

    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 30;
        document.getElementById('stat-timer').innerText = this.timeLeft;

        this.timer = setInterval(() => {
            if (this.isPaused) return;
            this.timeLeft--;
            document.getElementById('stat-timer').innerText = this.timeLeft;
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleTimeout();
            }
        }, 1000);
    },

    checkAnswer(isCorrect, btnElement) {
        clearInterval(this.timer);
        SoundManager.click();

        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(b => b.onclick = null);

        if (isCorrect) {
            if (btnElement) btnElement.classList.add('correct');
            SoundManager.success();
            this.correctCount++;
            this.combo++;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;
            this.score += 100 + (this.combo * 20);
        } else {
            if (btnElement) btnElement.classList.add('wrong');
            SoundManager.error();
            this.combo = 0;
            this.lives--;
        }

        setTimeout(() => {
            if (this.lives <= 0) {
                this.endGame(false);
            } else {
                this.currentIndex++;
                this.loadQuestion();
            }
        }, 1000);
    },

    handleTimeout() {
        SoundManager.error();
        this.combo = 0;
        this.lives--;
        if (this.lives <= 0) {
            this.endGame(false);
        } else {
            this.currentIndex++;
            this.loadQuestion();
        }
    },

    useHint() {
        if (this.score >= 50) {
            this.score -= 50;
            document.getElementById('stat-score').innerText = this.score;
            alert("💡 Подсказка: Внимательно прочтите описание или первую букву ответа.");
        } else {
            alert("Недостаточно очков для подсказки (нужно 50 очков).");
        }
    },

    togglePause() {
        this.isPaused = !this.isPaused;
        const pauseScreen = document.getElementById('pause-screen');
        if (this.isPaused) {
            pauseScreen.classList.remove('hidden');
        } else {
            pauseScreen.classList.add('hidden');
        }
    },

    endGame(isVictory) {
        clearInterval(this.timer);
        document.getElementById('game-screen').classList.remove('active');

        document.getElementById('go-title').innerText = isVictory ? "РАУНД ПРОЙДЕН УСПЕШНО!" : "ИГРА ОКОНЧЕНА";
        document.getElementById('go-score').innerText = this.score;
        document.getElementById('go-correct').innerText = this.correctCount;
        document.getElementById('go-total').innerText = this.questions.length;
        document.getElementById('go-combo').innerText = this.maxCombo;

        const bestScore = localStorage.getItem('cm_best_score') || 0;
        if (this.score > bestScore) {
            localStorage.setItem('cm_best_score', this.score);
        }

        document.getElementById('gameover-screen').classList.remove('hidden');
    },

    restartMode() {
        SoundManager.click();
        document.getElementById('gameover-screen').classList.add('hidden');
        this.startMode(this.currentMode);
    },

    returnToMenu() {
        SoundManager.click();
        clearInterval(this.timer);
        document.getElementById('pause-screen').classList.add('hidden');
        document.getElementById('gameover-screen').classList.add('hidden');
        UI.switchScreen('main-menu');
    }
};

const UI = {
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    showModal(type) {
        SoundManager.click();
        const container = document.getElementById('modal-container');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        container.classList.remove('hidden');

        if (type === 'leaderboard') {
            title.innerText = "ТАБЛИЦА РЕКОРДОВ";
            const best = localStorage.getItem('cm_best_score') || 0;
            body.innerHTML = `
                <p style="font-size: 18px; margin-bottom: 10px;">🥇 Ваш лучший результат: <strong>${best} очков</strong></p>
                <p style="color: var(--text-muted);">Продолжайте играть, чтобы установить новые рекорды.</p>
            `;
        } else if (type === 'settings') {
            title.innerText = "НАСТРОЙКИ";
            body.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <label style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Звуковые эффекты</span>
                        <input type="checkbox" checked onchange="SoundManager.click()">
                    </label>
                </div>
            `;
        }
    },

    closeModal() {
        SoundManager.click();
        document.getElementById('modal-container').classList.add('hidden');
    }
};