import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-controls/InputFIelds";
import "./styles.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogFilter from "../FIlmFilters/DialogFilter";
import FilmCategory from "./FilmCategory";
const useStyles = makeStyles({
  root: {},
});

const FilmInfo = (props) => {
  const { film } = props;
  const filmCategory = ["Anime", "Hành động", "Giả tưởng", "Mecha"];
  const [categoryfilm, setCategoryFilm] = useState(filmCategory);
  // shcema
  const shcema = yup.object().shape({
    title: yup.string().required("Please enter film tilte"),
    description: yup.string().required("Please enter film description"),
    image: yup.string().required("Please enter image link"),
  });
  // form
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(shcema),
  });

  // useState
  const [open, setOpen] = useState(false);
  // function handle
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="film">
        <div className="film-img">
          <img src={film.image} alt={film.title} />
        </div>
        <div className="film-info">
          <div className="tilte">
            <TextField
              id="standard-basic"
              label="Title"
              value={film.title}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
          <div className="description">
            <TextField
              label="Descrition"
              multiline
              maxRows={4}
              value={film.description}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
          <div className="image-link">
            <TextField
              label="Image Link"
              value={film.image}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
          <FilmCategory categoryfilm={categoryfilm} setCategoryFilm={setCategoryFilm} />
          <div className="btn-edit-info-film">
            <Button variant="contained" onClick={handleClickOpen}>
              Edit Film Info
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Film</DialogTitle>
        <DialogContent>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <InputField name="title" form={form} label="Title" />
            <InputField
              label="Descrition"
              name="description"
              multiline
              maxRows={4}
              variant="standard"
              fullWidth
              form={form}
              margin="normal"
              spellCheck="false"
            />
            <InputField name="image" form={form} label="Image Link" />
            <DialogActions>
              <Button type="submit" color="warning">
                Edit
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

FilmInfo.propTypes = {};

export default FilmInfo;
