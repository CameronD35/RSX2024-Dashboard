let currentTab = 'MainButton';
let tabsArray = [];

pageStart = 1;

function setupTabs(tabs){
    for(let i = 0; i < tabs.length; i++){
        document.getElementById(tabs[i]).addEventListener('click', () => {
            currentTab = tabs[i];
            updateTabs(tabsArray);
        })
    }
}
function updateTabs(tabs){
    for (let i = 0; i < tabs.length; i++){
        if (tabs[i] != currentTab){
            document.getElementById(tabs[i]).style.setProperty('opacity', '0.2');
        } else{
            document.getElementById(tabs[i]).style.setProperty('opacity', '1')
        }
    }
}

function animationSetup(elem){
    elem.addEventListener('mouseover', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) spinLogo`;
        document.querySelector('.logoText').style.animation = '1s cubic-bezier(0.77, 0, 0.175, 1) slideText';
        document.querySelector('.logoText').style.transform = 'translateX(0px)';
    });
    elem.addEventListener('mouseout', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) reverseLogo`;
        document.getElementById('logoText').style.animation = '1s cubic-bezier(0.77, 0, 0.175, 1) hideText';
        document.querySelector('.logoText').style.transform = 'translateX(-250px)';
    })
}

animationSetup(document.getElementById('logo'));

/*
// Rad units are in vw
function magRad(initRad, maxRad){
    let currentRad = initRad;
    let radDiff = maxRad - initRad;
    console.log(window.getComputedStyle(document.getElementById('innerCircle')).getPropertyValue('outline-width'))
    let timerId = setInterval(() => {
        if (currentRad >= maxRad){
            currentRad = maxRad;
            clearInterval(magId);
        } else {
            currentRad += radDiff/100
            document.getElementById('innerCircle').style.setProperty('outline-width', `${currentRad}vw`);
            document.getElementById('magNumber').textContent = `${Math.round(currentRad)}00`;
            //console.log(`${currentRad} / ${maxRad}`);
        }
    }, 100);

}

function setupSlider(slider, valueDisplay){
    console.log(slider.value);
    slider.addEventListener('mousedown', () => {
        valueDisplay.style.setProperty('color', `rgb(255,234, 0)`);
        valueDisplay.style.setProperty('font-size', `30px`);

    });

    slider.addEventListener('mouseup', () => {
        valueDisplay.style.setProperty('color', `white`);
        valueDisplay.style.setProperty('font-size', `20px`);
    });

    slider.addEventListener('input', () => {
        valueDisplay.textContent = `${slider.value}`;
    });
}

function setTemperature(tempElem, fillElem){
    let fillSize = 0;
    let timerId = setInterval(() => {
        if (fillSize >= 100){
            clearInterval(magId);
        } else {
            fillSize++;
            tempElem.textContent = (`${fillSize}°C`);
            fillElem.style.setProperty('width', `${fillSize}%`);
        }
    }, 100);
}

function setPressure(pressureElem, fillElem){
    let fillSize = 0;
    let timerId = setInterval(() => {
        if (fillSize >= 300){
            clearInterval(magId);
        } else {
            fillSize += 3;
            pressureElem.textContent = (`${fillSize}`);
            fillElem.style.setProperty('height', `${fillSize/3}%`);
        }
    }, 100);
}

updateTabs(tabsArray);
setUpTabs(tabsArray);
magRad(0, 5);

setupSlider(document.querySelector('.slider'), document.querySelector('.sliderNum'));

for(let i = 1; i <= 3; i++){
    setTemperature(document.getElementById(`meterTemp${i}`), document.getElementById(`meterFill${i}`));
}


for(let i = 1; i <= 3; i++){
    setPressure(document.getElementById(`pressureText${i}`), document.getElementById(`pressureMeterFill${i}`));
}

*/
function createNavigation(parent, count){
    let main = parent.appendChild(document.createElement('li'));
    main.classList.add('hoverBig');
    main.id = `MainButton`;
    main.textContent = 'MAIN';
    tabsArray.push(main.id);

    for (let i = 1; i <= count; i++){
        let currentElement = parent.appendChild(document.createElement('li'));
        currentElement.classList.add('hoverBig');
        currentElement.id = `C${i}Button`;
        tabsArray.push(currentElement.id);

        let currentImage = currentElement.appendChild(document.createElement('img'));
        currentImage.classList.add('capsuleLogo');
        currentImage.src = `Image-Assets/C${i}.png`;
    }

    setupTabs(tabsArray);
    updateTabs(tabsArray);
}

createNavigation(document.getElementById('navList'), 3);
createBoxContainer(document.querySelector('.boxContainer'), [2, 4]);

function createMainPage(){
    if (pageStart != 1){
        openAnimation();
    }
    createSO2Box();
    createMissionStatusBox();
    createPressureBox();
    createMagenmtosphereBox();
    createAltitudeBox();
    createTemperatureBox();
}

function createC1Page(){

}

function createC2Page(){
    
}

function createC3Page(){
    
}

function createPageLayout(){

}

function openAnimation(){

}

function closeAnimation(){

}
// dimensions: array rows and sections for the page in the format of [rows, [row sections #1, row sections #2, ...]]

function createBoxContainer(parent, dimensions){
    let boxNumber = 1;
    for(let i = 1; i <= dimensions[0]; i++){
        let currentRow = parent.appendChild(document.createElement('div'));
        currentRow.classList.add('dashRow');
        currentRow.id = `dashRow${i}`;

        for(let j = 1; j <= dimensions[i-1]; j++){
            let currentBox = currentRow.appendChild(document.createElement('div'));
            currentBox.classList.add('box');
            currentBox.id = `box${boxNumber++}`;

            if(i == 2){
                currentBox.classList.add('boxBottom');
            }
        }
    }
}

function createSO2Box(){

}

function createMissionStatusBox(){

}

function createPressureBox(){

}

function createMagenmtosphereBox(){

}

function createAltitudeBox(){

}

function createTemperatureBox(){

}