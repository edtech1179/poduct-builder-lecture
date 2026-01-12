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

// Button Event Listener
const generateBtn = document.getElementById('generate-btn');
if (generateBtn) {
  generateBtn.addEventListener('click', displayLottoNumbers);
}


// Translation Data
const translations = {
  ko: {
    appTitle: "로또 6/45 번호 생성기",
    generateBtn: "번호 생성하기",
    aboutTitle: "로또 번호 생성기란?",
    aboutContent: "본 서비스는 1부터 45까지의 숫자 중 6개를 무작위로 추첨하여 로또 예상 번호를 제공하는 무료 도구입니다. 매주 행운을 시험해보고 싶은 분들을 위해 복잡한 절차 없이 클릭 한 번으로 번호를 생성할 수 있도록 제작되었습니다.",
    howToTitle: "사용 방법",
    howToContent: "1. 상단의 '번호 생성하기' 버튼을 클릭하세요.<br>2. 화면에 나타나는 6개의 색상별 공을 확인하세요.<br>3. 마음에 들지 않으면 다시 버튼을 눌러 새로운 번호를 받을 수 있습니다.",
    infoTitle: "로또 6/45 확률 정보",
    infoContent: "로또 6/45의 1등 당첨 확률은 약 814만 분의 1입니다. 이 생성기는 순수하게 수학적 무작위성(Randomness)을 기반으로 동작하며, 당첨을 보장하지 않습니다. 로또는 소액으로 건전하게 즐기는 것이 좋습니다.",
    contactTitle: "제휴 문의",
    labelName: "성함",
    labelEmail: "이메일 주소",
    labelCompany: "회사/조직명",
    labelMessage: "문의 내용",
    sendBtn: "문의 보내기",
    privacyPolicy: "개인정보처리방침",
    termsOfService: "이용약관"
  },
  en: {
    appTitle: "Lotto 6/45 Generator",
    generateBtn: "Generate Numbers",
    aboutTitle: "About Lotto Generator",
    aboutContent: "This service is a free tool that randomly selects 6 numbers from 1 to 45 to provide expected lotto numbers. It is designed for those who want to test their luck every week, allowing you to generate numbers with a single click without complicated procedures.",
    howToTitle: "How to Use",
    howToContent: "1. Click the 'Generate Numbers' button above.<br>2. Check the 6 colored balls displayed on the screen.<br>3. If you don't like them, click the button again to get new numbers.",
    infoTitle: "Probability Info",
    infoContent: "The probability of winning first place in Lotto 6/45 is about 1 in 8.14 million. This generator operates purely based on mathematical randomness and does not guarantee winning. It is recommended to enjoy lotto responsibly with small amounts.",
    contactTitle: "Contact Us",
    labelName: "Name",
    labelEmail: "Email Address",
    labelCompany: "Company/Organization",
    labelMessage: "Message",
    sendBtn: "Send Message",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service"
  }
};

// Language Switcher Logic
const languageSelector = document.getElementById('language-selector');

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
  
  // Update placeholders
  if (lang === 'en') {
    document.getElementById('name').placeholder = "Your Name";
    document.getElementById('email').placeholder = "example@email.com";
    document.getElementById('company').placeholder = "Company Name";
    document.getElementById('message').placeholder = "Enter your message here...";
  } else {
    document.getElementById('name').placeholder = "성함을 입력해주세요";
    document.getElementById('email').placeholder = "example@email.com";
    document.getElementById('company').placeholder = "회사 또는 조직명을 입력해주세요";
    document.getElementById('message').placeholder = "제휴 문의 내용을 입력해주세요";
  }

  localStorage.setItem('language', lang);
  languageSelector.value = lang;
}

languageSelector.addEventListener('change', (e) => {
  updateLanguage(e.target.value);
});

// Initialize Language
const savedLanguage = localStorage.getItem('language') || 'ko';
updateLanguage(savedLanguage);


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
