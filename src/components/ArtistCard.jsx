import React from 'react';
import PropTypes from 'prop-types';

import GenreChips from './GenreChips';

const ArtistCard = (props) => {
  const {
    rank,
    spotifyURL,
    imageURL,
    genres,
    name,
    popularity,
  } = props;

  return (
    <div className="card card__artist">
      <div className="card__header artist__header">
        <span className="card__rank">{rank}</span>
        <a className="card__link" href={spotifyURL}>
          <span className="mi-external-link" />
        </a>
      </div>
      <div className="card__artist-details">
        <span className="card__img" style={{ '--bg': `url(${imageURL})` }} />
        <span className="card__name">{name}</span>
        <span className="card__popularity">
          Community Popularity:&nbsp;
          {popularity}
        </span>
      </div>
      <GenreChips genres={genres} />
    </div>
  );
};

ArtistCard.propTypes = {
  rank: PropTypes.number.isRequired,
  spotifyURL: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
};

export default ArtistCard;
