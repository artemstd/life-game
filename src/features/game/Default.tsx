import { FC } from "react";
import useGame from "./useGame";
import { IGameProps } from "./types";

const Game:FC<IGameProps> = ({ render }) => {
    const { size, setSize, isRunning, setIsRunning, cellsMap, toggleCellState, isClosed, setIsClosed } = useGame();

    return render({
        size, setSize, isRunning, setIsRunning, cellsMap, toggleCellState, isClosed, setIsClosed
    });
};

export default Game;