import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React, { Fragment, useState ,useEffect} from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-controls/InputFIelds";
import "./styles.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogFilter from "../FIlmFilters/DialogFilter";
import {apiUrl} from '../../../Constants/constants'
import axios from "axios";
const useStyles = makeStyles({
  root: {},
});

const FilmInfo = (props) => {
  const { film } = props;
  const [anime,setAnime] = useState(film)
  // shcema
  const shcema = yup.object().shape({
    title: yup.string().required("Please enter film tilte"),
    description: yup.string().required("Please enter film description"),
    image: yup.string().required("Please enter image link"),
  });
  // form
  const form = useForm({
    defaultValues: {
      title: anime.title,
      description: anime.description,
      image: anime.image,
      year:anime.year,
      numOfep:anime.numOfep
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
  

  const updateFilm = async updatedfilm => {
		try {
			const response = await axios.put(`${apiUrl}/films/${anime._id}`,updatedfilm)
			if (response.data.success) {
        
				setAnime(response.data.film)
        
			}
		}catch (error) {
      console.log(error);
    }
	}

  const handleSubmitForm = (values) => {
    updateFilm(values);
    form.reset(values)
    setOpen(false)
  };

  return (
    <>
      <div className="film">
        <div className="film-img">
          <img src={anime.image} alt={anime.title} />
        </div>
        <div className="film-info">
          <div className="tilte">
            <TextField
              id="standard-basic"
              label="Title"
              value={anime.title}
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
              value={anime.description}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
          <div className="image-link">
            <TextField
              label="Image Link"
              value={anime.image}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
          <div className="">
            <TextField
              label="Năm sản xuất"
              value={anime.year}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
          <div className="">
            <TextField
              label="Số tập"
              value={anime.numOfep}
              variant="standard"
              fullWidth
              margin="normal"
              spellCheck="false"
            />
          </div>
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
            <InputField name="year" form={form} label="Năm sản xuất" />
            <InputField name="numOfep" form={form} label="Số tập" />
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
