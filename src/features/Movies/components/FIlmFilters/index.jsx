import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import DialogFilter from "./DialogFilter";

const FilmFilters = (props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [dialog, setDialog] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenCategory = () => {
    setDialog("category");
    setOpen(true);
  };
  const handleClickOpenYear = () => {
    setDialog("year");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddFiltersCategory = (value) => {
    setFilters(unique(filters.concat(value)));
  };
  const handleAddFiltersYear = (value) => {
    setFilters(unique(filters.concat(value)));
  };
  const unique = (arr) => {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };
  const categoryList = [
    {
      _id: "Hành động",
      name: "Hành động",
    },
    {
      _id: "Hài hước",
      name: "Hài hước",
    },
    {
      _id: "Tình cảm",
      name: "Tình cảm",
    },
    {
      _id: "Harem",
      name: "Harem",
    },
    {
      _id: "Bí ẩn",
      name: "Bí ẩn",
    },
    {
      _id: "Giả tưởng",
      name: "Giả tưởng",
    },
    {
      _id: "Học đường",
      name: "Học đường",
    },
    {
      _id: "Đời thường",
      name: "Đời thường",
    },
  ];
  const years = [
    {
      _id: "2021",
      name: "2021",
    },
    {
      _id: "2020",
      name: "2020",
    },
    {
      _id: "2019",
      name: "2019",
    },
    {
      _id: "2018",
      name: "2018",
    },
    {
      _id: "2017",
      name: "2017",
    },
    {
      _id: "2016",
      name: "2016",
    },
    {
      _id: "2015",
      name: "2015",
    },
    {
      _id: "2014",
      name: "2014",
    },
  ];

  return (
    <Box
      marginTop={5}
      style={{
        display: "flex",
        justifyItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "3px" ,textTransform: "none"}}
        onClick={handleClickOpenCategory}
      >
         Thể Loại
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "3px" ,textTransform: "none"}}
        onClick={handleClickOpenYear}

      >
         Năm
      </Button>
      {dialog === "category" ? (
        <DialogFilter
          open={open}
          handleClose={handleClose}
          title={"Thể loại"}
          filters={filters}
          setFilters={setFilters}
          content={categoryList}
          handleAddFiltersCategory={handleAddFiltersCategory}
        />
      ) : (
        ""
      )}
      {dialog === "year" ? (
        <DialogFilter
          open={open}
          handleClose={handleClose}
          title={"Năm"}
          content={years}
          setFilters={setFilters}
          filters={filters}
          handleAddFiltersCategory={handleAddFiltersYear}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

FilmFilters.propTypes = {};

export default FilmFilters;
