import { IGridProps } from "../grid/types";

// Cell types
export type ICellProps = Pick<IGridProps, 'toggleCellState'> & {
    x: number,
    y: number,
    className?: string,
    state?: boolean
};