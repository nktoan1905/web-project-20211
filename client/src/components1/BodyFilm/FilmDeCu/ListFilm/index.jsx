import React from 'react';

import './style.css';
function ListFilm(props) {
  return (
    <div className="wrap">
      <div className="listfilm">
        <div>
          <a href="https://animehay.club/thong-tin-phim/kimetsu-no-yaiba-mugen-ressha-hen-3366.html">
            <div>
              <img src="https://animehay.club//upload/poster/3366.jpg" alt="Phim Kimetsu no Yaiba: Mugen Ressha-hen" />
              <div className="name">Kimetsu no Yaiba: Mugen Ressha-hen</div>
              <div class="episode_latest">4/7 </div>
            </div>
          </a>
        </div>
        <div>
          <a href="https://animehay.club/thong-tin-phim/one-piece-dao-hai-tac-34.html">
            <div>
              <img src="https://animehay.club/upload/poster/34.jpg" alt="One Piece" />
              <div class="name">One Piece</div>
              <div class="episode_latest">999/?? </div>
            </div>
          </a>
        </div>
        <div>
          <a href="https://animehay.club/thong-tin-phim/dau-la-dai-luc-2451.html">
            <div>
              <img src="https://animehay.club/upload/poster/2451.png" alt="Đấu La Đại Lục" />
              <div class="name">Đấu La Đại Lục</div>
              <div class="episode_latest">182/?? </div>
            </div>
          </a>
        </div>
        <div>
          <a href="https://animehay.club/thong-tin-phim/86-eighty-six-2nd-season-3335.html">
            <div>
              <img src="https://animehay.club//upload/poster/3335.jpg" alt="Phim 86 (Eighty Six) 2nd Season" />
              <div class="name">86 (Eighty Six) 2nd Season</div>
              <div class="episode_latest">6.5/12 </div>
            </div>
          </a>
        </div>
        <div>
          <a href="https://animehay.club/thong-tin-phim/dau-pha-thuong-khung-uoc-hen-ba-nam-3374.html">
            <div>
              <img src="https://animehay.club/upload/poster/3374.jpg" alt="Đấu Phá Thương Khung: Ước Hẹn Ba Năm" />
              <div class="name">Đấu Phá Thương Khung: Ước Hẹn Ba Năm</div>
              <div class="episode_latest">4/13 </div>
            </div>
          </a>
        </div>
      </div>
      <div className="pagination"></div>
    </div>
  );
}

export default ListFilm;
