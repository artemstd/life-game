import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export default styled.input<InputHTMLAttributes<HTMLInputElement>>`
    border: 1px solid;
    border-radius: 2px;
`;