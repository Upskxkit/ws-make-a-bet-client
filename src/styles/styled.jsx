import styled, { css } from "styled-components";

export const AppStyled = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  min-height: 100%;
  font-family: "Roboto";
  position: relative;
  box-sizing: border-box;
`;

export const Flex = styled.div`
  display: flex;

  ${({ flex }) =>
    flex &&
    css`
      flex: ${flex};
    `}
  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: wrap;
    `}
  ${({ justifyBetween }) =>
    justifyBetween &&
    css`
      justify-content: space-between;
    `}
  ${({ justifyCenter }) =>
    justifyCenter &&
    css`
      justify-content: center;
    `}
  ${({ justifyEvenly }) =>
    justifyEvenly &&
    css`
      justify-content: space-evenly;
    `}
  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `}
  ${({ alignStart }) =>
    alignStart &&
    css`
      align-items: flex-start;
    `}
  ${({ alignEnd }) =>
    alignEnd &&
    css`
      align-items: flex-end;
    `}
  ${({ alignBaseline }) =>
    alignBaseline &&
    css`
      align-items: baseline;
    `}
  ${({ flexStart }) =>
    flexStart &&
    css`
      justify-content: flex-start;
    `}
  ${({ flexEnd }) =>
    flexEnd &&
    css`
      justify-content: flex-end;
    `}
  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}
`;
