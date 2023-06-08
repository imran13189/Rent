import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InlineEditForm from './InlineEditForm';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const FormToolTip = ({ contactStatus }) => {
  
  return (
    <>
      <HtmlTooltip title={<InlineEditForm></InlineEditForm>} placement="top" arrow>
        <span>{contactStatus}</span>
      </HtmlTooltip>
    </>
  );
};

export default FormToolTip;
