import React from 'react';
import './style.css';
function DangNhap(props) {
  return (
    <div>
      <div className="LoginTit">
        <div className="LoginT">
          <div className="">Đăng nhập thành viên</div>
        </div>
      </div>
      <div className="LoginNdung">
        <form action="post">
          <div>
            <label>Email</label>
            <input type="email" placeholder="Nhập email của bạn" />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu của ban" />
          </div>
          <div id="chenthem"></div>
          <div className="cacButton">
            <div className="hinuttren">
              <button type="submit">Đăng nhập</button>
              <a href="/">Quên mật khẩu</a>
            </div>
            <div>
              <a href="/">Đăng ký</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DangNhap;
