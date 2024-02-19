import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';
export enum ButtonTheme {
    MAIN = 'main',
    SECOND = 'second',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    children: ReactNode;
}

export const Button = ({
    className,
    theme = ButtonTheme.MAIN,
    children,
    type = 'button',
    onClick,
    disabled,
}: ButtonProps) => {
    const classNamesBtn = classNames(
        {
            [styles.button]: true,
            [styles[theme]]: true,
            [styles.disabled]: disabled,
        },
        [className],
    );

    return (
        <button className={classNamesBtn} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
