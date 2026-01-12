class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    const color = this.getColorForNumber(parseInt(number, 10));

    this.shadowRoot.innerHTML = `
      <style>
        .ball {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          font-weight: bold;
          color: white;
          text-shadow: 0 0 5px rgba(0,0,0,0.5);
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.5);
          animation: drop-in 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
        @keyframes drop-in {
          from {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      </style>
      <div class="ball" style="background: ${color};">
        <span>${number}</span>
      </div>
    `;
  }

  getColorForNumber(number) {
    if (number <= 10) return 'linear-gradient(135deg, #ffeb3b, #fbc02d)'; // Yellow
    if (number <= 20) return 'linear-gradient(135deg, #42a5f5, #1e88e5)'; // Blue
    if (number <= 30) return 'linear-gradient(135deg, #ef5350, #e53935)'; // Red
    if (number <= 40) return 'linear-gradient(135deg, #66bb6a, #43a047)'; // Green
    return 'linear-gradient(135deg, #ab47bc, #8e24aa)'; // Purple
  }
}
customElements.define('lotto-ball', LottoBall);

const lottoNumbersContainer = document.getElementById('lotto-numbers');

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayLottoNumbers() {
  lottoNumbersContainer.innerHTML = '';
  const lottoNumbers = generateLottoNumbers();
  lottoNumbers.forEach((number, index) => {
    setTimeout(() => {
        const lottoBallElement = document.createElement('lotto-ball');
        lottoBallElement.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBallElement);
    }, index * 100);
  });
}

// Initial generation on page load
displayLottoNumbers();

// A-uto-generate new numbers every 3 seconds
setInterval(displayLottoNumbers, 3000);


// Theme Switcher Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.setAttribute('data-theme', currentTheme);
  updateButtonText(currentTheme);
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonText(newTheme);
});

function updateButtonText(theme) {
  themeToggleBtn.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}
