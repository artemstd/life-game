import { FC, memo, MouseEventHandler, useCallback } from "react";
import styled from "styled-components";
import { ICellProps } from "./types";

export const Cell:FC<ICellProps> = ({ x, y, toggleCellState, className }) => {
    const onToggleState = useCallback<MouseEventHandler>(() => {
        toggleCellState(x, y);
    }, [toggleCellState, x, y]);
    return <div onClick={ onToggleState } className={ className } />;
}

export const CellStyled = styled(Cell)`
    ${ props =>  `
        ${props.state
            ? 'background-color: green'
            : `
                background-color: white;
                &:hover {
                    background-color: grey;
                }
            `};
        width: ${props.size}px;
        height: ${props.size}px;
    ` }
`;
CellStyled.defaultProps = {
    state: false,
    size: 10
};

export default memo<typeof Cell>(CellStyled);