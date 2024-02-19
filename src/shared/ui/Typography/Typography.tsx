import React, { type ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';

interface TypographyProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'p';
    className?: string;
    children: ReactNode;
}

export const Typography = ({ tag: Tag, className, children }: TypographyProps) => {
    const typographyClassNames = classNames({ [styles.typography]: true }, [className]);

    return <Tag className={typographyClassNames}>{children}</Tag>;
};
