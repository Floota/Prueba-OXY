const inputField = document.getElementById("inputField");
const outputText = document.getElementById("outputP");  


const selectorInput = document.getElementById("selectorOption");
const selectorQuery = document.querySelector("#selectorOption");
const units = document.getElementById("munits");

const inverseButton = document.getElementById("inverseButton");
const saveButton = document.getElementById("saveButton");
const gridSave = document.getElementById("wrapper");
var measurement = "kilometers";


function loadItems() {
    const items = JSON.parse(localStorage.getItem('gridItems')) || [];
    items.forEach(item => {
        createGridItem(item); 
    });
}

inputField.addEventListener("input", () => {
    var selector = document.getElementById("selectorOption").value;
    switch (selector) {
        case ("km2mile"):
            outputText.innerHTML = (inputField.value*0.6213).toFixed(2)+ " miles";
            break;
        case ("mile2km"):
            outputText.innerHTML = (inputField.value*1.6093).toFixed(2)+ " kilometers";
            break;
        case ("feet2meter"):
            outputText.innerHTML = (inputField.value*0.3048).toFixed(2)+ " meters";
            break;
        case ("meter2feet"):
            outputText.innerHTML = (inputField.value*3.2808).toFixed(2)+ " feet";
            break;
        case ("cm2inch"):
            outputText.innerHTML = (inputField.value*0.3937).toFixed(2)+ " inches";
            break;
        case ("inch2cm"):
            outputText.innerHTML = (inputField.value*2.54).toFixed(2)+ " centimeters";
            break;
    
    }
});
selectorInput.addEventListener("change", () => {
    var selector = document.getElementById("selectorOption").value;
    switch (selector) {
        case ("km2mile"):
            units.innerHTML = " kilometers";
            measurement = "kilometers";
            break;
        case ("mile2km"):
            units.innerHTML = " miles";
            measurement = "miles";
            break;
        case ("feet2meter"):
            units.innerHTML = " feet";
            measurement = "feet";
            break;
        case ("meter2feet"):
            units.innerHTML = "meters";
            measurement = "meters";
            break;
        case ("cm2inch"):
            units.innerHTML = "centimeters";
            measurement = "centimeters";
            break;
        case ("inch2cm"):
            units.innerHTML = "inches";
            measurement = "inches";
            break;
    
    }
    saveButton.innerHTML="♡";
    outputText.innerHTML = "-";
    document.getElementById("saveButton").disabled = false;
});
inverseButton.addEventListener("click", () => {
    var selector = document.getElementById("selectorOption").value;
    switch (selector) {
        case ("km2mile"):
            selectorQuery.value = "mile2km";
            units.innerHTML = " kilometers";
            break;
        case ("mile2km"):
            selectorQuery.value = "km2mile";
            units.innerHTML = " miles";
            break;
        case ("feet2meter"):
            selectorQuery.value = "meter2feet";
            units.innerHTML = " feet";
            break;
        case ("meter2feet"):
            selectorQuery.value = "feet2meter";
            units.innerHTML = " meters";
            break;
        case ("cm2inch"):
            selectorQuery.value = "inch2cm";
            units.innerHTML = " centimeters";
            break;
        case ("inch2cm"):
            selectorQuery.value = "cm2inch";
            units.innerHTML = " inches";
            break;
    }
    saveButton.innerHTML="♡";
    inputField.value = "";
    outputText.innerHTML = "-";
    document.getElementById("saveButton").disabled = false;
});
function createGridItem(content) {
    const newGridItem = document.createElement("div");
    newGridItem.classList.add("gridItem");

    newGridItem.textContent = content;

    const removeButton = document.createElement("button");
    removeButton.classList.add("gridButton");
    removeButton.textContent = "Ｘ";

    removeButton.addEventListener("click", function(event) {
        event.stopPropagation(); 
        newGridItem.remove(); 
        removeItemFromStorage(content); 
    });

    newGridItem.appendChild(removeButton); 
    wrapper.appendChild(newGridItem);
}

saveButton.addEventListener("click", function() {
    if (inputField.value !== "") {
        saveButton.innerHTML = "♥";
        
        const newItemContent = `${inputField.value} ${measurement} → ${outputText.textContent}`;
        createGridItem(newItemContent); 
        addItemToStorage(newItemContent); 
        document.getElementById("saveButton").disabled = true;
        inputField.value = ""; 
        outputText.innerHTML = "-"; 
    }
});
document.querySelectorAll('.gridButton').forEach(button => { //Asegura que el cuadro eliminado es al que hemos dado clic
    button.addEventListener('click', function(event) {
        event.stopPropagation(); 
        const gridItem = button.parentElement; 
        gridItem.remove(); 
    });
});

//Estas dos funciones recogen y eliminan los objetos del almacenamiento local
function removeItemFromStorage(content) {
    const items = JSON.parse(localStorage.getItem('gridItems')) || [];
    const updatedItems = items.filter(item => item !== content);
    localStorage.setItem('gridItems', JSON.stringify(updatedItems));
}

function addItemToStorage(content) {
    const items = JSON.parse(localStorage.getItem('gridItems')) || [];
    items.push(content);
    localStorage.setItem('gridItems', JSON.stringify(items));
}
loadItems();
