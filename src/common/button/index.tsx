import styled from "styled-components";
import { IButtonProps } from "./types";

export default styled.button<IButtonProps>`
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
                    background-color: #fff;
                `;
        }
    }}
`;