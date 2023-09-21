import { createEvent, createStore } from "effector";
import { InputFields, Store, Task } from "./types";

export const addTask = createEvent<Task>();
export const deleteTask = createEvent<number>();
export const touchTask = createEvent<number>();

export const $state = createStore<Store>([
    {id: 1, label: 'test label', description: 'test description', done: false}
])
    .on(addTask, (state, payload) => [...state, payload])
    .on(deleteTask, (state, payload) => state.filter(el => el.id !== payload))
    .on(touchTask, (state, payload) => state.map(el => el.id === payload ? {...el, done: !el.done} : el));


export const changeLabel = createEvent<string>();
export const changeDescription = createEvent<string>();
export const changeDone = createEvent<boolean>();

export const $inputFields = createStore<InputFields>({ label: "", description: "", done: false })
    .on(changeLabel, (state, payload) => ({...state, label: payload}))
    .on(changeDescription, (state, payload) => ({...state, description: payload}))
    .on(changeDone, (state, payload) => ({...state, done: payload}));


