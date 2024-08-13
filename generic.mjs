/**
 * return document element by id
 * @param {string} id 
 * @returns 
 */
const gi = (id) => document.getElementById(id);

/**
 * show an error message in the generic error area.
 * @param {string} message 
 */
const error = (message) => {
    gi("error").innerText = message;
    console.debug("showing error: %s", message);
}

export { gi, error };