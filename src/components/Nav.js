import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Nav = ({ category, setCategory }) => {
  const navigate = useNavigate;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      console.log("in Categories List res:", data);
      setCategories(data);
    });
  }, []);

  const handleSubmit = (event) => {
    setCategory(event.target.value);
    navigate("/");
  };
  return (
    <nav>
      <form onChange={(event) => handleSubmit(event)}>
        <label for="categories">Choose a category:</label>
        <select id="categories" name="categories">
          <option key="all" value="all">
            All
          </option>
          {categories.map((cat) => {
            return (
              <option key={cat.slug} value={cat.slug}>
                {cat.slug}
              </option>
            );
          })}
        </select>
      </form>
    </nav>
  );
};

export default Nav;
