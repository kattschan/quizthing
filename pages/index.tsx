import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, XCircle } from 'lucide-react';

const Home = () => {
  const questions = [
    {
      id: 1,
      question: "To go sightseeing",
      options: ["ver las atracciones", "voy a museo", "voy a casa", "ver el aeropuerto"],
      correctAnswer: "ver las atracciones"
    },
    {
      id: 2,
      question: "To go on a tour",
      options: ["voy a gira", "hacer una gira", "hacer una ropa", "las muñencas"],
      correctAnswer: "hacer una gira"
    },
    {
      id: 3,
      question: "To visit a museum",
      options: ["es bueno que", "hacer un museo", "visitar un catedral", "visitar un museo"],
      correctAnswer: "visitar un museo"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct += 1;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-xl font-bold">
              Your Score: {score} out of {questions.length}
            </p>
            {questions.map((q, index) => (
              <div key={q.id} className="border rounded-lg p-4">
                <p className="font-medium">{q.question}</p>
                <p className="mt-2">
                  Your answer: {selectedAnswers[index]}
                  {selectedAnswers[index] === q.correctAnswer ? (
                    <CheckCircle className="inline ml-2 text-green-500" size={20} />
                  ) : (
                    <XCircle className="inline ml-2 text-red-500" size={20} />
                  )}
                </p>
                {selectedAnswers[index] !== q.correctAnswer && (
                  <p className="text-sm text-green-600 mt-1">
                    Correct answer: {q.correctAnswer}
                  </p>
                )}
              </div>
            ))}
            <Button 
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setShowResults(false);
              }}
              className="mt-4"
            >
              Retry Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Multiple Choice Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <h2 className="text-xl font-semibold">
            {questions[currentQuestion].question}
          </h2>

          <RadioGroup
            value={selectedAnswers[currentQuestion]}
            onValueChange={handleAnswer}
            className="space-y-2"
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <label htmlFor={option} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;