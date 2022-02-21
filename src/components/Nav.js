import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import RequireLogin from './RequireLogin';

import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Navbar, Container, Nav as NavBS, NavDropdown } from 'react-bootstrap';

const Nav = ({ category, setCategory }) => {
  const navigate = useNavigate;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    // <nav>
    //   <ul className="nav-menu-wrapper">
    //     <li className="categoryLinks">
    //       <Link to="/reviews">All reviews</Link>
    //     </li>

    //     {categories.map((cat) => {
    //       return (
    //         <li className="categoryLinks" key={cat.slug} value={cat.slug}>
    //           <Link key={cat.slug} to={`/reviews/category/${cat.slug}`}>
    //             {cat.slug}
    //           </Link>
    //         </li>
    //       );
    //     })}
    //     <RequireLogin />
    //   </ul>
    // </nav>
    <nav id="nav">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <NavBS className="flex-column">
              <NavBS.Link href="/reviews">All reviews</NavBS.Link>
              {categories.map((cat) => {
                return (
                  <NavBS.Link
                    eventKey={cat.slug}
                    key={cat.slug}
                    as={Link}
                    to={`/reviews/category/${cat.slug}`}
                  >
                    {' '}
                    {cat.slug}
                  </NavBS.Link>
                );
              })}
            </NavBS>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <RequireLogin />
    </nav>
  );
};

export default Nav;
