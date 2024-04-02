import { writable } from "svelte/store";

const globalState = writable({
        editMode:false
});

console.log("gets reexecuted")

export { globalState }
