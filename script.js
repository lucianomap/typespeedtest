document.addEventListener('DOMContentLoaded', () => {
    const textToTypeElement = document.getElementById('text-to-type');
    const textInputElement = document.getElementById('text-input');
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const timeElement = document.getElementById('time');
    const virtualKeyboardElement = document.getElementById('virtual-keyboard');
    const performanceChartElement = document.getElementById('performance-chart');
    const easyButton = document.getElementById('difficulty-easy');
    const mediumButton = document.getElementById('difficulty-medium');
    const hardButton = document.getElementById('difficulty-hard');
    const customTextElement = document.getElementById('custom-text');
    const startCustomTestButton = document.getElementById('start-custom-test');
    const leaderboardBody = document.getElementById('leaderboard-body');
    const languageSelect = document.getElementById('language-select');

    const texts = {
        en: {
            easy: "The quick brown fox jumps over the lazy dog.",
            medium: "The five boxing wizards jump quickly. Pack my box with five dozen liquor jugs.",
            hard: "Amazingly few discotheques provide jukeboxes. We promptly judged antique ivory buckles for the next prize. A quivering Texas zombie jabbed my infected foot with a junketing beef fork."
        },
        es: {
            easy: "El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.",
            medium: "El pingüino Wenceslao hizo kilómetros bajo exhaustiva lluvia y frío. La extraña dicha del jazmín y el azahar.",
            hard: "Quiere la boca exhausta besar tu frente oíd, niño, la suave flauta del fauno. Jovencillo emponzoñado de whisky: ¡qué figurote exhibe!"
        },
        de: {
            easy: "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich.",
            medium: "Typisch für New York sind schicke Cafés, coole Bars und hippe Clubs. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg.",
            hard: "Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark."
        },
        pt: {
            easy: "A rápida raposa marrom salta sobre o cão preguiçoso. Um pequeno jabuti xereta viu o elefante comendo kiwi e jaca.",
            medium: "Gazeta de bem, jamais vi um fauno. Luís argüia à Júlia que \"feliz\" é a palavra-chave. Blitz, rápido, veloz, ágil, fugaz, ligeiro, instantâneo.",
            hard: "À noite, a bela fada jazia no sofá, sem voz, enquanto o duende zombava do pinguim. O peixe-boi, o golfinho e o tubarão-martelo são animais aquáticos."
        }
    };

    let timer;
    let startTime;
    let errors = 0;
    let correctChars = 0;
    let totalChars = 0;
    let history = JSON.parse(localStorage.getItem('typingHistory')) || [];
    let currentLanguage = languageSelect.value;
    let currentDifficulty = 'easy';

    const keyboardLayout = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Space']
    ];

    function createVirtualKeyboard() {
        virtualKeyboardElement.innerHTML = '';
        keyboardLayout.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('key-row');
            row.forEach(key => {
                const keyElement = document.createElement('div');
                keyElement.classList.add('key');
                keyElement.textContent = key;
                keyElement.dataset.key = key.toLowerCase();
                if (key === 'Space') {
                    keyElement.classList.add('space-key');
                }
                rowElement.appendChild(keyElement);
            });
            virtualKeyboardElement.appendChild(rowElement);
        });
    }

    function updateVirtualKeyboard(key) {
        const keyElement = virtualKeyboardElement.querySelector(`[data-key='${key.toLowerCase()}']`);
        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => {
                keyElement.classList.remove('active');
            }, 200);
        }
    }

    function startTest(text) {
        console.log("Starting test with text:", text);
        textToTypeElement.innerHTML = '';
        text.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            textToTypeElement.appendChild(charSpan);
        });
        textInputElement.value = '';
        textInputElement.focus();
        resetMetrics();
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }

    function resetMetrics() {
        clearInterval(timer);
        wpmElement.textContent = 0;
        accuracyElement.textContent = 100;
        timeElement.textContent = 0;
        errors = 0;
        correctChars = 0;
        totalChars = 0;
    }

    function updateTimer() {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timeElement.textContent = elapsedTime;
        updateMetrics();
    }

    function updateMetrics() {
        const elapsedTime = (new Date() - startTime) / 1000 / 60; // in minutes
        const wordsTyped = (correctChars / 5);
        const wpm = elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;
        wpmElement.textContent = wpm;

        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
        accuracyElement.textContent = accuracy;
    }

    function highlightErrors() {
        const typedText = textInputElement.value;
        const textToType = textToTypeElement.textContent;
        const textSpans = textToTypeElement.querySelectorAll('span');

        errors = 0;
        correctChars = 0;
        totalChars = typedText.length;

        textSpans.forEach((charSpan, index) => {
            if (index < typedText.length) {
                if (typedText[index] === charSpan.textContent) {
                    charSpan.classList.add('correct');
                    charSpan.classList.remove('incorrect');
                    correctChars++;
                } else {
                    charSpan.classList.add('incorrect');
                    charSpan.classList.remove('correct');
                    errors++;
                }
            } else {
                charSpan.classList.remove('correct', 'incorrect');
            }
        });

        if (typedText.length === textToType.length) {
            endTest();
        }
    }

    function endTest() {
        clearInterval(timer);
        const elapsedTime = (new Date() - startTime) / 1000;
        const wpm = wpmElement.textContent;
        const accuracy = accuracyElement.textContent;
        history.push({ wpm, accuracy, date: new Date() });
        localStorage.setItem('typingHistory', JSON.stringify(history));
        updateChart();

        const name = prompt("Enter your name for the leaderboard:");
        if (name) {
            submitScore(name, wpm, accuracy);
        }
    }

    async function submitScore(name, wpm, accuracy) {
        await fetch('/api/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, wpm, accuracy })
        });
        fetchLeaderboard();
    }

    async function fetchLeaderboard() {
        const response = await fetch('/api/leaderboard');
        const leaderboard = await response.json();
        leaderboardBody.innerHTML = '';
        leaderboard.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.name}</td>
                <td>${score.wpm}</td>
                <td>${score.accuracy}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    function updateChart() {
        const chartData = {
            labels: history.map(item => new Date(item.date).toLocaleDateString()),
            datasets: [
                {
                    label: 'WPM',
                    data: history.map(item => item.wpm),
                    borderColor: '#007bff',
                    fill: false
                },
                {
                    label: 'Accuracy',
                    data: history.map(item => item.accuracy),
                    borderColor: '#28a745',
                    fill: false
                }
            ]
        };

        new Chart(performanceChartElement, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    easyButton.addEventListener('click', () => {
        currentDifficulty = 'easy';
        console.log("Difficulty button clicked. Language:", currentLanguage, "Difficulty:", currentDifficulty);
        startTest(texts[currentLanguage].easy);
    });
    mediumButton.addEventListener('click', () => {
        currentDifficulty = 'medium';
        console.log("Difficulty button clicked. Language:", currentLanguage, "Difficulty:", currentDifficulty);
        startTest(texts[currentLanguage].medium);
    });
    hardButton.addEventListener('click', () => {
        currentDifficulty = 'hard';
        console.log("Difficulty button clicked. Language:", currentLanguage, "Difficulty:", currentDifficulty);
        startTest(texts[currentLanguage].hard);
    });
    startCustomTestButton.addEventListener('click', () => {
        const customText = customTextElement.value;
        if (customText) {
            console.log("Custom test started with text:", customText);
            startTest(customText);
        }
    });

    textInputElement.addEventListener('input', () => {
        highlightErrors();
        updateMetrics();
    });

    document.addEventListener('keydown', (e) => {
        updateVirtualKeyboard(e.key);
    });

    createVirtualKeyboard();
    updateChart();
    fetchLeaderboard();

    languageSelect.addEventListener('change', () => {
        currentLanguage = languageSelect.value;
        console.log("Language changed. Language:", currentLanguage, "Difficulty:", currentDifficulty);
        startTest(texts[currentLanguage][currentDifficulty]);
    });

    // Initial test start with default language and difficulty
    console.log("Initial test start. Language:", currentLanguage, "Difficulty:", currentDifficulty);
    startTest(texts[currentLanguage][currentDifficulty]);
});