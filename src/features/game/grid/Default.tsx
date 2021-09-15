import { FC, lazy, memo, Suspense } from "react";
import styled from "styled-components";
import { IGridProps } from "./types";

const CellDefault = lazy(() => import('../cell/Default'));

export const Grid:FC<IGridProps> = ({ cellsMap, toggleCellState, className, CellComponent }) => {
    const Cell = CellComponent || CellDefault;
    const cells = cellsMap.map(
        (row, x) => row.map(
            (state, y) => <Cell key={ `${x}_${y}` } x={ x } y={ y } toggleCellState={ toggleCellState } state={ state } />
        )
    );

    return <div className={ className }>
        <Suspense fallback>
            { cells }
        </Suspense>
    </div>;
}

export const GridStyled = styled(Grid)`
    display: grid;
    grid-template-columns: repeat(${props => props.cellsMap[0].length}, max-content);
    grid-template-rows: repeat(${props => props.cellsMap.length}, max-content);
    grid-gap: 1px;
`;

export default memo(GridStyled);