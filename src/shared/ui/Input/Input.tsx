import { type ChangeEvent, type InputHTMLAttributes, memo } from 'react';

import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    value: string;
    onChange: (value: string) => void;
}

// eslint-disable-next-line react/display-name
const Input = memo(({ onChange, value }: InputProps) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };

    return <input className={styles.input} onChange={onChangeHandler} value={value} />;
});

export default Input;
