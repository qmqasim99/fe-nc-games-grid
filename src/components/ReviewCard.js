import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import { Card, Col } from 'react-bootstrap';

const ReviewCard = ({ review }) => {
  return (
    // <div className="review-card">
    //   <Link to={`/reviews/${review.review_id}`}>
    //     <li key={review.review_id}>
    //       <img
    //         className="review-list-image"
    //         src={review.review_img_url}
    //         alt={review.title}
    //       />
    //       <h3>{review.title}</h3>
    //       <p></p>
    //       <p>
    //         <AccountCircleIcon
    //           style={{ verticalAlign: 'middle', margin: '3px' }}
    //         />{' '}
    //         {review.owner}
    //       </p>
    //       <p>
    //         <CommentIcon style={{ verticalAlign: 'middle', margin: '3px' }} />
    //         {review.comment_count} Comments
    //       </p>
    //     </li>
    //   </Link>
    // </div>

    <Col className="review-card-wrapper">
      <Link to={`/reviews/${review.review_id}`}>
        <Card style={{ width: '20rem' }}>
          <Card.Img
            variant="top"
            src={review.review_img_url}
            className="review-list-image "
          />

          <Card.Body>
            <Card.Title>{review.title}</Card.Title>
            <Card.Text>
              <p>
                <AccountCircleIcon
                  style={{ verticalAlign: 'middle', margin: '3px' }}
                />{' '}
                {review.owner}
              </p>
              <p>
                <CommentIcon
                  style={{ verticalAlign: 'middle', margin: '3px' }}
                />
                {review.comment_count} Comments
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ReviewCard;
