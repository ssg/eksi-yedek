import { gi } from "./generic.mjs";
import { parse } from "./eksitext-2024.mjs";

const xmlMimeType = "text/xml";

/**
 * collect a list of nodes from the xml document based on given xpath
 * @param {XMLDocument} xml 
 * @param {string} xpath 
 * @returns {Node[]} node array
 */
function getNodes(xml, xpath) {
    let result = xml.evaluate(xpath, xml.documentElement);
    let node;
    let nodes = [];
    while (node = result.iterateNext()) {
        // we collect nodes beforehand because modifying
        // DOM invalidates search results
        nodes.push(node);
    }
    return nodes;
}

/**
 * parse the given XML backup text with markup, make it
 * displayable, and finally display its contents.
 * @param {string} xmlBody xml body
 */
function displayXml(xmlBody) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlBody, xmlMimeType);

    let nodes = getNodes(xml, "//*[self::entry or self::draft]");
    nodes.forEach(node => {     
        let newNode = processEksiMarkup(xml, node);
        node.parentNode.replaceChild(newNode, node);
    });

    fetch("backup.xsl")
        .then(response => response.text())
        .then(str => parser.parseFromString(str, xmlMimeType))
        .then(xslStr => {
            const processor = new XSLTProcessor();
            processor.importStylesheet(xslStr);
            const result = processor.transformToFragment(xml, document);
            gi("dropzone").classList.remove("expanded");
            gi("dropzone").classList.add("mini");
            gi("content").replaceChildren(result);
        })
}

/**
 * converts eksi markup into proper XML so it can be parsed
 * by the XSLT.
 * @param {XMLDocument} xml XML document
 * @param {Element} node Node to be processed
 * @returns {Element} newly processed node 
 */
function processEksiMarkup(xml, node) {
    let parsed;
    try {
        parsed = parse(node.textContent);
    }
    catch {
        let serializer = new XMLSerializer();
        const str = serializer.serializeToString(node);
        console.error("couldn't parse entry node: %s", str);
        return node;
    }
    let newNode = node.cloneNode();
    newNode.replaceChildren(); // remove all nodes
    parsed.forEach(part => {
        if (typeof part === "string") {
            newNode.appendChild(xml.createTextNode(part));
            return;
        }
        let subNode;
        switch(part.type) {
            case "gbkz": {
                subNode = xml.createElement("gbkz");
                subNode.textContent = part.query;
                break;
            }
            case "bkz": {
                subNode = xml.createElement("bkz");
                subNode.textContent = part.query;
                break;
            }
            case "abkz": {
                subNode = xml.createElement("abkz");
                subNode.textContent = part.text;
                subNode.setAttribute("query", part.query);
            }
            case "paragraph_break": {
                subNode = xml.createElement("p");
                break;
            }
            case "line_break": {
                subNode = xml.createElement("br");
                break;
            }
            case "url": {
                subNode = xml.createElement("a");
                subNode.setAttribute("href", part.url);
                subNode.textContent = part.url;
                break;
            }
            case "named_url": {
                subNode = xml.createElement("a");
                subNode.setAttribute("href", part.url);
                subNode.textContent = part.title;
                break;
            }
            default:
                console.error("unknown part type %s", part.type);
                return;
        }
        newNode.appendChild(subNode);
    });
    return newNode;
}

export { displayXml };