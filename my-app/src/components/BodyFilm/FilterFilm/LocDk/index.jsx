import React from 'react';
import './style.css';

function Condition(props) {
  const temp = props.bien;
  const temp1 = props.bien1;
  const temp2 = props.bien2;
  const temp3 = props.bien3;

  const style = {
    display: temp.status ? 'block' : 'none',
  };

  const style1 = {
    display: temp1.status ? 'block' : 'none',
  };

  const style2 = {
    display: temp2.status ? 'block' : 'none',
  };

  const style3 = {
    display: temp3.status ? 'block' : 'none',
  };

  return (
    <div className="condition-filter">
      <div style={style}>
        <div className="tit1">Thể loại</div>
        <div className="ite1">
          <div>Anime</div>
          <div>Anime</div>
          <div>Anime</div>
          <div>Anime</div>
          <div>Anime</div>
          <div>Anime</div>
          <div>Anime</div>
        </div>
      </div>
      <div style={style1}>
        <div className="tit1">Năm phát hành</div>
        <div className="ite1">
          <div>2021</div>
          <div>2020</div>
          <div>2019</div>
          <div>2018</div>
          <div>2017</div>
        </div>
      </div>
      <div style={style2}>
        <div className="tit1">Số tập ít nhất</div>
        <div className="ite1">
          <div>FULL</div>
          <div>100</div>
          <div>50</div>
          <div>20</div>
        </div>
      </div>
      <div style={style3}>
        <div className="tit1">Trạng thái</div>
        <div className="ite1">
          <div>Đã hoàn thành</div>
          <div>Chưa hoàn thành</div>
        </div>
      </div>
    </div>
  );
}

export default Condition;
