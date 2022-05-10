import { Button } from "@material-ui/core";
import React from "react";
import WindowDimension from "../config/windowDimensions";

const SelectButton = ({ children, selected, onClick }) => {
  const { x } = WindowDimension();
  return (
    <Button
      size={x < 500 ? "small" : "large"}
      variant={selected ? "contained" : "outlined"}
      color="primary"
      onClick={onClick}
      style={{
        borderRadius: 12,
        marginBottom: 30,
      }}
    >
      {children}
    </Button>
  );
};

export default SelectButton;
