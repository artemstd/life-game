import { Dispatch, FC, SetStateAction } from "react";
import { IGridProps } from "./grid/types";

export interface IGameProps {
    render: (props: ReturnType<UseGame>) => ReturnType<FC>
}

export type CheckNeighbor = (map: IGridProps['cellsMap'], x: number, y: number) => boolean;

export type UseGame = (initialSize?: number, isClosed?: boolean) => {
    size: number,
    setSize: Dispatch<SetStateAction<number>>,
    isRunning: boolean,
    setIsRunning: Dispatch<SetStateAction<boolean>>,
    isClosed: boolean,
    setIsClosed: Dispatch<SetStateAction<boolean>>,
    cellsMap: IGridProps['cellsMap'],
    toggleCellState: IGridProps['toggleCellState']
};