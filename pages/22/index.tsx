import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, XCircle } from 'lucide-react';

const Home = () => {
  const questions = [
    {
      id: 1,
      question: "You look good!",
      options: ["¡Te ves bien!", "¡Dale!", "¡Te veías bien!", "el acondicionador"],
      correctAnswer: "¡Te ves bien!"
    },
    {
      id: 2,
      question: "ducharse",
      options: ["to wake up", "to brush your teeth", "to take a shower", "to turn on the lights"],
      correctAnswer: "to take a shower"
    },
    {
      id: 3,
      question: "el cepillo de dientes",
      options: ["the makeup", "the toothbrush", "the shaving cream", "date"],
      correctAnswer: "the toothbrush"
    },
        {
      id: 4,
      question: "lentamente",
      options: ["quickly", "rapidly", "in order to", "slowly"],
      correctAnswer: "slowly"
    },
    {
      id: 5,
      question: "entrenarse",
      options: ["to cut one's hair", "to train", "to wash one's face", "to get up"],
      correctAnswer: "to train"
    },
    {
      id: 6,
      question: "la toalla",
      options: ["the tooth", "the shampoo", "the towel", "the special event"],
      correctAnswer: "the towel"
    },
    {
      id: 7,
      question: "the makeup",
      options: ["la crema de afeitar", "el maquillaje", "levantarse", "el secador de pelo"],
      correctAnswer: "to train"
    },
    {
      id: 8,
      question: "la cita",
      options: ["the city", "the date", "the citation", "the comb"],
      correctAnswer: "the date"
    },
  ];

  const [currentQuestion, setCurrentQuestion]: any = useState(0);
  const [selectedAnswers, setSelectedAnswers]: any = useState({});
  const [showResults, setShowResults]: any = useState(false);

  const handleAnswer = (value: any) => {
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
            <a href="https://quitseb.com/">
            <Button 
              className="mt-4"
            >
              Exit
            </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>KT 2.2 Review Quiz Proyecto Maestro</CardTitle>
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