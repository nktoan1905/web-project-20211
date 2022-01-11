import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {},
  opacity0: {},
  groupCheckBox: {
    margin: "5px 0",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
    borderBottom: "1px solid black",
  },
  actions: {
    borderTop: "1px solid black",
  },
});
const DialogFilter = (props) => {
  const {
    handleClose,
    handleAddFiltersCategory,
    title,
    filters,
    setFilters,
    content,
    open,
  } = props;
  console.log(filters);
  // style
  const classes = useStyles();
  // state
  const [Checked, setChecked] = useState(filters);
  const [exitDialog, setExitDialog] = useState(false);
  let newChecked;
  // function
  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleAddFilter = () => {
    if (handleAddFiltersCategory) handleAddFiltersCategory(Checked);
  };
  const handleClickClear = () => {
    setChecked([]);
    setFilters([]);
  };
  // api
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent>
        <FormGroup className={classes.groupCheckBox}>
          {content.map((value, index) => (
            <FormControlLabel
              key={index}
              className={classes.checkBoxItem}
              control={
                <Checkbox
                  checked={Checked.indexOf(value._id) === -1 ? false : true}
                  onChange={() => handleToggle(value._id)}
                  color={
                    Checked.indexOf(value._id) === -1 ? "primary" : "error"
                  }
                />
              }
              label={
                <Button
                  onClick={() => handleToggle(value._id)}
                  color={
                    Checked.indexOf(value._id) === -1 ? "primary" : "error"
                  }
                  fullWidth
                >
                  {value.name}
                </Button>
              }
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="outlined" onClick={handleAddFilter}>
          Add
        </Button>
        <Button onClick={handleClickClear} color="error">
          Clear
        </Button>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogFilter.propTypes = {
  content: PropTypes.array,
};

export default DialogFilter;
