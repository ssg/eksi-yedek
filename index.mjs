import { setup } from "./dropzone.mjs";
import { displayXml } from "./xml.mjs";

function test() {
    fetch("ssg.xml")
        .then(response => {
            return response.text();
        })
        .then(text => {
            displayXml(text);
        });
}

window.addEventListener("load", setup);
// window.addEventListener("load", test);