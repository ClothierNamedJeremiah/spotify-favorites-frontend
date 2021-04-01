/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * It's important to order the input fields as: input label
 *  because then we can target the label field and apply css styles
 *  when the input field is defaultChecked
 */
const Settings = (props) => {
  const {
    selectedType,
    setSelectedType,
    selectedTimeRange,
    setSelectedTimeRange,
    setIsSettingsOpen,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setSelectedType(formData.get('type'));
    setSelectedTimeRange(formData.get('time'));
    setIsSettingsOpen(false);
  };

  return (
    <form className="settings-container" onSubmit={(e) => handleSubmit(e)}>
      <section className="settings-section">
        <h2 className="settings-title">Type</h2>
        <input
          type="radio"
          id="artists"
          name="type"
          value="artists"
          defaultChecked={selectedType === 'artists'}
        />
        <label htmlFor="artists">Artists</label>

        <input
          type="radio"
          id="tracks"
          name="type"
          value="tracks"
          defaultChecked={selectedType === 'tracks'}
        />
        <label htmlFor="tracks">Tracks</label>
      </section>
      <div className="horizontal-line-wrapper">
        <span className="horizontal-line" />
      </div>
      <section className="settings-section">
        <h2 className="settings-title">Time Range</h2>
        <input
          type="radio"
          id="short"
          name="time"
          value="short_term"
          defaultChecked={selectedTimeRange === 'short_term'}
        />
        <label htmlFor="short">Short term <span> - last 4 weeks</span></label>

        <input
          type="radio"
          id="medium"
          name="time"
          value="medium_term"
          defaultChecked={selectedTimeRange === 'medium_term'}
        />
        <label htmlFor="medium">Medium term <span> - last 6 months</span></label>

        <input
          type="radio"
          id="long"
          name="time"
          value="long_term"
          defaultChecked={selectedTimeRange === 'long_term'}
        />
        <label htmlFor="long">Long term <span> - last several years</span></label>
      </section>
      <div className="settings__buttons">
        <button
          className="secondary"
          type="button"
          onClick={() => setIsSettingsOpen(false)}
        >
          Cancel
        </button>
        <button className="primary" type="submit">Confirm</button>
      </div>
    </form>
  );
};

Settings.propTypes = {
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedTimeRange: PropTypes.string.isRequired,
  setSelectedTimeRange: PropTypes.func.isRequired,
  setIsSettingsOpen: PropTypes.func.isRequired,
};

export default Settings;
