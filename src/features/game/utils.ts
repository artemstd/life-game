import { IGridProps } from "./grid/types";

/**
 * Генерация новой сетки со случайным заполнением
 * @param cellsMap 
 * @returns
 */
export const generateRandomCellsMap = (cellsMap: IGridProps['cellsMap']): IGridProps['cellsMap'] => {
    const newCellsMap: typeof cellsMap = [];
    let x, y;
    for (x = 0; x < cellsMap.length; x++) {
        newCellsMap.push([]);
        for (y = 0; y < cellsMap[x].length; y++) {
            newCellsMap[x].push(!Math.floor(Math.random() * 4))
        }
    }
    return newCellsMap;
}