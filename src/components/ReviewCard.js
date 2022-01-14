import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <Link to={`/reviews/${review.review_id}`}>
        <li key={review.review_id}>
          <p>Title: {review.title}</p>
          <p>Owner: {review.owner}</p>

          <img
            className="review-list-image"
            src={review.review_img_url}
            alt={review.title}
          />
        </li>
      </Link>
    </div>
  );
};

export default ReviewCard;
