/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

function getArtistText(artists) {
  if (artists.length === 1) {
    return `${artists}`;
  }
  return `${artists.join(', ')}`;
}

const TrackCard = (props) => {
  const {
    artists,
    albumImage,
    trackName,
    popularity,
    rank,
    spotifyURL,
    previewURL,
  } = props;

  return (
    <div className="card card__track">
      <div className="card__header track__header">
        <span className="card__rank">{rank}</span>
        <a className="card__link" href={spotifyURL}>
          <span className="mi-external-link" />
        </a>
      </div>
      <span className="card__img" style={{ '--bg': `url(${albumImage})` }} />
      <div className="track__details">
        <span className="track__name">{trackName}</span>
        <p>{getArtistText(artists)}</p>
        <span className="card__popularity">
          Community Popularity:&nbsp;
          {popularity}
        </span>
      </div>
      <audio className="track__audio" controls>
        <source src={previewURL} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

TrackCard.defaultProps = {
  previewURL: '',
};

TrackCard.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.string).isRequired,
  albumImage: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  spotifyURL: PropTypes.string.isRequired,
  previewURL: PropTypes.string,
};

export default TrackCard;
