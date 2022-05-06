import { Button } from "@material-ui/core";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      color="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SelectButton;
