import { writable } from "svelte/store";

const globalState = writable({
        savefunc: () => {
                console.log("kurwa");
        }
});

console.log("gets reexecuted")

export { globalState }
