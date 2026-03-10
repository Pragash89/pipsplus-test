"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb, Volume2, RotateCcw } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOption: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answeredQuestions: Set<string>;
  selectedAnswers: Map<string, string>;
}

const questionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const optionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  hover: { x: 5, transition: { duration: 0.2 } },
};

interface InteractiveQuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete?: (results: QuizResults) => void;
  passingScore?: number;
}

export default function InteractiveQuiz({
  title,
  description,
  questions,
  onComplete,
  passingScore = 70,
}: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(
    new Map()
  );
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = selectedAnswers.has(currentQuestion.id);

  const handleSelectAnswer = (optionId: string) => {
    if (!showResults) {
      const newAnswers = new Map(selectedAnswers);
      newAnswers.set(currentQuestion.id, optionId);
      setSelectedAnswers(newAnswers);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      calculateAndShowResults();
    }
  };

  const calculateAndShowResults = () => {
    setShowResults(true);
    const correctAnswers = Array.from(selectedAnswers.entries()).filter(
      ([questionId, selectedOptionId]) => {
        const question = questions.find((q) => q.id === questionId);
        return question?.correctOption === selectedOptionId;
      }
    ).length;

    const score = Math.round((correctAnswers / questions.length) * 100);

    if (onComplete) {
      onComplete({
        score,
        totalQuestions: questions.length,
        correctAnswers,
        answeredQuestions: new Set(selectedAnswers.keys()),
        selectedAnswers,
      });
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Map());
    setShowResults(false);
    setShowExplanation(false);
  };

  if (showResults) {
    const correctAnswers = Array.from(selectedAnswers.entries()).filter(
      ([questionId, selectedOptionId]) => {
        const question = questions.find((q) => q.id === questionId);
        return question?.correctOption === selectedOptionId;
      }
    ).length;

    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-12 space-y-8"
      >
        {/* Score Circle */}
        <div className="relative w-48 h-48 mx-auto">
          <svg
            className="transform -rotate-90 w-48 h-48"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={passed ? "#10B981" : "#F59E0B"}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 439.82} 439.82`}
              initial={{ strokeDashoffset: 439.82 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-5xl font-black text-gray-900">{score}%</div>
            <p className="text-gray-600 text-sm">{correctAnswers} / {questions.length}</p>
          </div>
        </div>

        {/* Result Message */}
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {passed ? (
              <div>
                <h2 className="text-4xl font-black text-emerald-600 mb-3">
                  🎉 Excellent Work!
                </h2>
                <p className="text-gray-600 text-lg">
                  You've passed the assessment! You're ready to move to the next
                  lesson.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-4xl font-black text-amber-600 mb-3">
                  📚 Review & Try Again
                </h2>
                <p className="text-gray-600 text-lg">
                  You need {Math.ceil((passingScore - score) / Math.ceil((100 - passingScore) / (questions.length - correctAnswers)))} more correct answers to pass. Don't worry—
                  this is part of learning!
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Performance Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
        >
          <h3 className="font-bold text-gray-900 mb-4">Performance Breakdown</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "✓", label: "Correct", value: correctAnswers, color: "emerald" },
              { icon: "✗", label: "Incorrect", value: questions.length - correctAnswers, color: "red" },
              { icon: "⏱️", label: "Time Spent", value: "~5 mins", color: "blue" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl mb-2">{stat.icon}</p>
                <p className={`text-3xl font-black text-${stat.color}-600`}>
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          {!passed && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <RotateCcw size={20} />
              Review & Retake
            </button>
          )}
          <button className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors">
            📚 Next Lesson
          </button>
        </div>
      </motion.div>
    );
  }

  const selectedAnswer = selectedAnswers.get(currentQuestion.id);
  const isCorrect =
    selectedAnswer === currentQuestion.correctOption && selectedAnswer;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-black text-gray-900">{title}</h1>
        {description && (
          <p className="text-gray-600 text-lg">{description}</p>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-blue-600 font-bold">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          variants={questionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          {/* Question Text */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
              {currentQuestion.difficulty && (
                <span
                  className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                    currentQuestion.difficulty === "easy"
                      ? "bg-emerald-100 text-emerald-700"
                      : currentQuestion.difficulty === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {currentQuestion.difficulty.charAt(0).toUpperCase() +
                    currentQuestion.difficulty.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <motion.button
                key={option.id}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.1 }}
                whileHover={!isAnswered ? "hover" : undefined}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === option.id
                    ? isCorrect
                      ? "bg-emerald-50 border-emerald-300"
                      : "bg-red-50 border-red-300"
                    : "bg-white border-gray-200 hover:border-blue-300"
                } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                      selectedAnswer === option.id
                        ? isCorrect
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-red-500 border-red-500 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {selectedAnswer === option.id ? (
                      isCorrect ? (
                        "✓"
                      ) : (
                        "✗"
                      )
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>
                  <span
                    className={`flex-1 font-medium ${
                      selectedAnswer === option.id
                        ? "text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && selectedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-6 rounded-xl border-l-4 ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-400"
                    : "bg-amber-50 border-amber-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 size={24} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-bold mb-2 ${
                      isCorrect ? "text-emerald-900" : "text-amber-900"
                    }`}>
                      {isCorrect ? "Great job! 🎉" : "Good learning moment 💡"}
                    </h4>
                    <p className={isCorrect ? "text-emerald-800" : "text-amber-800"}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {selectedAnswer && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-shadow text-lg"
            >
              {currentQuestionIndex === questions.length - 1
                ? "See Results"
                : "Next Question"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
