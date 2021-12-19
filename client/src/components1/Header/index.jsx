import { Fragment, useState } from 'react';
import Narbar from './Narbar';
import Menuuu from './Select';
import './style.css';

function Header() {
  const [statusChange, setstatusChange] = useState({
    status: true,
  });

  const changeStatus = (e) => {
    let newStatus = {
      status: '',
    };

    newStatus.status = !statusChange.status;
    setstatusChange(newStatus);
    e.preventDefault();
  };

  return (
    <Fragment>
      <Narbar changeStatusFunc={changeStatus} />
      <Menuuu downFunc={statusChange} />
    </Fragment>
  );
}

export default Header;
