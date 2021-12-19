import React, { useState } from 'react';
import Page from '../Pagination';
import ListFilm from './ListFilm';
import Condition from './LocDk';
import NavTitle from './NavTitle';

function Locphim(props) {
  const [navChange, setnavChange] = useState({
    status: false,
  });
  const changeStatus = () => {
    let temp = {
      status: '',
    };
    temp.status = !navChange.status;
    setnavChange(temp);
  };

  const [navChange1, setnavChange1] = useState({
    status: false,
  });
  const changeStatus1 = () => {
    let temp = {
      status: '',
    };
    temp.status = !navChange1.status;
    setnavChange1(temp);
  };

  const [navChange2, setnavChange2] = useState({
    status: false,
  });
  const changeStatus2 = () => {
    let temp = {
      status: '',
    };
    temp.status = !navChange2.status;
    setnavChange2(temp);
  };

  const [navTT, setTT] = useState({
    status: false,
  });
  const changeStatus3 = () => {
    let x = {
      status: '',
    };
    x.status = !navTT.status;
    setTT(x);
  };

  return (
    <div>
      <NavTitle
        changeFunc={changeStatus}
        changeFunc1={changeStatus1}
        changeFunc2={changeStatus2}
        changeFunc3={changeStatus3}
      />
      <Condition bien={navChange} bien1={navChange1} bien2={navChange2} bien3={navTT} />
      <ListFilm />
      <Page />
    </div>
  );
}

export default Locphim;
