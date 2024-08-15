import { setupDropZone } from "./dropzone.mjs";
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

window.addEventListener("load", setupDropZone);

if (location.search == "?test=1") {
    window.addEventListener("load", test);
}