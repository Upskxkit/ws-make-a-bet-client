import * as React from "react";
import styled from "styled-components";
import { Paper, PaperProps } from "@material-ui/core";

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  width: 100%;
  margin-top: 140px;
`;

export const PaperStyled = styled(({ isSticky, ...rest }) => (
  <Paper {...rest} />
))`
  flex-grow: 1;
  width: 100%;
  z-index: 10;
  top: 65px;
  position: fixed;
`;
