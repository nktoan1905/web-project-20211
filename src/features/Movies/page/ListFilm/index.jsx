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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../../components/form-controls/InputFIelds";
import FilmFilters from "../../components/FIlmFilters";
import FilmList from "../../components/FilmList";
import FilmSearch from "../../components/FilmSearch/FilmSearch";
import FilmSkeleton from "../../components/FilmSkeleton";
import AddIcon from '@mui/icons-material/Add';
import "./styles.css";

const ListFilmPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(12);
  const films = [
    {
      id: 1,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 2,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 3,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 4,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 5,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 6,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 7,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 8,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 9,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 10,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 11,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 12,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 13,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 14,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 15,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 16,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 17,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 18,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 19,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 20,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 21,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 22,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 23,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 24,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 25,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 26,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
    {
      id: 27,
      title: "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
      image: "https://animehay.club/upload/poster/3353-1633233301.jpg",
      point: 3.6,
    },
  ];
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const [open, setOpen] = React.useState(false);

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
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  const [filters, setFilters] = useState([]);
  return (
    <Box>
      <Grid container>
        <Grid item className="left-lf">
          <FilmSearch />
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
