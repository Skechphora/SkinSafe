// Loading page to display after user submission
// to give sense of a slight delay, and a smoother transition to the results page

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const LoadingPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/results'), 2000);
  }, [])

  return (
    <div className="loading-page" id="loading-page">
      <h2>Hang tight...</h2>
    </div>
  );
};

export default LoadingPage;