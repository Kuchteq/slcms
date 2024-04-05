import { writable } from "svelte/store";

const globalState = writable({
        moveMode:false,
        targets:[]
});

const moveMode = writable(false);
const addMode = writable(false);


const elementModalOpen = writable();
const elementModalType = writable();
const elementModalFields = writable();


export { globalState, moveMode, elementModalOpen, elementModalType, elementModalFields, addMode }
