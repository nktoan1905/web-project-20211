import React from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import '../style.css';
function NavTitle(props) {
  const temp = props.changeFunc;
  const temp1 = props.changeFunc1;
  const temp2 = props.changeFunc2;
  const temp3 = props.changeFunc3;

  return (
    <div className="over_filter">
      <div className="filter_page">
        <div className="wrap-title">
          <div className="title">Trang lọc phim </div>
        </div>
      </div>
      <div className="filter-movie">
        <div className="trigger-buttons">
          <div onClick={temp}>
            Thể loại
            <ExpandMoreRoundedIcon className="icon1"></ExpandMoreRoundedIcon>
          </div>
          <div onClick={temp1}>
            Năm
            <ExpandMoreRoundedIcon className="icon1"></ExpandMoreRoundedIcon>
          </div>
          <div onClick={temp2}>
            Số tập
            <ExpandMoreRoundedIcon className="icon1"></ExpandMoreRoundedIcon>
          </div>
          <div onClick={temp3}>
            Trạng thái
            <ExpandMoreRoundedIcon className="icon1"></ExpandMoreRoundedIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavTitle;
