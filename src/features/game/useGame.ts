import { useCallback, useEffect, useRef, useState } from 'react';
import produce from "immer";
import { IGridProps } from "./grid/types";
import { CheckNeighbor, UseGame } from './types';

const buildMap = (size: number) => Array.from(Array(size), () => Array(size).fill(false));

const neighborsPositions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
];

const checkNeighborForLimitGrid: CheckNeighbor = (map, x, y) => map[x]?.[y];

const checkNeighborForClosedGrid: CheckNeighbor = (map, x, y) => {
    if ( typeof map[x] === "undefined" ) {
        x = (x < 0) ? (map.length - 1) : 0;
    }
    if ( typeof map[x][y]  === "undefined" ) {
        y = (y < 0) ? (map[x].length - 1) : 0;
    }
    return map[x][y];
};

const useGame: UseGame = (initialSize = 50) => {
    const [ size, setSize ] = useState<number>(initialSize);
    const [ isRunning, setIsRunning ] = useState<boolean>(false);
    const [ isClosed, setIsClosed ] = useState<boolean>(false);
    const [ cellsMap, setCellsMap ] = useState<IGridProps['cellsMap']>(() => buildMap(size));
    const toggleCellState = useCallback<IGridProps['toggleCellState']>((x, y, state) => {
        setCellsMap(prevValue => produce(prevValue, nextValue => {
            nextValue[x][y] = typeof state === "undefined" ? !nextValue[x][y] : state;
        }))
    }, []);
    const run = useCallback(() => {
        const checkNeighbor = isClosed ? checkNeighborForClosedGrid : checkNeighborForLimitGrid;
        setCellsMap(prevValue => produce(prevValue, nextValue => {
            let x, y, pos, countNeighbors;
            for (x = 0; x < nextValue.length; x++) {
                for (y = 0; y < nextValue[x].length; y++) {
                    countNeighbors = 0;
                    for (pos of neighborsPositions) {
                        if ( checkNeighbor(prevValue, x+pos[0], y+pos[1]) ) {
                            countNeighbors++;
                        }
                        if ( countNeighbors > 3 ) {
                            break;
                        }
                    }

                    if ( !nextValue[x][y] && countNeighbors === 3 ) {
                        nextValue[x][y] = true;
                    } else if ( nextValue[x][y] && ( countNeighbors < 2 || countNeighbors > 3 ) ) {
                        nextValue[x][y] = false;
                    }
                }
            }
        }));
    }, [isClosed]);
    const isMountRef = useRef(false);

    useEffect(() => {
        if (isMountRef.current) {
            setCellsMap(buildMap(size));
        } else {
            isMountRef.current = true;
        }
    }, [size]);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const tid = setInterval(run, 100);

        return () => clearInterval(tid);
    }, [isRunning, run]);

    return {
        size, setSize,
        isRunning, setIsRunning,
        isClosed, setIsClosed,
        cellsMap, setCellsMap,
        toggleCellState
    }
};

export default useGame;