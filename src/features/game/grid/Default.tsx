import { FC, lazy, memo, Suspense } from "react";
import styled from "styled-components";
import { IGridProps } from "./types";

// компонент ячейки по умолчанию
const CellDefault = lazy(() => import('../cell/Default'));

export const Grid:FC<IGridProps> = ({ cellsMap, toggleCellState, className, CellComponent }) => {
    // если компонент ячейки не передан, подгружаем по умолчанию компонент
    const Cell = CellComponent || CellDefault;
    const cells = []; 
    let x, y;
    for (x = 0; x < cellsMap.length; x++) {
        for (y = 0; y < cellsMap[x].length; y++) {
            cells.push(
                <Cell key={ `${x}_${y}` } x={ x } y={ y } toggleCellState={ toggleCellState } state={ cellsMap[x][y] } />
            );
        }    
    }

    return  <Suspense fallback>
        <div className={ className }>
            { cells }
        </div>
    </Suspense>;
}

export const GridStyled = styled(Grid)`
    display: grid;
    ${props => `
        grid-template-columns: repeat(${props.cellsMap[0]?.length || 0}, max-content);
        grid-template-rows: repeat(${props.cellsMap.length}, max-content);
    `}
    grid-gap: 1px;
    border: 1px solid black;
    background-color: black;
`;

export default memo<typeof Grid>(GridStyled);