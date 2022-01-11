import React,{useState} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form-controls/InputFIelds";
import { Button, Box, Typography } from "@mui/material";
import { apiUrl } from "../../Constants/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FilmEpisodeFormEdit = (props) => {
  let navigate = useNavigate()
  const data = props.episode
  const { onSubmit,setOpen,filmId } = props;
  const [ep,setEp] = useState(data)
  const schema = yup.object().shape({
    title: yup.string(),
    url: yup
      .string()
      .matches(
        /(ftp|http|https|):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        "Enter correct url!"
      ),
  });
  const form = useForm({
    defaultValues: {
      title: ep.title,
      url: ep.url,
    },
    resolver: yupResolver(schema),
  });

  const updateEpisode = async(updatedEpisode) =>{
    try {
      const response = await axios.put(`${apiUrl}/films/episode/${ep._id}`,updatedEpisode)
      if(response.data.success){
        setEp(response.data.episode)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = (values) => {
    
    onSubmit(values);
    console.log(values);
    updateEpisode({...values,epNum:ep.epNum})
    form.reset(values);
    navigate(`/films`)
    navigate(`/films/${filmId}`)
    setOpen(false)
  };
  return (
    <Box
      sx={{
        boxShadow: 0,
        bgcolor: "background.paper",
        m: 1,
        p: 1,
      }}
    >
      <Typography variant="h5" component="h6" textAlign={"center"} color={"#FA8072"}>
        Edit Episode
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="title" form={form} label="Title" />
        <InputField name="url" form={form} label="URL" />
        <Button variant="contained" type="submit" color="warning">
          Edit
        </Button>
      </form>
    </Box>
  );
};

export default FilmEpisodeFormEdit;
