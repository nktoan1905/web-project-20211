import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import FilmInfo from "../../components/FilmInfo/FilmInfo";
import FilmEpisodes from "../../components/FilmEpisodes";
import { Button } from "@mui/material";
const DetailFilmPage = (props) => {
  const film = {
    title: "Mushoku Tensei: Isekai Ittara Honki Dasu",
    description:
      "Mình sẽ sống nghiêm túc tại thế giới này!Một ông chú fap sư 34 tuổi, thất nghiệp, làm NEET là chính.Ngay sau khi chú ta bị đá ra khỏi nhà vào cái ngày đưa tang song thân phụ mẫu, truck-kun chào đón chú ta và tiễn về thế giới khác.Khi giật mình tỉnh giấc chú ta nhận ra bản thân đã đầu thai thành đứa bé sống trong thế giới của Kiếm và Ma pháp.",
    category: "Anime Hành động Giả tưởng Mecha",
    image: "https://animehay.club/upload/poster/3165.jpg",
    point: 0,
    reviewerNum: 0,
    year: "2021",
    numOfep: 23,
  };
  return (
    <div className="container-film-detail">
      <FilmInfo film = {film}/>
      <FilmEpisodes/>
      <Button variant="outlined" color="secondary" className="btn-del">Delete</Button>
    </div>
  );
};

DetailFilmPage.propTypes = {};

export default DetailFilmPage;
