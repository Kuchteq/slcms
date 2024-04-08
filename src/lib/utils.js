const getSpotFromRef = (arr, ref) => {
        let index = arr.findIndex(
                (item) => item.ref === ref,
        );
        if (index != -1) {
                return { arr, index }
        }
        let i = 0;
        while (i < arr.length) {
                if (arr[i].data != null) {
                        const ret = getSpotFromRef(arr[i].data, ref)
                        if (ret != undefined) {
                                return ret
                        }
                }
                i++
        }

}
function removeRefs(obj, keysToKeep) {
        for (const prop in obj) {
                if (!keysToKeep.includes(prop) && prop !== 'refs') {
                        delete obj[prop];
                } else if (typeof obj[prop] === 'object') {
                        removeRefs(obj[prop], keysToKeep);
                }
        }
}
function extractRefs(dataArray) {
        const refs = [];
        const stack = dataArray.slice(); // Initialize stack with the input array
        while (stack.length) {
                const item = stack.pop(); // Pop the last item from the stack

                if (item.ref) {
                        refs.push(item.ref); // Push 'ref' value if exists
                }

                if (item.data && Array.isArray(item.data)) {
                        stack.push(...item.data); // Push nested 'data' array items onto the stack
                }
        }
        return refs;
}
// function moveObjectBefore(array, obj, objToMoveBefore) {
//         console.log(array, objToMoveBefore)
//         let moveArrayRef = array
//         let moveIdx;
//         while (moveArrayRef != null) {
//                 moveIdx = moveArrayRef.indexOf(objToMoveBefore)
//                 if (moveIdx != -1) {
//                         break
//                 }
//                 moveArrayRef = array
//         }
//
//         console.log(moveIdx)
//         // const indexToMoveBefore = array.findIndex(
//         //         (item) => item.ref === refToMoveBefore,
//         // );
//         return array;
// }
const moveField = (array, source, destBefore, bias) => {
        let place = array.findIndex(item => item.id === source.id)
        if (place != -1) {
                array.splice(place, 1)
                place = array.findIndex(item => item.id === destBefore.id)
                array.splice(place+bias, 0, source)
        }
}
function moveObjectBeforea(array, refToMove, refToMoveBefore) {
        // Find the index of the object to be moved
        const indexToMove = array.findIndex(
                (item) => item.ref === refToMove,
        );

        if (indexToMove === -1) {
                data
                console.log("Object to move not found.");
                return array;
        }

        // Extract the object to be moved
        const objectToMove = array.splice(indexToMove, 1)[0];

        // Find the index of the object before which the object should be moved
        const indexToMoveBefore = array.findIndex(
                (item) => item.ref === refToMoveBefore,
        );

        if (indexToMoveBefore === -1) {
                console.log("Object to move before not found.");
                return array;
        }

        // Insert the object before the specified index
        array.splice(indexToMoveBefore, 0, objectToMove);

        // Recursively move any objects within the 'data' property
        if (objectToMove.data && Array.isArray(objectToMove.data)) {
                objectToMove.data.forEach((subObj) => {
                        moveObjectBeforea(
                                objectToMove.data,
                                subObj.ref,
                                refToMoveBefore,
                        );
                });
        }
        return array;
}
export { extractRefs, moveObjectBeforea, getSpotFromRef, removeRefs, moveField  }
