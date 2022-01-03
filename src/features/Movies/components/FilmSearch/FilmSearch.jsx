import React from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import "./styles.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import InputField from "../../../../components/form-controls/InputFIelds";

const FilmSearch = (props) => {
  const shcema = yup.object().shape({
    title: yup.string().required("Please enter film name."),
  });
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(shcema),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="form-search">
      <InputField name="title" label="Title" form={form} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="btn-submit"
        style={{textTransform: "none"}}
      >
        <SearchIcon></SearchIcon>
        Search
      </Button>
    </form>
  );
};

FilmSearch.propTypes = {};

export default FilmSearch;
