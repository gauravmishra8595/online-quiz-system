import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategorySelect = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSelect = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Select a Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleSelect(cat._id)}
            className={`cursor-pointer ${cat.color} text-white font-medium rounded-2xl p-6 shadow-lg hover:scale-105 transform transition-all duration-300`}
          >
            {cat.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
