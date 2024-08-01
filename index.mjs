import { setup } from "./dropzone.mjs";
import { loadXml } from "./xml.mjs";

function test() {
    fetch("ssg.xml")
        .then(response => {
            return response.text();
        })
        .then(text => {
            loadXml(text);
        });
}

window.addEventListener("load", setup);
window.addEventListener("load", test);