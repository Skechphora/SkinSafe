// Loading page to display after user submission to give sense of a slight delay, and a smoother transition to the results page
// Not optimal to do this, could use Suspense/Lazy loading to achieve the same idea
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/results"), 2000);
  }, []);

  return (
    <div className="loading-page">
      <h2>Hang tight...</h2>
      <img
        src="https://i.kym-cdn.com/photos/images/original/000/591/928/94f.png"
        alt="skin_feels_so_good"
      />
    </div>
  );
};

export default LoadingPage;
