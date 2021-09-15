import Game from './features/game/Default';
import Grid from './features/game/grid/Default';
import Button from "./common/button";
import Input from "./common/input";

const App = () => {
    return <Game render={
        ({ isRunning, setIsRunning, isClosed, setIsClosed, size, setSize, cellsMap, toggleCellState }) => 
        <>
            <Button styleType={ isRunning ? "cancel" : "primary" } onClick={ () => setIsRunning(prevValue => !prevValue) }>{ isRunning ? "Stop" : "Start" }</Button>
            <Button onClick={ () => setIsClosed(prevValue => !prevValue) }>{ isClosed ? "Switch to limit grid" : "Switch to closed grid" }</Button>
            <Input type="number" value={ size } onChange={ (e) => setSize(parseInt(e.target.value)) } />
            <Grid cellsMap={ cellsMap } toggleCellState={ toggleCellState } />
        </>
    } />;
};

export default App;