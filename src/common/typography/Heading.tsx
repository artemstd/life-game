import { FC } from 'react';
import { IHeadingProps } from './types';

const Heading: FC<IHeadingProps> = ({ size, className, children }) => {
    const TagName = `h${size}` as keyof JSX.IntrinsicElements;
    return <TagName className={className}>{children}</TagName>
};

Heading.defaultProps = {
    size: 1
};

export default Heading;