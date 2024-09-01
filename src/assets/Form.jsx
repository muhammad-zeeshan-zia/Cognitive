import React, { useState } from 'react';
const questions = [
  {
    id: 1,
    text: "I can easily remember a list of items I need to buy without writing them down.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 2,
    text: "I often find myself losing focus during long meetings or lectures.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 3,
    text: "I can quickly solve mathematical problems in my head.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 4,
    text: "I excel at finding creative solutions to complex problems.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 5,
    text: "I often forget important dates or appointments.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 6,
    text: "I can easily focus on a task even in a noisy environment.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 7,
    text: "I take longer than others to complete tasks or assignments.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 8,
    text: "I struggle to see connections between different ideas or concepts.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 9,
    text: "I can easily recall details from conversations I had days ago.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 10,
    text: "I find it difficult to multitask effectively.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 11,
    text: "I can quickly process and understand new information.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 12,
    text: "I enjoy tackling puzzles or brain teasers.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 13,
    text: "I often need to re-read paragraphs to understand their meaning.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 14,
    text: "I can maintain concentration on a task for long periods without breaks.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 15,
    text: "I can quickly identify patterns in complex data or information.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 16,
    text: "I find it challenging to adapt my approach when faced with unexpected obstacles.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 17,
    text: "I can easily remember and follow multi-step instructions.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 18,
    text: "I often find my mind wandering during conversations.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 19,
    text: "I can quickly organize my thoughts and express them clearly.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 20,
    text: "I'm good at breaking down complex problems into manageable steps.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  }
];

const options = [
  { value: 'strongly_disagree', label: 'Strongly Disagree', score: 1 },
  { value: 'disagree', label: 'Disagree', score: 2 },
  { value: 'neutral', label: 'Neutral', score: 3 },
  { value: 'agree', label: 'Agree', score: 4 },
  { value: 'strongly_agree', label: 'Strongly Agree', score: 5 }
];

const CognitiveAbilitiesAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const domainScores = {
      Memory: 0,
      Attention: 0,
      'Processing Speed': 0,
      'Problem-Solving': 0
    };

    questions.forEach((question, index) => {
      const answer = answers[index];
      const score = options.find(option => option.value === answer)?.score || 0;
      const adjustedScore = question.id % 2 === 0 ? 6 - score : score; // Reverse score for even questions
      domainScores[question.domain] += adjustedScore;
    });

    // Convert raw scores to percentages
    Object.keys(domainScores).forEach(domain => {
      domainScores[domain] = (domainScores[domain] / 25) * 100; // 25 is the max score for each domain (5 questions * 5 max score)
    });

    return domainScores;
  };

  const getInterpretation = (scores) => {
    const interpretations = {};
    Object.entries(scores).forEach(([domain, score]) => {
      if (score >= 80) {
        interpretations[domain] = "Strong";
      } else if (score >= 60) {
        interpretations[domain] = "Average";
      } else {
        interpretations[domain] = "Needs Improvement";
      }
    });
    return interpretations;
  };

  const getDomainAdvice = (domain, level) => {
    const advice = {
      Memory: {
        Strong: "Your memory skills are excellent. Continue challenging yourself with memory games and learning new information to maintain this strength.",
        Average: "Your memory is functioning well. Consider using mnemonic devices and regular review of important information to further improve.",
        "Needs Improvement": "To enhance your memory, try techniques like chunking information, using visual aids, and practicing active recall."
      },
      Attention: {
        Strong: "You have a great ability to focus. Use this strength in tasks requiring sustained attention and help others develop their concentration skills.",
        Average: "Your attention skills are good. Try mindfulness exercises and minimize distractions in your environment to further improve focus.",
        "Needs Improvement": "Work on improving your attention by practicing mindfulness, breaking tasks into smaller chunks, and creating a distraction-free environment."
      },
      "Processing Speed": {
        Strong: "Your quick thinking is a valuable asset. Use this skill in time-sensitive tasks and decision-making processes.",
        Average: "Your processing speed is normal. Regular brain-training exercises and physical activity can help maintain and potentially improve this ability.",
        "Needs Improvement": "To increase your processing speed, try timed cognitive exercises, learn new skills, and ensure you're getting enough sleep and exercise."
      },
      "Problem-Solving": {
        Strong: "You excel at problem-solving. Seek out complex challenges and consider mentoring others in analytical thinking.",
        Average: "Your problem-solving skills are solid. Engage in puzzles, strategic games, and real-world problem-solving scenarios to further enhance this ability.",
        "Needs Improvement": "Improve your problem-solving skills by practicing brainstorming techniques, breaking down complex problems, and seeking diverse perspectives."
      }
    };
    return advice[domain][level];
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const scores = calculateScores();
    const interpretations = getInterpretation(scores);
    return (
      // <Card className="w-[350px]">
      //   <CardHeader>
      //     <CardTitle>Cognitive Abilities Assessment Results</CardTitle>
      //   </CardHeader>
      //   <CardContent>
      //     {Object.entries(scores).map(([domain, score]) => (
      //       <div key={domain} className="mb-4">
      //         <h3 className="font-semibold">{domain}</h3>
      //         <p>Score: {score.toFixed(2)}%</p>
      //         <p>Interpretation: {interpretations[domain]}</p>
      //         <p className="text-sm mt-1">{getDomainAdvice(domain, interpretations[domain])}</p>
      //       </div>
      //     ))}
      //   </CardContent>
      //   <CardFooter>
      //     <Button onClick={restartTest}>Restart Test</Button>
      //   </CardFooter>
      // </Card>
      <div className="border rounded-lg shadow-lg p-6 max-w-lg w-full mx-auto">
  <div className="mb-6 border-b pb-3">
    <h2 className="text-2xl font-bold text-gray-800">Cognitive Abilities Assessment Results</h2>
  </div>
  <div className="mb-6 space-y-6">
    {Object.entries(scores).map(([domain, score]) => (
      <div key={domain} className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg text-gray-700">{domain}</h3>
        <p className="text-gray-600">Score: <span className="font-medium">{score.toFixed(2)}%</span></p>
        <p className="text-gray-600">Interpretation: <span className="font-medium">{interpretations[domain]}</span></p>
        <p className="text-sm mt-2 text-gray-500">{getDomainAdvice(domain, interpretations[domain])}</p>
      </div>
    ))}
  </div>
  <div className="flex justify-center">
    <button onClick={restartTest} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300">
      Restart Test
    </button>
  </div>
</div>

    );
  }

  return (
    // <Card className="w-[350px]">
    //   <CardHeader>
    //     <CardTitle>Cognitive Abilities Self-Assessment</CardTitle>
    //     <CardDescription>Question {currentQuestion + 1} of {questions.length}</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <p className="mb-4">{questions[currentQuestion].text}</p>
    //     <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion] || ''}>
    //       {options.map((option) => (
    //         <div key={option.value} className="flex items-center space-x-2">
    //           <RadioGroupItem value={option.value} id={option.value} />
    //           <Label htmlFor={option.value}>{option.label}</Label>
    //         </div>
    //       ))}
    //     </RadioGroup>
    //   </CardContent>
    //   <CardFooter className="flex justify-between">
    //     <Button onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>Previous</Button>
    //     <Button onClick={goToNextQuestion} disabled={!answers[currentQuestion]}>
    //       {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
    //     </Button>
    //   </CardFooter>
    // </Card>
    <div className="border rounded-lg shadow-lg p-6 max-w-lg w-full mx-auto">
    <div className="mb-6 border-b pb-3">
      <h2 className="text-2xl font-bold text-gray-800">Cognitive Abilities Self-Assessment</h2>
      <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
    </div>
    <div className="mb-6">
      <p className="mb-4 text-gray-700">{questions[currentQuestion].text}</p>
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3">
            <input
              type="radio"
              id={option.value}
              name="answer"
              value={option.value}
              checked={answers[currentQuestion] === option.value}
              onChange={(e) => handleAnswer(e.target.value)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <label htmlFor={option.value} className="text-sm text-gray-700">{option.label}</label>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-between">
      <button 
        onClick={goToPreviousQuestion} 
        disabled={currentQuestion === 0} 
        className="bg-gray-500 text-white py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        Previous
      </button>
      <button 
        onClick={goToNextQuestion} 
        disabled={!answers[currentQuestion]} 
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
      >
        {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  </div>
  
  );
};

export default CognitiveAbilitiesAssessment;
