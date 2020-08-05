import styled from "styled-components";
import { Badge, Tooltip } from "@material-ui/core";
import colors from "../../constants/colors";
import { BREAKPOINT } from "../../constants";

export const NavBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  top: 0;
  z-index: 2;
  position: fixed;
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
  max-width: ${BREAKPOINT};
`;

export const Logo = styled.img`
  height: 50px;
`;
