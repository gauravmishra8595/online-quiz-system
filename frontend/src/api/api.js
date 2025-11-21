const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const getQuestions = async () => {
  const res = await fetch(`${API_URL}/questions`);
  return res.json();
};

const API = axios.create({
  baseURL: "https://online-quiz-system-bu31.onrender.com/api",
});
