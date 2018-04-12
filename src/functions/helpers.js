
/**
*   Helper function to perform for- loops asynchronously. Note that you still need to await for return value
*   @param array Array
*   @param callback Function to be performed for each element
*/
export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};