import React from 'react';
import PropTypes from 'prop-types';

const GenreChips = (props) => {
  const { genres } = props;

  return (
    <div className="chips-container">
      {genres.map((genre) => (
        <span className="chip" key={genre}>
          {genre}
        </span>
      ))}
    </div>
  );
};

GenreChips.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GenreChips;
