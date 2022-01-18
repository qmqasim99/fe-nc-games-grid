import { useState } from "react";
import { patchVotes } from "../utils/api";

export const useVotes = (path, id, startCount = 0) => {
  const [votingPath, setVotingPath] = useState(path);
  const [votingId, setVotingId] = useState(id);
  const [votes, setVotes] = useState(startCount);
  const [isError, setIsError] = useState(false);

  const increaseVote = () => {
    setIsError(false);
    setVotes((currCount) => currCount + 1);
  
    patchVotes(votingPath, votingId, 1).catch(() => {
      setIsError(true);
      setVotes((currCount) => currCount - 1);
    });
  };

  const decreaseVote = () => setVotes(0);

  return { votes, increaseVote, decreaseVote, isError };
};
