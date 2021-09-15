import { HTMLAttributes } from 'react';

export interface IHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    size?: 1 | 2 | 3 | 4 | 5 | 6
};