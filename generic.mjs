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
    gi("error").innerText = `⚠️ ${message}`;
    setTimeout(() => gi("dropzone").classList.remove("active"), 500);
    console.debug("showing error: %s", message);
}

export { gi, error };