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
    border: 1px solid;
    width: 10px;
    height: 10px;
    ${ props =>  props.state && 'background-color: green' }
`;
CellStyled.defaultProps = {
    state: false
};

export default memo(CellStyled);