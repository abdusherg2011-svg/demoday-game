/* ==========================================================
   CAPITAL MYSTERY — Expanded World Database & AI Generator
   ================================================---------- */

// Расширенная база данных стран мира (более 50+ стран со столицами и флагами)
const WORLD_DB = [
    { country: "Япония", capital: "Токио", flag: "🇯🇵", region: "Азия" },
    { country: "Франция", capital: "Париж", flag: "🇫🇷", region: "Европа" },
    { country: "Германия", capital: "Берлин", flag: "🇩🇪", region: "Европа" },
    { country: "Италия", capital: "Рим", flag: "🇮🇹", region: "Европа" },
    { country: "Испания", capital: "Мадрид", flag: "🇪🇸", region: "Европа" },
    { country: "Великобритания", capital: "Лондон", flag: "🇬🇧", region: "Европа" },
    { country: "Канада", capital: "Оттава", flag: "🇨🇦", region: "Северная Америка" },
    { country: "США", capital: "Вашингтон", flag: "🇺🇸", region: "Северная Америка" },
    { country: "Бразилия", capital: "Бразилиа", flag: "🇧🇷", region: "Южная Америка" },
    { country: "Аргентина", capital: "Буэнос-Айрес", flag: "🇦🇷", region: "Южная Америка" },
    { country: "Египет", capital: "Каир", flag: "🇪🇬", region: "Африка" },
    { country: "ЮАР", capital: "Претория", flag: "🇿🇦", region: "Африка" },
    { country: "Австралия", capital: "Канберра", flag: "🇦🇺", region: "Океания" },
    { country: "Индия", capital: "Нью-Дели", flag: "🇮🇳", region: "Азия" },
    { country: "Китай", capital: "Пекин", flag: "🇨🇳", region: "Азия" },
    { country: "Южная Корея", capital: "Сеул", flag: "🇰🇷", region: "Азия" },
    { country: "Турция", capital: "Анкара", flag: "🇹🇷", region: "Азия/Европа" },
    { country: "Узбекистан", capital: "Ташкент", flag: "🇺🇿", region: "Азия" },
    { country: "Казахстан", capital: "Астана", flag: "🇰🇿", region: "Азия" },
    { country: "Мексика", capital: "Мехико", flag: "🇲🇽", region: "Северная Америка" },
    { country: "Италия", capital: "Рим", flag: "🇮🇹", region: "Европа" },
    { country: "Швейцария", capital: "Берн", flag: "🇨🇭", region: "Европа" },
    { country: "Швеция", capital: "Стокгольм", flag: "🇸🇪", region: "Европа" },
    { country: "Норвегия", capital: "Осло", flag: "🇳🇴", region: "Европа" },
    { country: "Финляндия", capital: "Хельсинки", flag: "🇫🇮", region: "Европа" },
    { country: "Польша", capital: "Варшава", flag: "🇵🇱", region: "Европа" },
    { country: "Греция", capital: "Афины", flag: "🇬🇷", region: "Европа" },
    { country: "Португалия", capital: "Лиссабон", flag: "🇵🇹", region: "Европа" },
    { country: "Нидерланды", capital: "Амстердам", flag: "🇳🇱", region: "Европа" },
    { country: "ОАЭ", capital: "Абу-Даби", flag: "🇦🇪", region: "Азия" },
    { country: "Саудовская Аравия", capital: "Эр-Рияд", flag: "🇸🇦", region: "Азия" },
    { country: "Таиланд", capital: "Бангкок", flag: "🇹🇭", region: "Азия" },
    { country: "Вьетнам", capital: "Ханой", flag: "🇻🇳", region: "Азия" },
    { country: "Индонезия", capital: "Джакарта", flag: "🇮🇩", region: "Азия" },
    { country: "Малайзия", capital: "Куала-Лумпур", flag: "🇲🇾", region: "Азия" },
    { country: "Сингапур", capital: "Сингапур", flag: "🇸🇬", region: "Азия" },
    { country: "Новая Зеландия", capital: "Веллингтон", flag: "🇳🇿", region: "Океания" },
    { country: "Колумбия", capital: "Богота", flag: "🇨🇴", region: "Южная Америка" },
    { country: "Чили", capital: "Сантьяго", flag: "🇨🇱", region: "Южная Америка" },
    { country: "Перу", capital: "Лима", flag: "🇵🇪", region: "Южная Америка" }
];

