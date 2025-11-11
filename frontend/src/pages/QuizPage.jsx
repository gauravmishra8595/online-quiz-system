import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const QuizPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/questions/${categoryId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        alert("No questions found for this category.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [categoryId]);

  // Timer logic
  useEffect(() => {
    if (!started) return;
    const countdown = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          handleNext();
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [current, started]);

  const handleNext = () => {
    if (selected === questions[current]?.correctIndex) setScore((s) => s + 1);
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setTimer(15);
    } else {
      navigate("/result", {
        state: { score, total: questions.length },
      });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-indigo-700">
        Loading questions...
      </div>
    );

  if (!questions.length)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-indigo-700">
        <p className="text-2xl mb-4">No questions found 😕</p>
        <button
          onClick={() => navigate("/categories")}
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
        >
          Back to Categories
        </button>
      </div>
    );

  if (!started)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-200 to-blue-300">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            Ready to Begin?
          </h2>
          <p className="text-gray-600 mb-6">
            You’ll have <b>15 seconds</b> for each question.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );

  const q = questions[current];
  const progressPercent = (timer / 15) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl text-center"
        >
          {/* Timer Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                progressPercent > 60
                  ? "bg-green-500"
                  : progressPercent > 30
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <h2 className="text-lg font-semibold text-indigo-600 mb-4">
            Question {current + 1} / {questions.length}
          </h2>
          <p className="text-xl mb-4">{q.text}</p>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full py-2 rounded-lg border-2 transition ${
                  selected === i
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-indigo-600 font-medium">
              ⏳ {timer}s
            </span>
            <button
              onClick={handleNext}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;


