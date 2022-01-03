import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/form-controls/InputFIelds";
import PasswordField from "../../../components/form-controls/PasswordField";


const useSyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "20px",
    display: "block",
    width: "600px",
    height: "350px",
    margin: "100px auto 0 auto",
    backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
    border: "1px solid #333",
    borderRadius:"5px"
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: "pink",
  },
  title: {
    margin: "14px 0 18px 0",
    textAlign: "center",
  },
  submit: {
    margin: "14px 0 7px 0",
    float:"right"
  },
  progress: {
    position: "absolute",
    top: "5px",
    left: "0",
    right: "0",
  }
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useSyles();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .required("Please enter your password")

  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }

    form.reset();
  };

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}

        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;