/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Settings from './Settings';

const Navbar = (props) => {
  const {
    selectedType,
    setSelectedType,
    selectedTimeRange,
    setSelectedTimeRange,
  } = props;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const settingsContainer = document.querySelector('.settings-container');
    if (settingsContainer) {
      const { scrollHeight } = settingsContainer;

      const eventHandler = () => {
        if (isSettingsOpen) {
          settingsContainer.style.height = 'auto';
        }
      };

      if (isSettingsOpen) {
        settingsContainer.style.height = `${scrollHeight}px`;
        settingsContainer.addEventListener('transitionend', eventHandler, { once: true });
      } else {
        const temp = settingsContainer.style.transition;
        settingsContainer.style.transition = '';

        requestAnimationFrame(() => {
          settingsContainer.style.height = `${scrollHeight}px`;
          settingsContainer.style.transition = temp;

          // As soon as the previous style changes have taken effect, have the element transition
          // to height: 0, so we are not transitioning out of height: 'auto'
          requestAnimationFrame(() => {
            settingsContainer.style.height = '0px';
          });
        });
      }
    }
  }, [isSettingsOpen]);

  return (
    <>
      <nav className="nav">
        <div className="nav__header">
          <span className="fa fa-spotify" />
          <h1 className="fs-med">{isSettingsOpen ? 'Settings' : 'Spotify Favorites'}</h1>
          <ul className="nav__tabs fs-small" role="tablist">
            <li
              className={selectedType === 'artists' ? 'nav__tab active' : 'nav__tab'}
              onClick={() => setSelectedType('artists')}
              role="tab"
            >
              Top Artists
            </li>
            <li
              className={selectedType === 'tracks' ? 'nav__tab active' : 'nav__tab'}
              onClick={() => setSelectedType('tracks')}
              role="tab"
            >
              Top Tracks
            </li>
          </ul>
          <button
            type="button"
            className="mi-menu-white"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            role="menu"
          />
        </div>

        {isSettingsOpen
          && (
            <Settings
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
              setIsSettingsOpen={setIsSettingsOpen}
            />
          )
        }
      </nav>
      {isSettingsOpen
        && (
          <span className="background-mask" />
        )
      }
    </>
  );
};

Navbar.propTypes = {
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedTimeRange: PropTypes.string.isRequired,
  setSelectedTimeRange: PropTypes.func.isRequired,
};

export default Navbar;
