import React from 'react';
import './style.css';
function FollowFilm(props) {
  return (
    <div>
      <div className="titleFllow">
        <div>Phim bạn theo dõi</div>
      </div>
      <div className="ndungFllow">
        <div>Bạn chưa theo dõi nội dung nào</div>
      </div>
    </div>
  );
}

export default FollowFilm;
