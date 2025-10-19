const questions_with_answers = [
  [
    "Кто изобрёл модель ядра, крайне похожую на сливовый пудинг или кекс с изюмом?",
    "Джозеф Джон Томсон",
  ],
  [
    "Что использовал Томсон для доказательства своей модели и когда была открыта модель?",
    "Колбочка заполненная разряженным газом. 1897 год",
  ],
  [
    "Что было открыто случайно на одном занятии, когда около рабочей электрической схемы лежал компас?",
    "Было открыто явление возникновение магнитного поля вокруг проводника, по которому течёт электрический ток.",
  ],
  [
    "Что между собой общего имеют все излучения?",
    "Присутствие частоты и длины волны.",
  ],
  [
    "Может ли трансформатор работать в сети с постоянным напряжением?",
    "Нет, так как нет изменения напряжения, а следовательно и изменения магнитного поля. На вторичной катушке просто не будет напряжения.",
  ],
  [
    "Что такое электромагнитная индукция и кем она была открыта?",
    `(Возможная формулировка) Электромагнитная индукция - это явление возникновения тока в замкнутой цепи при изменении магнитного потока проходящего через её.
    Была открыта 17 октября 1831 года, Майклом Фарадеем.`,
  ],
  [
    "Сила, которая держит каплю на монетке и помогает её не растекаться.",
    "Сила поверхностного натяжения",
  ],
  ["На что чувствительны наши глаза?", "На электромагнитные волны."],
  [
    `Одновременно сбросили 2 груза, первый массой в 2 кг, второй = 4 кг. Грузы падают с одной высоты и имеют одинаковые размеры и форму. Какой из грузов приземлится первым?
    <img src="/assets/img/decade/physics/Page 2.png"></img>`,
    `Одновременно, т.к. нет зависимости между массой и ускорением свободного падения.
    <img src="/assets/img/decade/physics/Page 1.png"></img>`,
  ],
  [
    "Почему спутники не падают на землю.",
    `Спутники летают по такой траектории, по которой они всё время как бы "промахиваются" земли.`,
  ],
  [
    "Что такое звук?",
    "Это колебание частиц вокруг нас, которое улавливается нашими ушами.",
  ],
  [
    "На минуточку представьте русскую баню... И ответьте на вопрос: что опаснее, горячий водяной пар или вода?",
    "Опаснее водяной пар, так как он после остывания начнёт конденсироваться и оседать на теле.",
  ],
  [
    "Что такое гидростатический парадокс?",
    `Парадокс заключается в том, что сила давления на дно сосуда не зависит от формы. Она зависит лишь от вертикального столба жидкости, давящего на её дно.
    <img src="/assets/img/decade/physics/Page 3.png"></img>`,
  ],
  [
    "При построении пирамид в Египте строители использовали пандусы. Расскажите что такое пандус и что он даёт.",
    `Пандус - это наклонная поверхность. Даёт выигрышь в силе равный отношении длины на высоту.
    <img src="/assets/img/decade/physics/Page 4.png"></img>`,
  ],
  [
    "Назовите два важных свойств всех простых механизмов.",
    "Все простые механизмы дают выигрышь в силе, но при этом работа остаётся неизменной.",
  ],
];

var teams = [0, 0, 0];

var question = 0;

function UpdateDisplay() {
  document.getElementById(
    "team1"
  ).innerHTML = `Команда № 1: ${teams[0]} очка(ов).`;
  document.getElementById(
    "team2"
  ).innerHTML = `Команда № 2: ${teams[1]} очка(ов).`;
  document.getElementById(
    "team3"
  ).innerHTML = `Команда № 3: ${teams[2]} очка(ов).`;
}

function ToNextSlide(step = 1) {
  question += step;

  if (question >= questions_with_answers.length * 2) {
    document.getElementById("game").style = "display: none;";
    document.getElementById("results").style = "";
  }

  let isAnswer = question % 2;
  let block = 0;
  try {
    block = Math.floor(question / 2);
  } catch (error) {}

  let header = "Вопрос";

  if (isAnswer) {
    header = "Ответ";
    document.getElementById("choose").style = "display: none;";
  } else {
    document.getElementById("choose").style = "";
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

function Win() {
  ToNextSlide();

  teams[0] += document.getElementById("first").checked;
  teams[1] += document.getElementById("second").checked;
  teams[2] += document.getElementById("third").checked;

  UpdateDisplay();

  document.getElementById("first").checked = false;
  document.getElementById("second").checked = false;
  document.getElementById("third").checked = false;
}

ToNextSlide(0);
UpdateDisplay();
