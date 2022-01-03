import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/form-controls/InputFIelds";

const useStyles = makeStyles({
  root: {},
  categoryList: {
    position: "relative",
  },

  categoryItem: {
    position: "relative",
  },
  iconDelete: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    background: "#3333",
    borderRadius: "7px",
  },
  btn: {
    cursor: "context-menu",
  },
  btnAdd: {
    float: "right",
    marginTop: "14px",
    marginRight: "-8px",
  },
});

const CategoryList = () => {
  const classes = useStyles();
  const categoryList = [
    {
      _id: "Hành động",
      name: "Hành động",
    },
    {
      _id: "Hài hước",
      name: "Hài hước",
    },
    {
      _id: "Tình cảm",
      name: "Tình cảm",
    },
    {
      _id: "Harem",
      name: "Harem",
    },
    {
      _id: "Bí ẩn",
      name: "Bí ẩn",
    },
    {
      _id: "Giả tưởng",
      name: "Giả tưởng",
    },
    {
      _id: "Học đường",
      name: "Học đường",
    },
    {
      _id: "Đời thường",
      name: "Đời thường",
    },
  ];
  const [category, setCategory] = useState(categoryList);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onDelete = (value) => {
    console.log(value);
  };
  const shcema = yup.object().shape({
    categoryName: yup.string().required("Please enter new Category Name."),
  });
  const form = useForm({
    defaultValues: {
      categoryName: "",
    },
    resolver: yupResolver(shcema),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box
      sx={{
        boxShadow: 3,
        bgcolor: "background.paper",
        m: 1,
        p: 1,
      }}
    >
      <Grid container className={classes.categoryList}>
        {category.map((value, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={index}
            padding={"3px"}
            className={classes.categoryItem}
          >
            <Button variant="outlined" fullWidth className={classes.btn}>
              {value.name}
            </Button>
            <ClearIcon
              className={classes.iconDelete}
              sx={{ color: "red" }}
              onClick={() => onDelete(value)}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        className={classes.btnAdd}
        onClick={handleClickOpen}
      >
        Add category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add category</DialogTitle>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogContent>
            <InputField name="categoryName" label="Category" form={form} />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
