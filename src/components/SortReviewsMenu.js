import { useState } from "react";

const SortReviewsMenu = ({ handleSortSubmit }) => {
  const [sort, setSort] = useState("created_at");

  const [sortOrder, setSortOrder] = useState("desc");

  const onSortValueChange = (event) => {
    setSort(event.target.value);
  };

  const onOrderValueChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSortSubmit(sort, sortOrder);
  };

  return (
    <div className="sort-wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="sort">
          <h3>Sort reviews by:</h3>
        </label>{" "}
        <select
          id="sort"
          name="sort"
          onChange={(event) => onSortValueChange(event)}
          value={sort}
        >
          <option key="created_at" value="created_at">
            Posted on
          </option>

          <option key="category" value="category">
            Category
          </option>

          <option key="comment_count" value="comment_count">
            No. of comments
          </option>

          <option key="designer" value="designer">
            Designer
          </option>

          <option key="owner" value="owner">
            Owner
          </option>

          <option key="title" value="title">
            Title
          </option>

          <option key="votes" value="votes">
            No. of votes
          </option>
        </select>{" "}
        <label>
          <input
            type="radio"
            value="desc"
            checked={sortOrder === "desc"}
            onChange={onOrderValueChange}
          />
          Descending
        </label>{" "}
        <label>
          <input
            type="radio"
            value="asc"
            checked={sortOrder === "asc"}
            onChange={onOrderValueChange}
          />
          Ascending
        </label>{" "}
        <button>Go</button>
      </form>
    </div>
  );
};

export default SortReviewsMenu;
