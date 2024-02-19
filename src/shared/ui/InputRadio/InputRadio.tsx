import React, { type ChangeEvent } from 'react';
import classNames from 'classnames';

import styles from './InputRadio.module.scss';

interface InputRadioProps {
    id: string;
    name?: string;
    value: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputRadio = ({ id, name = '', value, label, onChange, className }: InputRadioProps) => {
    const wrapperInputRadioClassNames = classNames(
        {
            [styles.wrapper]: true,
        },
        [classNames],
    );

    return (
        <div className={wrapperInputRadioClassNames}>
            <input type="radio" id={id} name={name} value={value} readOnly onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default InputRadio;
