import React, { useEffect, useState } from "react";
import { useEvent, useStore } from "effector-react";
import {
    $state,
    $inputFields,
    init,
    addTask,
    changeLabel,
    changeDescription
} from "./model";
import { createId } from "./utils";
import './task-manager.styles.css';
import {TaskCard} from "./task-card";

export const TaskManager: React.FC = () => {
    const state = useStore($state);
    const addTaskFn = useEvent(addTask);



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

    const maxLabelLength = label.length > 40;
    const maxDescriptionLength = description.length > 55;

    const onInputLabel = (event: React.FormEvent<HTMLInputElement>) => {
        if (!maxLabelLength) changeLabelFn(event.currentTarget.value);
    }
    const onInputDescription = (event: React.FormEvent<HTMLInputElement>) => {
        if (!maxDescriptionLength) changeDescriptionFn(event.currentTarget.value);
    }
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


    const initLocalStorage = useEvent(init);

    useEffect(() => {
        initLocalStorage(state);
    }, [])




    return (
        <div className="task_manager">
            <form className={`form ${state.length ? "" : "form_no_task"}`}>
                <div className="form_inputs">
                    <input  className={`form_input ${validationFailed ? "form_input_required " : ""}`}
                            value={label}
                            type="text"
                            onChange={onInputLabel}
                            placeholder={`   Label      ${validationFailed ? '*' : ''}`}
                            required />
                    <input  className="form_input"
                            value={description}
                            type="text"
                            onChange={onInputDescription}
                            placeholder="Description" />
                </div>
                <button type='submit'
                        className="form_addTask"
                        aria-label="Add Task"
                        onClick={onClickAdd}>
                    <span>Add Task</span>
                </button>
            </form>

            <div className={`tab ${state.length ? "" : "tab_invisible"}`}>
                {state.map((el) =>
                    <TaskCard el={el} />
                )}
            </div>
        </div>
    );
};
