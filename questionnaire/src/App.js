import { useState } from "react";
import "./index.scss";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что это такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}
      </h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ question: { title, variants }, onChooseVariant, step }) {
  const progress = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${progress}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h2>{title}</h2>
      <ul>
        {variants.map((item, index) => (
          <li key={item} onClick={() => onChooseVariant(index)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[step];

  const onChooseVariant = (index) => {
    setStep((step) => step + 1);

    if (index === question.correct) {
      setCorrect((correct) => correct + 1);
    }
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game
          question={question}
          step={step}
          onChooseVariant={onChooseVariant}
        />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}

export default App;


