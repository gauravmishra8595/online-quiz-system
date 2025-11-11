import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0 } = location.state || {};

  const percentage = Math.round((score / total) * 100);
  const wrong = total - score;

  const data = [
    { name: "Correct Answers", value: score },
    { name: "Wrong Answers", value: wrong },
  ];

  const COLORS = ["#10B981", "#EF4444"]; // green for correct, red for wrong

  let feedback = "";
  if (percentage === 100) feedback = "Perfect score! 🌟";
  else if (percentage >= 80) feedback = "Excellent job! 💪";
  else if (percentage >= 60) feedback = "Good work! Keep improving 🚀";
  else feedback = "Don’t worry — practice makes perfect 💫";

  // Save result in backend
  const saveResult = async () => {
    try {
      await axios.post("http://localhost:5000/api/results", {
        score,
        total,
      });
    } catch (err) {
      console.error("Error saving result:", err);
    }
  };

  React.useEffect(() => {
    saveResult();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400 to-blue-600 text-white px-4">
      <motion.div
        className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-3xl text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">
          Quiz Completed!
        </h1>

        <p className="text-lg mb-2">
          You scored{" "}
          <span className="font-semibold text-indigo-600">{score}</span> out of{" "}
          <span className="font-semibold text-indigo-600">{total}</span>
        </p>

        <p className="text-2xl font-bold text-blue-600 mb-4">{percentage}%</p>
        <p className="text-gray-700 mb-6">{feedback}</p>

        {/* Pie Chart Section */}
        <div className="w-full h-64 flex justify-center mb-6">
          <ResponsiveContainer width="80%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Restart Quiz
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Login Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
