import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form-controls/InputFIelds";
import { Button, Box, Typography } from "@mui/material";

const FilmEpisodeFormEdit = (props) => {
  const data = props.episode
  const schema = yup.object().shape({
    title: yup.string(),
    url: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
  });
  const form = useForm({
    defaultValues: {
      title: data.title,
      url: data.url,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) onSubmit(values);
    console.log(values);
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
