const Footer = () => {
  return (
    <footer id="footer">
      <p>
        This App is developed using React.js, Axios and REST APIs provided by
        Northcoders
      </p>
      <p>
        Another version os this app has been{' '}
        <a href="https://qm-fe-nc-games.netlify.app/reviews" target="_blank">
          {' '}
          deployed on Netlify,
        </a>{' '}
        showcasing the design of the user interface using vanilla CSS{' '}
      </p>
    </footer>
  );
};

export default Footer;
