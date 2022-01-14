import { useVotes } from "../hooks/useVotes";

const Votes = ({ votingPath, id, currentVotes }) => {
  const { votes, increaseVote, decreaseVote, isError } = useVotes(
    votingPath,
    id,
    currentVotes
  );

  return (
    <section>
      <p>Number of votes: {votes}</p>
      <button onClick={increaseVote}>Vote</button>
      {isError && <p>Sorry, there was a problem</p>}
    </section>
  );
};

export default Votes;
