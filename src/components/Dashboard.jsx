import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { CircularProgress } from '@material-ui/core';

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
  const isSameTimeRange = action.selectedTimeRange === state.selectedTimeRange;
  const isSameType = action.selectedType === state.selectedType;
  switch (action.type) {
    case 'SET_TYPE':
      return {
        ...state,
        userData: isSameType ? state.userData : [],
        selectedType: action.selectedType,
      };
    case 'SET_TIME_RANGE':
      return {
        ...state,
        userData: isSameTimeRange ? state.userData : [],
        selectedTimeRange: action.selectedTimeRange,
      };
    case 'UPDATE_SETTINGS':
      return {
        userData: isSameType && isSameTimeRange ? state.userData : [],
        selectedType: action.selectedType,
        selectedTimeRange: action.selectedTimeRange,
      };
    case 'LOAD':
      return {
        ...state,
        userData: action.userData,
      };
    default:
      throw new Error();
  }
}

const Dashboard = (props) => {
  const { accessToken } = props;

  const [state, dispatch] = useReducer(reducer, {
    userData: [],
    selectedType: 'artists',
    selectedTimeRange: 'medium_term',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log('got it');
    getUsersTopData(accessToken, state.selectedType, state.selectedTimeRange, 50)
      .then((data) => {
        dispatch({ type: 'LOAD', userData: data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken, state.selectedType, state.selectedTimeRange]);

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
      {
        loading
          ? (
            <div className="loading-indicator">
              <CircularProgress />
            </div>
          )
          : (
            <CardList
              userData={state.userData}
              type={state.selectedType}
            />
          )
      }

      { state.userData.length === 50
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
    </>
  );
};

Dashboard.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default Dashboard;
