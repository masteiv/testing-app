import React, { type ChangeEvent } from 'react';
import InputRadio from 'shared/ui/InputRadio/InputRadio';

interface QuizQuestionProps {
    value: string;
    label: string;
    id: string;
    onAnswerChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const QuizQuestion = ({ value, label, id, onAnswerChangeHandler, name }: QuizQuestionProps) => {
    return <InputRadio value={value} label={label} id={id} name={name} onChange={onAnswerChangeHandler} />;
};

export default QuizQuestion;
