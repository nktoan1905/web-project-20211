import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactPlayer from "react-player";
import InputField from "../../../../components/form-controls/InputFIelds";
import FilmEpisodeFormEdit from "../FilmEpisodeFormEdit";
import { apiUrl } from "../../../Constants/constants";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    display: "inline-flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  formGroup: {
    display: "block",
    width: "40%",
    height: "100%",
    border: "1px solid #333",
    borderRadius: "5px",
    padding: "10px",
    position: "relative",
  },
  containerListEpisodes: {},
  title: {
    color: "#6495ED",
  },
  listEpisodes: {
    width: "100%",
  },
  btnCreateEpisode: {
    textTransform: "none",
    float: "right",
  },
});

const FilmEpisodes = (props) => {
  const classes = useStyles();
  const episodes = props.episodes
  const filmId = props.filmId
  const schema = yup.object().shape({
    title: yup.string().required("Please enter title"),
    url: yup
      .string()
      .required("Please enter real url")
      .matches(
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        "Enter correct url!"
      ),
  });
  const [episode,setEpisode] = useState(episodes)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    _id: "",
    title: "",
    epNum: 0,
    url: "",
  });

  const addEpisode = async newEpisode => {
		try {
			const response = await axios.post(`${apiUrl}/films/byId/${filmId}`, newEpisode)
			if (response.data.success) {
				setEpisode([...episode,response.data.episode])
			}
		} catch (error) {
      console.log(error)
		}
	}

  const form = useForm({
    defaultValues: {
      title: data.title,
      url: data.url,
    },
    resolver: yupResolver(schema),
  });
  const handleClickOpen = (value) => {
    setData(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEpisode = async(id)=>{
    try {
      const response = await axios.delete(`${apiUrl}/films/episode/${id}`)
			if (response.data.success) {
				setEpisode(episode.filter(ep => ep._id !== id))
			}
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit = (values) => {
    const newEpisode = {
      title: values.title,
      epNum: episodes?.length + 1,
      url: values.url,
    };
    addEpisode(newEpisode)
    console.log(newEpisode);
    form.reset();
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        className={classes.formGroup}
        sx={{
          boxShadow: 3,
          bgcolor: "background.paper",
          m: 1,
          p: 1,
        }}
      >
        <Typography
          component="h3"
          variant="h5"
          className={classes.title}
          textAlign={"center"}
        >
          Create New Episodes
        </Typography>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={classes.form}
        >
          <InputField name="title" label="Title" form={form} />
          <TextField
            label="Episode Number"
            value={episodes.length + 1}
            margin="normal"
            fullWidth
          />
          <InputField name="url" label="URL" form={form} />

          <Button
            variant="contained"
            type="submit"
            className={classes.btnCreateEpisode}
          >
            Create New Episode
          </Button>
        </form>
      </Grid>
      <Box className={classes.containerListEpisodes}>
        <Typography
          component="h3"
          variant="h5"
          className={classes.title}
          textAlign={"center"}
        >
          List Episodes
        </Typography>
        <Grid container className={classes.listEpisodes}>
          {episode.map((value, index) => (
            <Grid key={value._id} item xs={12} sm={6} md={4} lg={3} key={index} padding={"3px"}>
              <Button
                sx={{mr:10}}
                variant="outlined"
                fullWidth
                onClick={() => handleClickOpen(value)}
              >
                {value.epNum}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose} className={classes.main}>
        <DialogTitle
          className={classes.title}
        >{`Tập ${data.title}`}</DialogTitle>
        <DialogContent className={classes.content}>
          <ReactPlayer url={data.url} playIcon width={"100%"} />
          <FilmEpisodeFormEdit filmId={filmId} setOpen={setOpen} onSubmit={setData} episode={data}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>deleteEpisode(data._id)} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

FilmEpisodes.propTypes = {};

export default FilmEpisodes;
