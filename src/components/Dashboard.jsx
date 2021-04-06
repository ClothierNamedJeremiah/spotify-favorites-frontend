import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Navbar from './Navbar';
import CardList from './CardList';

import getUsersTopData from '../data/spotify';

const selectOptions = [
  { value: 'short_term', label: 'Short term - last 4 weeks' },
  { value: 'medium_term', label: 'Medium term - last 6 months' },
  { value: 'long_term', label: 'Long term - last several years' },
];

function mapValueToLabel(value) {
  return selectOptions.find((option) => option.value === value);
}

const Dashboard = (props) => {
  const { accessToken } = props;

  const [userData, setUserData] = useState([]);
  const [selectedType, setSelectedType] = useState('tracks');
  const [selectedTimeRange, setSelectedTimeRange] = useState('medium_term');

  const offset = useRef(0);
  const observer = useRef(null);

  const handleScrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    offset.current = 0;
    setUserData([]);
  }, [selectedType, selectedTimeRange]);

  useEffect(() => {
    const callback = ([entry]) => {
      // Only fetch data when we have transitioned into a state of intersection
      // We don't want to fetch more data if we're scrolling up
      if (entry.isIntersecting && offset.current < 50) {
        getUsersTopData(accessToken, selectedType, selectedTimeRange, 10, offset.current)
          .then((data) => {
            offset.current += 10;
            const result = userData.concat(data);
            setUserData(result);
          });
      }
    };

    const target = document.getElementById('intersection-target');
    observer.current = new IntersectionObserver(callback, {
      rootMargin: '20px 0px 0px 0px',
    });
    observer.current.observe(target);

    return () => {
      observer.current.disconnect();
    };
  }, [userData]);

  return (
    <>
      <Navbar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />
      <div className="select-wrapper">
        <h2 className="select-type">Top {selectedType}</h2>
        <Select
          className="select"
          options={selectOptions}
          defaultValue={selectOptions[1]}
          value={mapValueToLabel(selectedTimeRange)}
          isSearchable={false}
          onChange={({ value }) => setSelectedTimeRange(value)}
        />
      </div>
      <CardList
        userData={userData}
        type={selectedType}
      />
      { offset.current === 50
        && (
          <div className="dashboard__end">
            <div>No more results available.</div>
            <button
              type="button"
              className="dashboard__end__top"
              onClick={handleScrollToTop}
            >
              Scroll to Top
            </button>
          </div>
        )
      }
      <div id="intersection-target" />
    </>
  );
};

Dashboard.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default Dashboard;
