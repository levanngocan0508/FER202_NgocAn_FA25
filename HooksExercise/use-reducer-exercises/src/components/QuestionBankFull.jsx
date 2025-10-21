// src/components/QuestionBank.jsx
import React, { useEffect, useReducer } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Key lưu High Score theo tổng số câu (để an toàn nếu số câu đổi)
const TOTAL = 3;
const HIGH_KEY = `qb_highscore_total_${TOTAL}`;

const getSavedHigh = () => {
  if (typeof window === "undefined") return 0;
  const v = Number(localStorage.getItem(HIGH_KEY));
  return Number.isFinite(v) ? v : 0;
};

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,

  // Exercise 5 bổ sung:
  timeLeft: 10,               // 10s mỗi câu
  showFeedback: false,        // hiện phản hồi đúng/sai sau khi chọn hoặc hết giờ
  lastAnswerCorrect: null,    // true/false cho câu hiện tại
  timedOut: false,            // hết giờ?
  highScore: getSavedHigh(),  // high score từ LocalStorage
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      const opt = action.payload;
      const correct = opt === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: opt,
        showFeedback: true,
        lastAnswerCorrect: correct,
        timedOut: false,
      };
    }

    // Giảm timer mỗi giây; khi chạm 0 -> coi như sai & hiện feedback
    case "TICK": {
      if (state.showScore || state.showFeedback) return state; // đã dừng
      const next = state.timeLeft - 1;
      if (next > 0) return { ...state, timeLeft: next };
      // Hết giờ
      return {
        ...state,
        timeLeft: 0,
        showFeedback: true,
        lastAnswerCorrect: false,
        timedOut: true,
        selectedOption: "",
      };
    }

    case "NEXT_QUESTION": {
      const earned = state.lastAnswerCorrect ? 1 : 0;
      const newScore = state.score + earned;
      const nextIndex = state.currentQuestion + 1;
      const finished = nextIndex === state.questions.length;

      if (finished) {
        const newHigh = Math.max(state.highScore, newScore);
        if (typeof window !== "undefined") {
          localStorage.setItem(HIGH_KEY, String(newHigh));
        }
        return {
          ...state,
          score: newScore,
          showScore: true,
          highScore: newHigh,
        };
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: nextIndex,
        selectedOption: "",
        showFeedback: false,
        lastAnswerCorrect: null,
        timedOut: false,
        timeLeft: 10, // reset timer cho câu mới
      };
    }

    case "RESTART_QUIZ": {
      return {
        ...initialState,
        highScore: state.highScore, // giữ high score hiện tại
      };
    }

    default:
      return state;
  }
}

export default function QuestionBankFull() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    timeLeft,
    showFeedback,
    lastAnswerCorrect,
    timedOut,
    highScore,
  } = state;

  // Timer: chạy khi đang làm câu & chưa hiện feedback
  useEffect(() => {
    if (showScore || showFeedback) return;
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [currentQuestion, showFeedback, showScore]);

  const q = questions[currentQuestion];
  const atLast = currentQuestion === questions.length - 1;
  const canNext = showFeedback; // chỉ Next/Finish khi đã có feedback (đã chọn hoặc hết giờ)

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>Your Score: {score} / {questions.length}</h2>
            <p className="mt-2">
              High Score: <strong>{highScore} / {questions.length}</strong>
              {score === highScore && score > 0 ? " 🎉 New High!" : ""}
            </p>
            <Button variant="primary" onClick={() => dispatch({ type: "RESTART_QUIZ" })}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Tiến trình + Timer */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small>
                Progress: <strong>{currentQuestion + 1}/{questions.length}</strong>
              </small>
              <small style={{ color: timeLeft < 5 ? "red" : "inherit", fontWeight: 600 }}>
                Time: {timeLeft}s
              </small>
            </div>

            <h4 className="mb-3">
              Question {q.id}:<br />{q.question}
            </h4>

            <div className="mt-2">
              {q.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedOption === option ? "primary" : "outline-secondary"}
                  className="m-2"
                  onClick={() => dispatch({ type: "SELECT_OPTION", payload: option })}
                  disabled={showFeedback || timeLeft === 0}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Phản hồi đúng/sai */}
            {showFeedback && (
              <div className="mt-3">
                {lastAnswerCorrect ? (
                  <div className="text-success d-flex align-items-center gap-2">
                    <FaCheckCircle aria-hidden="true" />
                    <strong>Correct! 🎉</strong>
                  </div>
                ) : (
                  <div className="text-danger d-flex align-items-center gap-2">
                    <FaTimesCircle aria-hidden="true" />
                    <strong>
                      Incorrect{timedOut ? " (Time's up)" : ""}! The correct answer is{" "}
                      {q.answer}.
                    </strong>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!canNext}
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            >
              {atLast ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
