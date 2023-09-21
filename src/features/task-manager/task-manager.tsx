import React, {useState} from "react";
import { useEvent, useStore } from "effector-react";
import {
    $state,
    $inputFields,
    addTask,
    deleteTask,
    touchTask,
    changeLabel,
    changeDescription
} from "./model";
import { createId } from "./utils";

export const TaskManager: React.FC = () => {
    const state = useStore($state);
    const addTaskFn = useEvent(addTask);
    const touchTaskFn = useEvent(touchTask);
    const deleteTaskFn = useEvent(deleteTask);

    const { label, description, done } = useStore($inputFields);
    const changeLabelFn = useEvent(changeLabel);
    const changeDescriptionFn = useEvent(changeDescription);

    const newTask = {
        id: createId(state),
        label,
        description,
        done
    };

    const [validationFailed, setValidationFailed] = useState(false)

    const onInputLabel = (event: React.FormEvent<HTMLInputElement>) => changeLabelFn(event.currentTarget.value);
    const onInputDescription = (event: React.FormEvent<HTMLInputElement>) => changeDescriptionFn(event.currentTarget.value);
    const onClickAdd = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (label) {
            setValidationFailed(false);
            addTaskFn(newTask)
            changeLabelFn('');
            changeDescriptionFn('');
        } else {
            setValidationFailed(true);
        }
    } ;
    const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.stopPropagation();
        deleteTaskFn(id);
    }




    return (
        <div>
            <form>
                <input className={`form_changeLabel ${validationFailed ? "form_changeLabel_validationFailed" : ""}`}
                       value={label}
                       type="text"
                       onChange={onInputLabel}
                       placeholder={validationFailed ? 'required field' : ''}
                       required />
                <input className="form_changeDescription"
                       value={description}
                       type="text"
                       onChange={onInputDescription}
                       placeholder="optional" />
                <button type='submit'
                       className="form_addTask"
                       aria-label="Add Task"
                       onClick={onClickAdd} >Add Task</button>
            </form>

            {state.length && <div>
                {state.map(({id, label, description, done}) =>
                    <div key={id}
                         className={`card ${done ? 'card_done' : '' }`}
                         id={id.toString()}
                         onClick={() => touchTaskFn(id)}
                        >
                        <h5>{label}</h5>
                        <p>{description}</p>
                        <button onClick={(event) => onClickDelete(event, id)}>X</button>
                    </div>)}
            </div>}

        </div>
    );
};
