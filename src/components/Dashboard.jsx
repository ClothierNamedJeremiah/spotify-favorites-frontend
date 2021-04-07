import React, { useEffect, useReducer, useRef } from 'react';
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

function handleScrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TYPE':
      return {
        ...state,
        userData: [],
        offset: 0,
        selectedType: action.selectedType,
      };
    case 'SET_TIME_RANGE':
      return {
        ...state,
        userData: [],
        offset: 0,
        selectedTimeRange: action.selectedTimeRange,
      };
    case 'UPDATE_SETTINGS':
      return {
        userData: [],
        offset: 0,
        selectedType: action.selectedType,
        selectedTimeRange: action.selectedTimeRange,
      };
    case 'ADD':
      return {
        ...state,
        userData: state.userData.concat(action.userData),
        offset: state.offset + 25,
      };
    default:
      throw new Error();
  }
}

const Dashboard = (props) => {
  const { accessToken } = props;

  const [state, dispatch] = useReducer(reducer, {
    userData: [],
    offset: 0,
    selectedType: 'tracks',
    selectedTimeRange: 'medium_term',
  });

  const isCurrentlyFetching = useRef(false); // Prevent User from scrolling too fast and breaking UI

  useEffect(() => {
    const callback = ([entry]) => {
      if (entry.isIntersecting && state.offset < 50 && !isCurrentlyFetching.current) {
        isCurrentlyFetching.current = true;
        getUsersTopData(accessToken, state.selectedType, state.selectedTimeRange, 25, state.offset)
          .then((data) => {
            dispatch({ type: 'ADD', userData: data });
          })
          .finally(() => {
            setTimeout(() => {
              isCurrentlyFetching.current = false;
            }, 250);
          });
      }
    };

    const target = document.getElementById('intersection-target');
    const observer = new IntersectionObserver(callback, {
      rootMargin: '150px 0px 0px 0px',
      threshold: 0.25,
    });
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [accessToken, state]);

  return (
    <>
      <Navbar
        dispatch={dispatch}
        selectedType={state.selectedType}
        selectedTimeRange={state.selectedTimeRange}
      />
      <div className="select-wrapper">
        <h2 className="select-type">Top {state.selectedType}</h2>
        <Select
          className="select"
          options={selectOptions}
          defaultValue={selectOptions[1]}
          value={mapValueToLabel(state.selectedTimeRange)}
          isSearchable={false}
          onChange={({ value }) => dispatch({ type: 'SET_TIME_RANGE', selectedTimeRange: value })}
        />
      </div>
      <CardList
        userData={state.userData}
        type={state.selectedType}
      />
      { state.offset === 50
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
