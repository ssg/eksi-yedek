const gi = (id) => document.getElementById(id);

const listen = (eventName, func) => gi("dropzone").addEventListener(eventName, func);

const error = (message) => {
    gi("error").innerText = message;
    console.debug("showing error: %s", message);
}

export { gi, listen, error };