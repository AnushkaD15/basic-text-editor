const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const strikethroughButton = document.getElementById("strikethrough");
const alignButtons = document.querySelectorAll(".align");
const superscriptButton = document.getElementById("superscript");
const subscriptButton = document.getElementById("subscript");
const olButton = document.getElementById("list-ol");
const ulButton = document.getElementById("list-ul");
const createLinkButton = document.getElementById("createLink");
const imageButton = document.getElementById("image");
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
const formatBlockSelect = document.getElementById("formatBlock");
const fontNameSelect = document.getElementById("fontName");
const fontSizeSelect = document.getElementById("fontSize");
const foreColorInput = document.getElementById("foreColor");
const backColorInput = document.getElementById("backColor");
const textInput = document.getElementById("text-input");


boldButton.addEventListener("click", () => document.execCommand("bold"));
italicButton.addEventListener("click", () => document.execCommand("italic"));
underlineButton.addEventListener("click", () => document.execCommand("underline"));
strikethroughButton.addEventListener("click", () => document.execCommand("strikeThrough"));
superscriptButton.addEventListener("click", () => document.execCommand("superscript"));
subscriptButton.addEventListener("click", () => document.execCommand("subscript"));
olButton.addEventListener("click", () => document.execCommand("insertOrderedList"));
ulButton.addEventListener("click", () => document.execCommand("insertUnorderedList"));

createLinkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    if (/http/i.test(userLink)) {
      modifyText(createLinkButton.id, false, userLink);
    } else {
      userLink = "http://" + userLink;
      modifyText(createLinkButton.id, false, userLink);
    }
  });

imageButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0]; 
        if (file) {
            const reader = new FileReader();
                reader.onload = event => {
                const imageUrl = event.target.result; 
                document.execCommand("insertImage", false, imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
    fileInput.click();
});


undoButton.addEventListener("click", () => document.execCommand("undo"));
redoButton.addEventListener("click", () => document.execCommand("redo"));

alignButtons.forEach(button => {
    button.addEventListener("click", () => {
        const alignment = button.getAttribute("data-align");
        let commandValue;

        switch (alignment) {
            case "align-left":
                commandValue = "left";
                break;
            case "align-center":
                commandValue = "center";
                break;
            case "align-right":
                commandValue = "right";
                break;
            case "align-justify":
                commandValue = "justify";
                break;
            default:
                break;
        }

        if (commandValue) {
            document.execCommand("justify" + commandValue, false, null);
        }
    });
});

formatBlockSelect.addEventListener("change", () => {
    const format = formatBlockSelect.value;
    document.execCommand("formatBlock", false, format);
});

const fontNames = [
    "Arial",
    "Courier New", 
    "Georgia", 
    "Times New Roman", 
    "Verdana",
    "Impact",
    "Comic Sans MS",
    "Lucida Console",
    
];

const fontSizes = ["1", "2", "3", "4", "5", "6", "7"];

fontNames.forEach(fontName => {
    const option = document.createElement("option");
    option.value = fontName;
    option.textContent = fontName;
    fontNameSelect.appendChild(option);
});

fontSizes.forEach(fontSize => {
    const option = document.createElement("option");
    option.value = fontSize;
    option.textContent = fontSize;
    fontSizeSelect.appendChild(option);
});

fontNameSelect.addEventListener("change", () => {
    const fontName = fontNameSelect.value;
    document.execCommand("fontName", false, fontName);
});

fontSizeSelect.addEventListener("change", () => {
    const fontSize = fontSizeSelect.value;
    document.execCommand("fontSize", false, fontSize);
});

foreColorInput.addEventListener("input", () => {
    const color = foreColorInput.value;
    document.execCommand("foreColor", false, color);
});

backColorInput.addEventListener("input", () => {
    const color = backColorInput.value;
    document.execCommand("backColor", false, color);
});

window.onload = initializer();
