import React from 'react';
import '../App.css';
const Loading: React.FC = () => {
  return (
    <div className="spinner-border text-primary" role="status">
      <center>
        <span className="visually-hidden">Loading...</span>
      </center>
    </div>
  );
};

export default Loading;
