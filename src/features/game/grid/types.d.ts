import { ComponentType } from "react";
import { ICellProps } from "../cell/types";

// Field types
export interface IGridProps {
    cellsMap: boolean[][],
    toggleCellState: (x: number, y: number, state?: boolean) => void,
    CellComponent?: ComponentType<ICellProps>,
    className?: string
};