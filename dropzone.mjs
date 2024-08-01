console.debug("hello world");
import { gi, listen, error } from './generic.mjs';
import { loadXml } from './xml.mjs';

function setup() {
    console.debug("setup called");
    listen("drop", (ev) => {
        console.debug("drop");
        ev.preventDefault();

        gi("dropzone").className = "active";
        const dt = ev.dataTransfer;
        console.log("%o", dt);
        if (dt === null || dt.files.length == 0) {
            error("bir dosya bekliyorum, alooo");
            return false;
        }
        if (dt.files.length > 1) {
            error("tek dosya atınız pls ltf tşk");
            return false;
        }
        const file = dt.files[0];
        const ext = file.name.split('.').pop();
        if (ext === "zip") {
            JSZip.loadAsync(file)
                .then((zip) => {
                    zip.forEach((relativePath, file) => {
                        if (relativePath.endsWith(".xml")) {
                            file.async("string", (str) => {
                                loadXml(str);
                            });
                        }
                    });
                });
            return false;
        }
        if (ext === "xml") {
            const reader = new FileReader();
            reader.onload(ev => {
                loadXml(ev.target.result);
            });
            reader.readAsText(file, "iso-8859-9");
            return false;
        }
        error("zip ya da xml lütfen");
        return false;
    });

    listen("dragover", (ev) => ev.preventDefault());

    listen("dragenter", (ev) => {
        console.debug("dragenter");
        gi("dropzone").className = "active";
        return true;
    });
    listen("dragleave", (ev) => {
        console.debug("dragleave");
        gi("dropzone").className = "";
        return true;
    });
    console.debug("setup complete");
}

window.addEventListener("load", setup);

export { setup };