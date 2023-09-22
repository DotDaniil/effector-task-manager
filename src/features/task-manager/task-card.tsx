import React, { useState } from "react";
import { TaskCardProps } from "./types";
import { useEvent } from "effector-react";
import { deleteTask, touchTask } from "./model";

export const TaskCard: React.FC<TaskCardProps> = ({el: {id, label, description, done}}) => {
    const touchTaskFn = useEvent(touchTask);
    const deleteTaskFn = useEvent(deleteTask);
    const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.stopPropagation();
        deleteTaskFn(id);
    }
    const [hoverClose, setHoverClose] = useState(false);
        return (
            <div key={id}
                 className={`card ${done ? 'card_done' : '' }`}
                 id={id.toString()}
                 onClick={() => touchTaskFn(id)}
                 onMouseEnter={() => setHoverClose(true)}
                 onMouseLeave={() =>setHoverClose(false)}>
                <div className="card_text">
                    {<div className={`line_label ${done ? "line_label_show" : ""}`}></div>}
                    <h3 className={`card_label ${done ? 'card_label_done': ''}`}>{label}</h3>
                    <div className={`line_description ${done && description ? "line_description_show" : ""}`}></div>
                    {description && <p className={`card_description ${done ? 'card_description_done': ''}`}>{description}</p>}
                </div>
                <button
                    className={`card_close ${hoverClose ? 'card_close_hovered': ''}`}
                    onClick={(event) => onClickDelete(event, id)}>X</button>
            </div>
        )

};