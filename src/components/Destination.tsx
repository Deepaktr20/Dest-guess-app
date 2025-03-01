import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCorrect,
  incrementIncorrect,
  resetScore,
  RootState,
} from "../store";
import UserProfile from "./UserProfile";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { generateDestination } from "../config/generateDestination";

interface DestinationData {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

interface Feedback {
  correct: boolean;
  funFact: string;
}

function Destination() {
  const [currentDestination, setCurrentDestination] =
    useState<DestinationData | null>(null);
  const [currentClue, setCurrentClue] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnsSelected, setIsAnsSelected] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [destinations, setDestinations] = useState<DestinationData[] | null>(
    null
  );

  const dispatch = useDispatch();
  const totalScore = useSelector((state: RootState) => state.score);

  const loadNewQuestion = () => {
    if (!destinations || destinations.length === 0) return;

    const randomDestination =
      destinations[Math.floor(Math.random() * destinations.length)];
    setCurrentDestination(randomDestination);
    setCurrentClue(
      randomDestination.clues[
        Math.floor(Math.random() * randomDestination.clues.length)
      ]
    );
    setSelectedAnswer(null);
    setFeedback(null);
    setIsAnsSelected(false);

    if (totalScore.totalQuestions > 5) {
      dispatch(resetScore());
      alert("Round completed. Play again!!");
    }
  };

  useEffect(() => {
    generateDestination()
      .then((data) => {
        if (data) {
          console.log("Data=====>", data);
          setDestinations(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (destinations && destinations.length > 0) {
      loadNewQuestion();
    }
  }, [destinations]);

  const handleAnswerSelection = (answer: string) => {
    if (!currentDestination) return;

    setSelectedAnswer(answer);
    setIsAnsSelected(true);
    const isCorrectSelection = answer === currentDestination.city;

    if (isCorrectSelection) {
      confetti();
      dispatch(incrementCorrect());
    } else {
      dispatch(incrementIncorrect());
    }

    setFeedback({
      correct: isCorrectSelection,
      funFact: currentDestination.fun_fact[0],
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-blue-50 pt-4 w-full px-4 overflow-y-auto">
      <div className="absolute top-4 right-4">
        <UserProfile />
      </div>
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Globetrotter</h1>
      <p className="text-gray-600 text-sm mb-2 text-center">
        Each round consists of 5 questions. Your score will reset after every
        round.
      </p>
      <p className="text-lg font-semibold">Score: {totalScore.correct}/5</p>
      {destinations && destinations.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Guess the Destination
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
            Hint : {currentClue}
          </p>
          <div className="space-y-2">
              <select
                value={selectedAnswer || ""}
                onChange={(e) => handleAnswerSelection(e.target.value)}
                disabled={selectedAnswer !== null}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              >
                <option value="" disabled>
                  Select a destination
                </option>
                {destinations?.map((dest,index) => (
                  <option key={index} value={dest.city}>
                    {dest.city}
                  </option>
                ))}
              </select>
          </div>
        </div>
      </div>
      ):(
        <p className="text-gray-500 text-sm">Loading destinations... Please wait for some time</p>
      )}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 p-3 rounded-lg text-white text-sm font-semibold ${
            feedback.correct ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{feedback.correct ? "🎉 Correct!" : "😢 Incorrect!"}</p>
          <p className="text-xs mt-1">{feedback.funFact}</p>
        </motion.div>
      )}
      <button
        onClick={loadNewQuestion}
        disabled={!isAnsSelected}
        className={`mt-3 px-3 py-1 rounded-lg text-sm ${
          isAnsSelected
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Next
      </button>
      <div className="w-full flex justify-center mt-3">
        <WhatsappShareButton
          title={`Join me in playing Globetrotter! & Your friend scored ${totalScore.correct} of ${totalScore.round} rounds`}
          url="https://destiantion-app.web.app"
          separator=" - "
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold w-full max-w-xs">
            <WhatsappIcon size={24} round />
            <span>Challenge a Friend</span>
          </div>
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default Destination;
