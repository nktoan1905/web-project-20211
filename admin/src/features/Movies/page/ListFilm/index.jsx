import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Pagination,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../../components/form-controls/InputFIelds";
import FilmFilters from "../../components/FIlmFilters";
import FilmList from "../../components/FilmList";
import FilmSearch from "../../components/FilmSearch/FilmSearch";
import FilmSkeleton from "../../components/FilmSkeleton";
import AddIcon from '@mui/icons-material/Add';
import {apiUrl} from '../../../Constants/constants'
import axios from 'axios'
import "./styles.css";

const ListFilmPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(12);
  const [films,setFilms] = useState([]);

  const addFilm = async newfilm => {
		try {
			const response = await axios.post(`${apiUrl}/films`, newfilm)
			if (response.data.success) {
				setFilms([...films,response.data.film]) 
				
			}
		} catch (error) {
      console.log(error)
		}
	}

  const getFilms = async () => {
		try {
			const response = await axios.get(`${apiUrl}/films`)
			if (response.data.success) {
				setFilms(response.data.films)
        setLoading(false)
			}
		} catch (error) {
			
		}
	}
  useEffect(() => {
    getFilms()
  }, [])
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const schema = yup.object().shape({
    title: yup.string().required("Please enter title"),
    description: yup.string().required("Please enter description"),
    image: yup
      .string()
      .required("Please enter image link")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
  });
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      year:"",
      numOfep:"",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    console.log(values);
    addFilm(values);
    setOpen(false);
  };
  const [filters, setFilters] = useState([]);
  return (
    <Box>
      <Grid container>
        <Grid item className="left-lf">
          <FilmSearch placeholder="Nhập từ khóa..." data={films}/>
          <FilmFilters filters={filters} setFilters={setFilters} />
          <Button
            variant="outlined"
            style={{ margin: "3px", textTransform: "none" }}
            onClick={handleClickOpen}
          >
           <AddIcon></AddIcon> Create New Film
          </Button>
        </Grid>
        <Grid
          item
          className="right-lf"
          style={{ transition: "height 0.2s ease-in" }}
        >
          <Paper elevation={3}>
            {loading ? (
              <FilmSkeleton length={20} />
            ) : (
              <FilmList films={currentFilms} />
            )}
            <Box className="pagination">
              <Pagination
                count={Math.ceil(films.length / filmsPerPage)}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "700",
            color: "red",
          }}
        >
          New Film
        </DialogTitle>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogContent>
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
            <InputField type="number" name="year" form={form} label="Year" />
            <InputField type="number" name="numOfep" form={form} label="Number of episode" />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="secondary">
              Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ListFilmPage;
