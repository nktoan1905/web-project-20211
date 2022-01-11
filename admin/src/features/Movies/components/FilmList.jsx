import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper } from "@mui/material";
import FilmItem from "./FilmItem/FilmItem";

const FilmList = (props) => {
  const {films} = props
  return (
    <Box>
      <Grid container spacing={2}>
        {/* render item here */}
        {films.map((film, index) => (
          <Grid item key={film.id} xs={12} sm={6} md={4} lg={3}>
            <FilmItem film={film} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

FilmList.propTypes = {};

export default FilmList;
