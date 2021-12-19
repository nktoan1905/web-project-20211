import React from 'react';
import './style.css';

function Dangky(props) {
  return (
    <div className="Dangky">
      <div className="DkyTit">
        <div>Đăng ký</div>
      </div>
      <div className="DkyNdung">
        <form action="post">
          <div>
            <label>Biệt danh</label>
            <input type="text" placeholder="Biệt danh bạn muốn đặt" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Nhập email của bạn" />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu của bạn" />
          </div>
          <div>
            <label>Nhập lại mật khẩu</label>
            <input type="password" placeholder="Nhập lại mật khẩu của bạn" />
          </div>
          <div>
            <button type="submit">Đăng ký</button>
            <div>Bạn đã có tài khoản?</div>
            <a href="/">Đăng nhập</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dangky;
