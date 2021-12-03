import React from 'react';
function Narbar(props) {
  return (
    <div>
      <div className="logo">
        <a href="/">
          <img src="https://animehay.site/themes/img/logo.png" alt="logo animehay" />
        </a>
      </div>
      <div>
        <form>
          <input type="text" placeholder="Nhập từ khóa" />
          <button type="submit">
            <span class="material-icons">search</span>
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default Narbar;
