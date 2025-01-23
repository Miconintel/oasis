import styled from "styled-components";
import { css } from "styled-components";

const h1 = (props) =>
  props.type === "h1" &&
  css`
    font-size: 3rem;
    font-weight: 600;
  `;

const h2 = (props) =>
  props.type === "h2" &&
  css`
    font-size: 2rem;
    font-weight: 600;
  `;

const h3 = (props) =>
  props.type === "h3" &&
  css`
    font-size: 2rem;
    font-weight: 500;
  `;

const h4 = (props) =>
  props.type === "h4" &&
  css`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
  `;

const Heading = styled.h1`
  ${(props) => h1(props)}
  ${(props) => h2(props)}
  ${(props) => h3(props)}
  ${(props) => h4(props)}
  line-height: 1.4;
`;

export default Heading;
