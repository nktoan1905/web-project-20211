import React, { Fragment } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <LoginForm onSubmit={handleFormSubmit} />
    </Fragment>
  );
};

export default Login;
