import { useEffect, useState, useContext } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { getReviews, getSortedReviews } from '../utils/api';
import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';
import ReviewCard from './ReviewCard';
import SortReviewsMenu from './SortReviewsMenu';

const ReviewsList = () => {
  const { category_id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReviews(category_id)
      .then((data) => {
        setIsLoading(false);
        setReviews(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [category_id]);

  const handleSortSubmit = (sort, sortOrder) => {
    getSortedReviews(category_id, sort, sortOrder)
      .then((data) => {
        setIsLoading(false);
        setReviews(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  };

  return (
    <main id="content">
      {isError ? (
        <>
          <ErrorMessage msg={errorMessage} />
        </>
      ) : isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          {category_id ? (
            <h2 style={{ textAlign: 'center' }}>
              Reviews for category: {category_id}
            </h2>
          ) : (
            <h2 style={{ textAlign: 'center' }}>Reviews for all categories:</h2>
          )}
          <SortReviewsMenu handleSortSubmit={handleSortSubmit} />
          {/* <ul className="review-card-wrapper ">
            {reviews.map((review) => {
              return <ReviewCard key={review.review_id} review={review} />;
            })}
          </ul> */}{' '}
          <Row xs={1} md={2} lg={3} className="g-4">
            {reviews.map((review) => {
              return <ReviewCard key={review.review_id} review={review} />;
            })}
          </Row>
        </>
      )}
    </main>
  );
};

export default ReviewsList;
