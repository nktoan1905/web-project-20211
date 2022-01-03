import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";


const FilmCategory = (props) => {
  const { categoryfilm, setCategoryFilm } = props;
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
    {
      _id: "Anime",
      name: "Anime",
    },
    {
      _id: "Mecha",
      name: "Mecha",
    },
  ];

  const [open, setOpen] = useState(false);

  const [Checked, setChecked] = useState(categoryfilm);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleChange = () => {
    setCategoryFilm(Checked);
  };
  return (
    <Fragment>
      <div className="category">
        <div className="list-category">
          {categoryfilm.map((value, index) => (
            <Button
              variant="text"
              key={index}
              className="category-item"
              fullWidth
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="btn-edit-category">
          <Button variant="contained" onClick={handleClickOpen}>
            Edit Category
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thể loại</DialogTitle>
        <DialogContent>
          <DialogContentText>Thêm sửa xóa thể loại của Anime</DialogContentText>
          <FormGroup>
            {categoryList.map((value, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={Checked.indexOf(value._id) === -1 ? false : true}
                    onChange={() => handleToggle(value._id)}
                    color={
                      Checked.indexOf(value._id) === -1 ? "primary" : "error"
                    }
                  />
                }
                label={
                  <Button
                    onClick={() => handleToggle(value._id)}
                    color={
                      Checked.indexOf(value._id) === -1 ? "primary" : "error"
                    }
                    fullWidth
                  >
                    {value.name}
                  </Button>
                }
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChange}>Change</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

FilmCategory.propTypes = {};

export default FilmCategory;
