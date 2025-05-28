import React, { useState } from 'react';
import {
  Box, Button, Flex, Heading, IconButton, Text, Progress, VStack, Radio, RadioGroup, Stack, Badge, useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const questions = [
  {
    question: "What is Berkeley's primary argument about the nature of reality?",
    options: [
      'The physical world is an illusion of the mind',
      'Reality exists independent of perception',
      'Both mind and matter are fundamental',
      'Knowledge of true reality is impossible',
    ],
    answer: 0,
  },
  {
    question: "Who is known for the phrase 'I think, therefore I am'?",
    options: [
      'Immanuel Kant',
      'René Descartes',
      'David Hume',
      'Plato',
    ],
    answer: 1,
  },
  {
    question: "Which philosopher is associated with the Allegory of the Cave?",
    options: [
      'Aristotle',
      'Plato',
      'Socrates',
      'Nietzsche',
    ],
    answer: 1,
  },
  {
    question: "What is the main idea of utilitarianism?",
    options: [
      'The greatest happiness for the greatest number',
      "Duty for duty's sake",
      'Might makes right',
      'Truth is relative',
    ],
    answer: 0,
  },
  {
    question: "Who wrote 'Being and Time'?",
    options: [
      'Jean-Paul Sartre',
      'Martin Heidegger',
      'Simone de Beauvoir',
      'Albert Camus',
    ],
    answer: 1,
  },
  {
    question: "Which philosopher is famous for the categorical imperative?",
    options: [
      'Immanuel Kant',
      'John Stuart Mill',
      'Thomas Hobbes',
      'Søren Kierkegaard',
    ],
    answer: 0,
  },
  {
    question: "What is the central concern of existentialism?",
    options: [
      'The existence of God',
      'The nature of being',
      'Individual freedom and responsibility',
      'The structure of language',
    ],
    answer: 2,
  },
  {
    question: "Who argued for the 'will to power'?",
    options: [
      'Friedrich Nietzsche',
      'Karl Marx',
      'John Locke',
      'David Hume',
    ],
    answer: 0,
  },
  {
    question: "Which philosopher is associated with the social contract theory?",
    options: [
      'Jean-Jacques Rousseau',
      'Ludwig Wittgenstein',
      'Arthur Schopenhauer',
      'G.W.F. Hegel',
    ],
    answer: 0,
  },
  {
    question: "What is the main focus of phenomenology?",
    options: [
      'The study of phenomena as they appear to consciousness',
      'The analysis of language',
      'The pursuit of pleasure',
      'The denial of all knowledge',
    ],
    answer: 0,
  },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptionsAndAnswers(questions) {
  return questions.map(q => {
    const optionPairs = q.options.map((opt, idx) => ({ opt, idx }));
    for (let i = optionPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
    }
    const newOptions = optionPairs.map(pair => pair.opt);
    const newAnswer = optionPairs.findIndex(pair => pair.idx === q.answer);
    return { ...q, options: newOptions, answer: newAnswer };
  });
}

const Quiz = () => {
  const [questionsShuffled, setQuestionsShuffled] = useState(() => shuffleOptionsAndAnswers(shuffle(questions)));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('orange.50', 'gray.900');

  const handleNext = async () => {
    const correct = questionsShuffled[current].answer === Number(selected);
    const newAnswers = [...answers, { selected, correct }];
    setAnswers(newAnswers);
    if (correct) setScore(score + 10);
    setSelected('');
    if (current === questionsShuffled.length - 1) {
      setShowResult(true);
      // Save result to backend
      await axios.post('/api/quiz-results', {
        user: 'user1', // Replace with actual user
        score: score + (correct ? 10 : 0),
        answers: newAnswers.map(a => Number(a.selected)),
      });
    } else {
      setCurrent(current + 1);
    }
  };

  const handleRestart = () => {
    setQuestionsShuffled(shuffleOptionsAndAnswers(shuffle(questions)));
    setCurrent(0);
    setSelected('');
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  return (
    <Box minH="100vh" bg={pageBg} px={{ base: 2, md: 8 }} py={8}>
      <Flex align="center" mb={6} borderBottom="4px solid #2196f3" pb={2}>
        <IconButton icon={<ArrowBackIcon />} aria-label="Return to Forum" variant="ghost" mr={2} onClick={() => navigate(-1)} />
        <Heading size="md" flex={1}>Philosophy Fundamentals Quiz</Heading>
        <Badge colorScheme="yellow" fontSize="lg" px={4} py={2} borderRadius="md" ml={2} display="flex" alignItems="center">
          <span role="img" aria-label="trophy" style={{ marginRight: 6 }}>🏆</span> {score} points
        </Badge>
      </Flex>
      <Box maxW="600px" mx="auto">
        <Flex align="center" mb={4}>
          <Text fontWeight="bold" fontSize="md">Question {showResult ? questionsShuffled.length : current + 1} of {questionsShuffled.length}</Text>
        </Flex>
        <Progress value={showResult ? 100 : ((current) / questionsShuffled.length) * 100 + (showResult ? 10 : 0)} size="sm" colorScheme="blue" mb={6} borderRadius="md" />
        {showResult ? (
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md" textAlign="center">
            <Heading size="md" mb={4}>Quiz Complete!</Heading>
            <Text fontSize="lg" mb={2}>Your Score: <b>{score}</b> / {questionsShuffled.length * 10}</Text>
            <Button colorScheme="blue" mt={4} onClick={handleRestart}>Restart Quiz</Button>
          </Box>
        ) : (
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={6} fontSize="xl">{questionsShuffled[current].question}</Heading>
            <RadioGroup value={selected} onChange={setSelected}>
              <VStack align="stretch" spacing={4}>
                {questionsShuffled[current].options.map((opt, idx) => (
                  <Box key={idx} borderWidth={1} borderRadius="md" p={3} _hover={{ borderColor: 'blue.400' }}>
                    <Radio value={String(idx)} colorScheme="blue">{opt}</Radio>
                  </Box>
                ))}
              </VStack>
            </RadioGroup>
            <Button
              colorScheme="blue"
              mt={8}
              isDisabled={selected === ''}
              onClick={handleNext}
              w="full"
            >
              {current === questionsShuffled.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Quiz; 