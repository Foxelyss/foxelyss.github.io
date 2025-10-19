const questions_with_answers = [
  [
    "Что такое неопределенный интеграл?",
    `Совокупность первообразных для функции f(x) или для 
    дифференциала f(x)dx называется неопределенным интегралом`,
  ],
  [
    `Найдите неопределенный интеграл
    <img src="/assets/img/decade/integral.png"></img>`,
    `<img src="/assets/img/decade/answers/integral.png"></img>`,
  ],
  [
    "Как можно избавиться от неопределенности в пределе?",
    `Преобразованием, разложекнием на множители, упрощением, 
    домножением на сопряженное, при помощи правила Лопиталя`,
  ],
  [`Найдите предел <img src="/assets/img/decade/limits.png"></img>`, `-1/6`],
  [`Найдите предел <img src="/assets/img/decade/limitsb.png"></img>`, `1`],
  [
    "Асимптота кривой — это",
    `Асимптотой кривой называется прямая, к которой неограниченно 
    приближается точка кривой при неограниченном удалении ее от 
    начала координат. Различают вертикальные, горизонтальные и 
    наклонные асимптоты.`,
  ],
  [
    `Найдите асимптоту
    <img src="/assets/img/decade/asymptote.png"></img>`,
    `y=0 x=-5 x=5`,
  ],
  [
    "Комплексное число — это ...",
    `Комплексное число — это выражение вида a + bi, где a, 
    b — действительные числа, а i — так называемая мнимая единица, 
    символ, квадрат которого равен –1, то есть i² = –1.`,
  ],
  [
    `Найдите определенный интеграл
    <img src="/assets/img/decade/def_integral.png"></img>`,
    `π/12`,
  ],
  [`Найдите площадь тела вращения x²=3y y=x`, `1,5кв. ед`],
  ["Числовой ряд это...", `<img src="/assets/img/decade/row.png"></img>`],
  [
    `Какой ряд больше?
    <img src="/assets/img/decade/CodeCogsEqn.svg"></img>`,
    `<img src="/assets/img/decade/harmonic_hint.png"></img>`,
  ],
  [
    `Какой необходимый признак сходимости ряда?`,
    `Если ряд ∞∑n=1un сходится, то limn→∞un=0.`,
  ],
  [
    `Как решаются линейные однородные дифференциальные уравнения
    второго порядка с постоянными коэффициентами?`,
    `Составляется характеристическое уравнение r² + pr + q = 0`,
  ],
  [
    `Решите дифф. уравнение <img src="/assets/img/decade/diff.png"></img>`,
    `<img src="/assets/img/decade/answers/diff.png"></img>`,
  ],
];

var teams_quantity = 3;
var teams = [];

var question = 0;
var game_started = 0;

function MakeResult() {
  let max_score = Math.max(...teams);
  const results_list = document.getElementById("results_list");

  for (let i = 0; i < teams_quantity; i++) {
    results_list.innerHTML += `
    <label for="team${i}">${i + 1}</label>
    <progress id="file" max="${max_score}" 
    value="${teams[i]}">${teams[i]}</progress>
    <b>${teams[i]}</b>
    `;
  }
}

function ToNextSlide(step = 1) {
  question += step;

  if (question >= questions_with_answers.length * 2) {
    document.getElementById("game").style = "display: none;";
    document.getElementById("results_screen").style = "";
    MakeResult();
    game_started = 2;
    return;
  }

  let isAnswer = question % 2;
  let block = 0;
  try {
    block = Math.floor(question / 2);
  } catch (error) {}

  let header = "Вопрос";

  if (isAnswer) {
    header = "Ответ";
  } else {
  }

  let array = document.querySelectorAll("#team_selector");
  for (let i = 0; i < teams_quantity; i++) {
    array[i].disabled = isAnswer;
  }

  header = `<h3 id="header">${header}</h3>`;
  let label = document.getElementById("info");

  label.innerHTML = header + questions_with_answers[block][isAnswer];
  document
    .getElementById("header")
    .animate(
      [
        { transform: "scale(100%)" },
        { transform: "scale(120%)" },
        { transform: "scale(80%) " },
        { transform: "scale(100%)" },
      ],
      {
        duration: 50,
        iterations: 1,
      }
    );
}

function Win(number = -1) {
  ToNextSlide();

  if (number != -1) {
    teams[number] += 1;
  }
}

const value = document.querySelector("#team_count");
const input = document.querySelector("#team_count_slider");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

document.getElementById("start_game").onclick = StartQuiz;

function StartQuiz() {
  teams_quantity = input.value;

  document.getElementById("splash").style = "display: none";
  document.getElementById("game").style = "";
  for (let i = 0; i < teams_quantity; i++) {
    teams[i] = 0;
    let button = document.createElement("button");
    button.innerHTML = i + 1;
    button.onclick = () => Win(i);
    document.getElementById("teams").appendChild(button);
    button.setAttribute("id", "team_selector");
  }

  let button = document.createElement("button");

  button.innerHTML = ">";
  button.onclick = Win;
  document.getElementById("teams").appendChild(button);

  ToNextSlide(0);
  game_started = 1;
}

this.addEventListener("keypress", (event) => {
  if (event.key == " " && game_started == 1 && !event.repeat) {
    ToNextSlide();
  }
});
