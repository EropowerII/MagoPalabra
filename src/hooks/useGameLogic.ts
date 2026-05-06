import { useState, useCallback, useEffect } from 'react';
import { WORDS, WordData, WordType } from '../data/words';

export const useGameLogic = () => {
  const [round, setRound] = useState(1);
  const [wordIndex, setWordIndex] = useState(0);
  const [mp, setMp] = useState(3);
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [currentWords, setCurrentWords] = useState<WordData[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'hit' | 'miss' | 'won' | 'lost'>('playing');
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Initialize round words
  useEffect(() => {
    const roundWords = WORDS.filter(w => w.difficulty === round)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setCurrentWords(roundWords);
    setWordIndex(0);
  }, [round]);

  const currentWord = currentWords[wordIndex];

  const handleAnswer = useCallback((answer: WordType) => {
    if (gameState !== 'playing') return;

    if (answer === currentWord.type) {
      setGameState('hit');
      setTotalCorrect(prev => prev + 1);
      
      setTimeout(() => {
        if (wordIndex < currentWords.length - 1) {
          setWordIndex(prev => prev + 1);
          setGameState('playing');
        } else {
          // Round finished
          if (round < 3) {
            setRound(prev => prev + 1);
            setGameState('playing');
          } else {
            setGameState('won');
          }
        }
      }, 1000);
    } else {
      setGameState('miss');
      setMp(prev => Math.max(0, prev - 1));
      
      setTimeout(() => {
        if (mp <= 1) {
          setGameState('lost');
        } else {
          // Next word anyway or repeat? Let's go next for pace
          if (wordIndex < currentWords.length - 1) {
            setWordIndex(prev => prev + 1);
            setGameState('playing');
          } else {
             if (round < 3) {
              setRound(prev => prev + 1);
              setGameState('playing');
            } else {
              setGameState('won'); // Technically finished the words
            }
          }
        }
      }, 1000);
    }
  }, [currentWord, wordIndex, currentWords, round, mp, gameState]);

  const resetGame = () => {
    setRound(1);
    setWordIndex(0);
    setMp(3);
    setTotalCorrect(0);
    setGameState('playing');
  };

  return {
    round,
    wordIndex,
    mp,
    currentWord,
    gameState,
    totalCorrect,
    handleAnswer,
    resetGame
  };
};