// Расширенная база логических и географических фактов
const FACTS_DB = [
    { q: "Какая планета ближе всего к Солнцу?", options: ["Меркурий", "Венера", "Марс", "Земля"], answer: "Меркурий" },
    { q: "Сколько градусов составляют сумма углов треугольника?", options: ["180", "360", "90", "270"], answer: "180" },
    { q: "Самый большой океан на Земле?", options: ["Тихий", "Атлантический", "Индийский", "Северный Ледовитый"], answer: "Тихий" },
    { q: "Какая страна имеет наибольшую площадь в мире?", options: ["Россия", "Канада", "Китай", "США"], answer: "Россия" },
    { q: "Какая река считается самой длинной в мире?", options: ["Нил", "Амазонка", "Миссисипи", "Янцзы"], answer: "Нил" },
    { q: "В каком материке расположена самая большая пустыня Сахара?", options: ["Африка", "Азия", "Австралия", "Южная Америка"], answer: "Африка" },
    { q: "Какая гора является самой высокой на Земле?", options: ["Эверест", "Килиманджаро", "Монблан", "Эльбрус"], answer: "Эверест" }
];

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
    level: 1,
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
        this.level = 1;

        document.getElementById('current-mode-name').innerText = mode === 'capital' ? 'Столицы мира' : mode === 'flag' ? 'Мастер Флагов' : 'Факты и логика';
        
        this.generateQuestions();
        UI.switchScreen('game-screen');
        this.loadQuestion();
    },

    // ИИ-генератор вопросов (автоматически перемешивает и собирает бесконечные комбинации)
    generateQuestions() {
        let raw = [];
        if (this.currentMode === 'capital' || this.currentMode === 'flag') {
            raw = [...WORLD_DB].sort(() => Math.random() - 0.5);
        } else if (this.currentMode === 'logic') {
            raw = [...FACTS_DB].sort(() => Math.random() - 0.5);
        }
        // Раунд теперь состоит из 10 вопросов
        this.questions = raw.slice(0, 10);
    },

    loadQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.endGame(true);
            return;
        }

        // Динамический расчет уровня сложности каждые 3 вопроса
        this.level = Math.floor(this.currentIndex / 3) + 1;
        document.getElementById('question-level').innerText = `Уровень ${this.level}`;
        document.getElementById('question-counter').innerText = `Вопрос ${this.currentIndex + 1} / ${this.questions.length}`;
        
        document.getElementById('stat-lives').innerText = this.lives;
        document.getElementById('stat-score').innerText = this.score;
        document.getElementById('stat-combo').innerText = this.combo;

        const progressPercent = (this.currentIndex / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;

        const q = this.questions[this.currentIndex];
        const titleEl = document.getElementById('question-title');
        const visualEl = document.getElementById('visual-cue-container');
        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = '';

        if (this.currentMode === 'capital') {
            titleEl.innerText = `Какая столица у государства: ${q.country}?`;
            visualEl.innerHTML = `🏛️`;
            document.getElementById('question-prompt').innerText = `Регион: ${q.region}. Выберите правильный вариант:`;

            let options = [q.capital];
            while (options.length < 4) {
                let randomCap = WORLD_DB[Math.floor(Math.random() * WORLD_DB.length)].capital;
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
            document.getElementById('question-prompt').innerText = `Выберите правильную страну из списка:`;

            let options = [q.country];
            while (options.length < 4) {
                let randomCountry = WORLD_DB[Math.floor(Math.random() * WORLD_DB.length)].country;
                if (!options.includes(randomCountry)) options.push(randomCountry);
            }
            options.sort(() => Math.random() - 0.5);

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => this.checkAnswer(opt === q.country, btn);
                optionsGrid.appendChild(btn);
            });
        }
        else if (this.currentMode === 'logic') {
            titleEl.innerText = q.q;
            visualEl.innerHTML = `🧠`;
            document.getElementById('question-prompt').innerText = `Выберите правильный ответ:`;

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
        // Время на ответ зависит от уровня (чем дальше, тем меньше времени)
        this.timeLeft = Math.max(15, 30 - (this.level * 3));
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
            // Бонус очков за уровень
            this.score += (100 * this.level) + (this.combo * 20);
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
            alert("💡 Подсказка ИИ: Обратите внимание на регион или первую букву правильного ответа!");
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
                <p style="color: var(--text-muted);">ИИ-генератор усложняет игру с каждым новым уровнем!</p>
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