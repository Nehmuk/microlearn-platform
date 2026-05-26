import React, { useState } from 'react';
import { X } from 'lucide-react';
import QuestionCard from './QuestionCard';
import QuizResult from './QuizResult';

const QuizModal = ({ quizData, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  if (!quizData || quizData.length === 0) return null;

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers, selectedOption];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleSkip = () => {
    const remainingCount = totalQuestions - userAnswers.length;
    const skippedEntries = new Array(remainingCount).fill(null);
    setUserAnswers([...userAnswers, ...skippedEntries]);
    setShowResult(true);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* --- OVERLAY --- */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* --- SLIM MODAL CONTAINER --- */}
      {/* Changed max-w-[440px] to max-w-[400px] */}
      <div className="relative w-full max-w-[400px] bg-white rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-slate-600 transition-all z-10"
        >
          <X size={18} />
        </button>

        {/* REDUCED PADDING: Changed p-8 to p-5 */}
        <div className="p-5"> 
          {!showResult ? (
            <>
              <header className="mb-4 text-center">
                <p className="text-emerald-600 font-black text-[8px] uppercase tracking-[0.3em] mb-0.5">
                  Knowledge Check
                </p>
                <h2 className="text-[#0F172A] text-lg font-black tracking-tight">
                  Quick Quiz
                </h2>
              </header>

              <QuestionCard 
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                selectedOption={selectedOption}
                onSelect={handleOptionSelect}
                onNext={handleNext}
                onSkip={handleSkip} 
              />
            </>
          ) : (
            <QuizResult 
              quizData={quizData} 
              userAnswers={userAnswers}
              onRetake={handleRetake}
              onClose={onClose}
              onComplete={onComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;