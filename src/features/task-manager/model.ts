import { createEvent, createStore } from "effector";
import { InputFields, Store, Task } from "./types";

export const init = createEvent<Store>()
export const addTask = createEvent<Task>();
export const deleteTask = createEvent<number>();
export const touchTask = createEvent<number>();

export const $state = createStore<Store>([])
    .on(init, (_) => {
        const storage = localStorage.getItem("effector-task-manager");
        let ls: Store = [];
        if (storage) {
            ls = JSON.parse(storage);
        } else {
            localStorage.setItem("effector-task-manager", JSON.stringify(ls));
        }
        return [...ls];
    })
    .on(addTask, (state, payload) => {
        const storage = localStorage.getItem("effector-task-manager");
        const storeOnAddAct = (storePayload: Store) => [...storePayload, payload];
        if (storage) {
            const ls: Store = JSON.parse(storage);
            localStorage.setItem("effector-task-manager", JSON.stringify([...ls, payload]));
        }
        return storeOnAddAct(state);
    })
    .on(deleteTask, (state, payload) => {
        const storage = localStorage.getItem("effector-task-manager");
        const storeOnDeleteAct = (storePayload: Store) => storePayload.filter(el => el.id !== payload)
        if (storage) {
            const ls: Store = JSON.parse(storage);
            localStorage.setItem("effector-task-manager", JSON.stringify(storeOnDeleteAct(ls)));
        }
        return storeOnDeleteAct(state);
    })
    .on(touchTask, (state, payload) => {
        const storage = localStorage.getItem("effector-task-manager");
        const storeOnTouchAct = (storePayload: Store) => storePayload.map(el => el.id === payload ? {...el, done: !el.done} : el);
        if (storage) {
            const ls: Store = JSON.parse(storage);
            localStorage.setItem("effector-task-manager", JSON.stringify(storeOnTouchAct(ls)));
        }
        return storeOnTouchAct(state);
    });


export const changeLabel = createEvent<string>();
export const changeDescription = createEvent<string>();
export const changeDone = createEvent<boolean>();

export const $inputFields = createStore<InputFields>({ label: "", description: "", done: false })
    .on(changeLabel, (state, payload) => ({...state, label: payload}))
    .on(changeDescription, (state, payload) => ({...state, description: payload}))
    .on(changeDone, (state, payload) => ({...state, done: payload}));




