import Game from '../features/game/Default';
import Grid from '../features/game/grid/Default';
import Button from "../common/button";
import styled from 'styled-components';
import { generateRandomCellsMap } from '../features/game/utils';

const fieldSizes = [ 30, 50, 70 ];

const GameWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .index_controls {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        ${Button} {
            margin: 0 5px;
        }
        .index_controls_sizes {
            margin-left: 20px;
        }
    }
`;

const Index = () => {
    return <Game render={
        ({ isRunning, setIsRunning, isClosed, setIsClosed, size, setSize, cellsMap, setCellsMap, run, reset, toggleCellState }) => 
            <GameWrap>
                { /* блок управления */ }
                <div className="index_controls">
                    <Button styleType={ isRunning ? "cancel" : "primary" } onClick={ () => setIsRunning(prevValue => !prevValue) }>{ isRunning ? "Stop" : "Start" }</Button>
                    <Button onClick={ reset }>Reset</Button>
                    <Button onClick={ () => setCellsMap(prevValue => generateRandomCellsMap(prevValue)) }>Random</Button>
                    <Button onClick={ run }>Step</Button>
                    <Button styleType={ isClosed ? "cancel" : "primary" } onClick={ () => setIsClosed(prevValue => !prevValue) }>{ isClosed ? "Disable closed grid" : "Enable closed grid" }</Button>
                    <div className="index_controls_sizes">
                        Sizes:
                        { fieldSizes.map(s => <Button key={ s } styleType={ size === s ? "primary" : "default" } onClick={ () => setSize(s) }>{s}</Button>) }
                    </div>
                </div>
                { /* сетка с игрой */ }
                <Grid cellsMap={ cellsMap } toggleCellState={ toggleCellState } />
            </GameWrap>
    } />;
};

export default Index;