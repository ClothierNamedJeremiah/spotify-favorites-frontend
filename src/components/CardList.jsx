import React from 'react';
import PropTypes from 'prop-types';

import ArtistCard from './ArtistCard';
import TrackCard from './TrackCard';

const CardList = (props) => {
  const { userData, type } = props;

  let Cards;
  if (type === 'artists') {
    Cards = userData.map((item) => (
      <ArtistCard
        key={item.spotifyURL}
        rank={item.rank}
        imageURL={item.imageURL}
        spotifyURL={item.spotifyURL}
        genres={item.genres}
        name={item.name}
        popularity={item.popularity}
      />
    ));
  } else {
    Cards = userData.map((item) => (
      <TrackCard
        key={item.spotifyURL}
        artists={item.artists}
        albumImage={item.albumImage}
        trackName={item.trackName}
        popularity={item.popularity}
        rank={item.rank}
        spotifyURL={item.spotifyURL}
        previewURL={item.previewURL}
      />
    ));
  }

  return (
    <div className="card-list-wrapper">
      <div className="card-list">
        {Cards}
      </div>
    </div>
  );
};

CardList.propTypes = {
  type: PropTypes.oneOf(['artists', 'tracks']).isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default React.memo(CardList, (prevProps, currProps) => (
  prevProps.userData === currProps.userData
));
