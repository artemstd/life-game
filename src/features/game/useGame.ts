import { useCallback, useEffect, useRef, useState } from 'react';
import produce from "immer";
import { IGridProps } from "./grid/types";
import { CheckAliveCell, UseGame } from './types';

/**
 * Массив с позициями всех возможных соседних ячеек в сетке
 */
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

/**
 * Построить сетку с мертвыми ячейками по заданному размеру
 * @param size 
 * @returns 
 */
const buildMap = (size: number) => Array(size).fill(Array(size).fill(false));

/**
 * Проверить жива ли ячейка в ограниченной сетке
 * @param map 
 * @param x 
 * @param y 
 * @returns 
 */
const checkAliveCellForLimitGrid: CheckAliveCell = (map, x, y) => map[x]?.[y];

/**
 * Проверить жива ли ячейка в замкнутой сетке
 * @param map 
 * @param x 
 * @param y 
 * @returns 
 */
const checkAliveCellForClosedGrid: CheckAliveCell = (map, x, y) => {
    if ( typeof map[x] === "undefined" ) {
        x = (x < 0) ? (map.length - 1) : 0;
    }
    if ( typeof map[x][y]  === "undefined" ) {
        y = (y < 0) ? (map[x].length - 1) : 0;
    }
    return map[x][y];
};

/**
 * Интерфейс игры
 * @param initialSize 
 * @returns 
 */
const useGame: UseGame = (initialSize = 50) => {
    // размер сетки
    const [ size, setSize ] = useState<number>(initialSize);
    // флаг включения авто хода
    const [ isRunning, setIsRunning ] = useState<boolean>(false);
    // флаг включения замкнутой сетки
    const [ isClosed, setIsClosed ] = useState<boolean>(false);
    // 2d массив сетки
    const [ cellsMap, setCellsMap ] = useState<IGridProps['cellsMap']>(() => buildMap(size));
    // смена значения в ячейке
    const toggleCellState = useCallback<IGridProps['toggleCellState']>((x, y, state) => {
        setCellsMap(prevValue => produce(prevValue, nextValue => {
            nextValue[x][y] = typeof state === "undefined" ? !nextValue[x][y] : state;
        }))
    }, []);
    // следующий ход
    const run = useCallback(() => {
        const checkNeighbor = isClosed ? checkAliveCellForClosedGrid : checkAliveCellForLimitGrid;
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
    // сброс всех ячеек на мертвые и остановка авто хода
    const reset = useCallback(() => {
        setIsRunning(false);
        setCellsMap(buildMap(size));
    }, [size]);
    const isMountRef = useRef(false);

    useEffect(() => {
        if (isMountRef.current) {
            reset();
        } else {
            isMountRef.current = true;
        }
    }, [reset]);

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
        run,
        reset,
        toggleCellState
    }
};

export default useGame;