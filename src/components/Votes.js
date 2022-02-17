import { useVotes } from '../hooks/useVotes';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const Votes = ({ votingPath, id, currentVotes }) => {
  const { votes, increaseVote, decreaseVote, isError } = useVotes(
    votingPath,
    id,
    currentVotes
  );

  return (
    <section>
      <p>
        <Button
          onClick={increaseVote}
          size="small"
          variant="contained"
          endIcon={<PlusOneIcon />}
        >
          Current votes: {votes}
        </Button>
      </p>

      {isError && (
        <p className="error-message-card ">Sorry, there was a problem</p>
      )}
    </section>
  );
};

export default Votes;
