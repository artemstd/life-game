import { FC } from "react";
import useGame from "./useGame";
import { IGameProps } from "./types";

const Game:FC<IGameProps> = ({ render }) => {
    return render(useGame());
};

export default Game;