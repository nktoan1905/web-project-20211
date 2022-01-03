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
  const episodes = [
    {
      _id: "61c2ab96ab5c2f6940b5bf80",
      title: "1",
      epNum: 1,
      url: "https://www.youtube.com/watch?v=i4r0VbB94u0",
    },
    {
      _id: "61c2abc9ab5c2f6940b5c03b",
      title: "2",
      epNum: 2,
      url: "https://www.youtube.com/watch?v=lS17E55hoa4",
    },
    {
      _id: "61c2ab96ab5c2f6940b5bf80",
      title: "3",
      epNum: 3,
      url: "https://www.youtube.com/watch?v=i4r0VbB94u0",
    },
    {
      _id: "61c2abc9ab5c2f6940b5c03b",
      title: "4",
      epNum: 4,
      url: "https://www.youtube.com/watch?v=lS17E55hoa4",
    },
    {
      _id: "61c2ab96ab5c2f6940b5bf80",
      title: "5",
      epNum: 5,
      url: "https://www.youtube.com/watch?v=i4r0VbB94u0",
    },
    {
      _id: "61c2abc9ab5c2f6940b5c03b",
      title: "6",
      epNum: 6,
      url: "https://www.youtube.com/watch?v=lS17E55hoa4",
    },
    {
      _id: "61c2ab96ab5c2f6940b5bf80",
      title: "7",
      epNum: 7,
      url: "https://www.youtube.com/watch?v=i4r0VbB94u0",
    },
    {
      _id: "61c2abc9ab5c2f6940b5c03b",
      title: "8",
      epNum: 8,
      url: "https://www.youtube.com/watch?v=lS17E55hoa4",
    },
    {
      _id: "61c2ab96ab5c2f6940b5bf80",
      title: "9",
      epNum: 9,
      url: "https://www.youtube.com/watch?v=i4r0VbB94u0",
    },
    {
      _id: "61c2abc9ab5c2f6940b5c03b",
      title: "10",
      epNum: 10,
      url: "https://www.youtube.com/watch?v=lS17E55hoa4",
    },
    {
      _id: "61c2ab96ab5c2f6940b5bf80",
      title: "11",
      epNum: 11,
      url: "https://www.youtube.com/watch?v=i4r0VbB94u0",
    },
    {
      _id: "61c2abc9ab5c2f6940b5c03b",
      title: "12",
      epNum: 12,
      url: "https://www.youtube.com/watch?v=lS17E55hoa4",
    },
  ];
  const schema = yup.object().shape({
    title: yup.string().required("Please enter title"),
    url: yup
      .string()
      .required("Please enter real url")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
  });
  const form = useForm({
    defaultValues: {
      title: "",
      url: "",
    },
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    _id: "",
    title: "",
    epNum: 0,
    url: "",
  });
  const handleClickOpen = (value) => {
    setData(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values) => {
    const newEpisode = {
      title: values.title,
      epNum: episodes?.length + 1,
      url: values.url,
    };
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
          {episodes.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={"3px"}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleClickOpen(value)}
              >
                {value.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose} className={classes.main}>
        <DialogTitle
          className={classes.title}
        >{`Tập ${data.title}`}</DialogTitle>
        <DialogContent lassName={classes.content}>
          <ReactPlayer url={data.url} playIcon width={"100%"} />
          <FilmEpisodeFormEdit onSubmit={setData} episode={data} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
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
