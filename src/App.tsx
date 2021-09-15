import { FC } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import styled from 'styled-components';
import Heading from './common/typography/Heading';
import IndexPage from './pages';
import { IAppProps } from './types';

const App:FC<IAppProps> = ({ className }) => {
    return <div className={ className }>
        <BrowserRouter>
            <Heading size={1}>Conway's Game of Life</Heading>
            <Switch>
                <Route exact path="/" render={ IndexPage } />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    </div>
};

const AppStyled = styled(App)`
    h1 {
        text-align: center;
    }
`;

export default AppStyled;