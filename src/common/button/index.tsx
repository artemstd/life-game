import styled from "styled-components";
import { IButtonProps } from "./types";

export default styled.button<IButtonProps>`
    border: none;
    padding: 4px 10px;
    border-radius: 3px;
    cursor: pointer;
    ${props => {
        switch(props.styleType) {
            case 'primary':
                return `
                    background-color: green;
                    color: #fff;
                `;
            case 'cancel':
                return `
                    background-color: red;
                    color: #fff;
                `;
            default:
                return `
                    background-color: #ccc;
                `;
        }
    }}
`;