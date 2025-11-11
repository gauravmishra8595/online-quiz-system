import React from 'react';

export default function QuestionCard({ question, onSelect, selectedIndex }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">{question.text}</h3>
      <div className="grid gap-2">
        {question.options.map((opt, i) => (
          <button key={i}
            className={`text-left p-3 rounded-lg border transition ${
              selectedIndex === i ? 'border-2 border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onSelect(i)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
