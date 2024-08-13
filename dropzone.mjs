console.debug("hello world");
import { gi, error } from './generic.mjs';
import { displayXml } from './xml.mjs';

/**
 * processes the uploaded file list, and extracts
 * the zip, and later displays the XML.
 * @param {FileList} files 
 * @returns 
 */
function processFiles(files) {
    if (files.length === 0) {
        return;
    }
    if (files.length > 1) {
        error("tek dosya atınız pls ltf tşk");
        return;
    }
    const file = files[0];
    const ext = file.name.split('.').pop();
    if (ext === "zip") {
        JSZip.loadAsync(file)
            .then((zip) => {
                zip.forEach((relativePath, file) => {
                    if (relativePath.endsWith(".xml")) {
                        file.async("string")
                            .then((str) => displayXml(str));
                    }
                });
            });
        return;
    }
    if (ext === "xml") {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onerror = () => {
            error(`XML yüklemekten biçare şu gönül naçar, ne demiş karacaoğlan: ${reader.error}`);
        }
        reader.onload = () => {
            displayXml(reader.result);
        };
        return;
    }
    error("zip ya da xml lütfen");
    return;
}

/**
 * listen event on the dropzone
 * @param {string} eventName 
 * @param {Function} func 
 * @returns 
 */
const listen = (eventName, func) => gi("dropzone").addEventListener(eventName, func);

/**
 * initialize dropzone event handlers
 */
function setupDropZone() {
    console.debug("setup called");
    listen("drop", (ev) => {
        console.debug("drop");
        ev.preventDefault();

        gi("dropzone").classList.add("active");
        const dt = ev.dataTransfer;
        if (dt !== null) {
            return processFiles(dt.files);
        }
    });    

    listen("dragover", (ev) => ev.preventDefault());

    listen("dragenter", (ev) => {
        console.debug("dragenter");
        gi("dropzone").classList.add("active");
        return true;
    });
    listen("dragleave", (ev) => {
        console.debug("dragleave");
        gi("dropzone").classList.remove("active");
        return true;
    });

    gi("fileinput").addEventListener("change", (ev) => {
        return processFiles(ev.target.files);
    });
    console.debug("setup complete");
}

export { setupDropZone };