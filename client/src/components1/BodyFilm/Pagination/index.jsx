import React from 'react';
import './style.css';

function Page(props) {
  return (
    <div className="pagination">
      <div>
        <a href="https://animehay.club/phim-moi-cap-nhap/trang-1.html">Đầu</a>
        <a href="https://animehay.club/phim-moi-cap-nhap/trang-1.html" class="active_page">
          1
        </a>
        <a href="https://animehay.club/phim-moi-cap-nhap/trang-2.html">2</a>
        <div className="goPage">
          <form action="">
            <input type="text" placeholder="Nhập page cần đến" />
            <button type="submit">submit</button>
          </form>
        </div>
        <a href="aaa">GO</a>
        <a href="https://animehay.club/phim-moi-cap-nhap/trang-113.html">Cuối</a>
      </div>
    </div>
  );
}

export default Page;
