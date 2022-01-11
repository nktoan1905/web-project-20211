import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, LinearProgress, Typography,Alert ,Collapse} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React,{useContext,useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/form-controls/InputFIelds";
import PasswordField from "../../../components/form-controls/PasswordField";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";


const useSyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    display: "block",
    width: 'calc(100% - 300px)',
    height: "320px",
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
  let navigate = useNavigate()
  const {loginUser} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const login = async (loginForm)=>{
    try{
        const loginData = await loginUser(loginForm)
        if(loginData.success){
            navigate('/films')
        }else{
            setOpen(true)
            setTimeout(()=>setOpen(false),3000)
        }
    }catch(error){
        console.log(error)
    }
}

  const classes = useSyles();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Please enter your password")

  });
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
      login(values);
    }

    form.reset();
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert severity="error">Sai tài khoảng hoặc mật khẩu</Alert>
      </Collapse>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <InputField name="username" label="Username" form={form} />
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