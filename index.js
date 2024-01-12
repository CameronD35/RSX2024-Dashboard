// BEGIN SETUP CODE

let currentTab = 'MainButton';
let tabsArray = [];
let boxElements = [];
let innerElements = [];

let currentPage = 0;

// Indicates if the page was just started or not
pageStart = true;

// Object of page properties; names of box classes and box titles
const pageProperties = {
    0: {
        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']

    },

    1: {
        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']
    },

    2: {
        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']
    },

    3: {

        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']
    }
}


createPageLayout();

// END SETUP CODE

// Object full of functions for managing the page as a whole
let pageManage = {
    // '0' is the main page, the rest correspond to capsule #s
    0: function(CSSClasses, boxTitles){

        console.log('Creating MAIN page.')

        if (!pageStart){
            openAnimation();
        }

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 4]], CSSClasses, boxTitles);
        createSO2Box();
        createMissionStatusBox();
        createPressureBox(document.querySelector('.PresBoxContent'), 3);
        createMagenmtosphereBox();
        createAltitudeBox();
        createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    1: function(CSSClasses, boxTitles){
        console.log('Creating first page.');

        if (!pageStart){
            openAnimation();
        }

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 4]], CSSClasses, boxTitles);
        createSO2Box();
        createMissionStatusBox();
        createPressureBox(document.querySelector('.PresBoxContent'), 3);
        createMagenmtosphereBox();
        createAltitudeBox();
        createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    2: function(CSSClasses, boxTitles){
        console.log('Creating second page.');

        if (!pageStart){
            openAnimation();
        }

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 4]], CSSClasses, boxTitles);
        createSO2Box();
        createMissionStatusBox();
        createPressureBox(document.querySelector('.PresBoxContent'), 3);
        createMagenmtosphereBox();
        createAltitudeBox();
        createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    3: function(CSSClasses, boxTitles){
        console.log('Creating third page.');

        if (!pageStart){
            openAnimation();
        }

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 4]], CSSClasses, boxTitles);
        createSO2Box();
        createMissionStatusBox();
        createPressureBox(document.querySelector('.PresBoxContent'), 3);
        createMagenmtosphereBox();
        createAltitudeBox();
        createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    open: function(){

    },

    close: function(boxArray){
        //console.log(`func arr length: ${boxArray.length}, glob arr length: ${boxElements.length}`)
        if (boxArray.length != 0){
            boxElements = [];
            //pageStart = false;

            for(let i = 0; i < boxArray.length; i++){
                let currentElement = document.querySelector(`.${boxArray[i]}`);

                if(currentElement.hasChildNodes()){
                    currentElement.replaceChildren();
                    currentElement.style.animation = `0.5s hideElements`

                    //console.log(boxArray);
                }
            }
            setTimeout(() => {
                document.querySelector('.boxContainer').replaceChildren();
            }, 500);
        }
    }
}

//Function call that begins 
pageManage[0](['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'], ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']);

// This sets up the different tabs accessible in the top right navigation
// It give sthe tabs there animations and functions to be used upon hover and click respectively

function setupTabs(tabs){
    for(let i = 0; i < tabs.length; i++){
        document.getElementById(tabs[i]).addEventListener('click', () => {    

            if(currentPage != i){
                currentTab = tabs[i];
                currentPage = i;
                updateTabs(tabs);

                pageManage.close(boxElements);
                console.log(pageProperties[i].CSSClassNames);
                setTimeout(() => {
                    pageManage[i](pageProperties[i].CSSClassNames, pageProperties[i].titles);
                }, 500)
                console.log(currentPage);
            }

        })
    }
}

// This gives the navigation tabs the ability to listen to mouse events and update accordingly

function updateTabs(tabs){
    for (let i = 0; i < tabs.length; i++){
        if (tabs[i] != currentTab){
            document.getElementById(tabs[i]).style.setProperty('opacity', '0.2');
        } else{
            document.getElementById(tabs[i]).style.setProperty('opacity', '1');
        }
    }
}

// This manages and creates the navigation located in the top right
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

// This sets up the animation that occurs when the mouse hovers over the logo
function logoAnimationSetup(elem){
    elem.addEventListener('mouseover', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) spinLogo`;
        document.querySelector('.logoText').style.animation = '1s cubic-bezier(0.77, 0, 0.175, 1) slideText';
        document.querySelector('.logoText').style.transform = 'translateX(0px)';
    });
    elem.addEventListener('mouseout', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) reverseLogo`;
        document.querySelector('.logoText').style.animation = '1s cubic-bezier(0.77, 0, 0.175, 1) hideText';
        document.querySelector('.logoText').style.transform = 'translateX(-250px)';
    })
}

// This sets up the slider found in the bottom center; Handles the text change when dragging the slider and changes the text according to the sliders position
function setupSlider(slider, valueDisplay){
    //console.log('slider value: ' + slider.value);
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

// This utilizes the above functions to create the 'skeleton' of the page, which will be used across all tabs
function createPageLayout(){
    createNavigation(document.getElementById('navList'), 3);
    logoAnimationSetup(document.getElementById('logo'));
    setupSlider(document.querySelector('.slider'), document.querySelector('.sliderNum'));
}


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

magRad(0, 5);
*/
 
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

for(let i = 1; i <= 3; i++){
    setTemperature(document.getElementById(`temperatureText${i}`), document.getElementById(`temperatureMeterFill${i}`));
}


for(let i = 1; i <= 3; i++){
    setPressure(document.getElementById(`pressureText${i}`), document.getElementById(`pressureMeterFill${i}`));
}


// This creates the main boxes found in the center of the page, allows customization of the # of boxes in each row and adjusts width accordingly
// rows: integer; definies how many rows will be present
// rowLengths: array; allows definition of the boxes in each row and their lengths.
// rowsLength format: [[auto-length, boxes amount #1], [auto-length, boxes amount #2], ...]] auto-length: boolean, boxes amount #i: integer
// NOTE: rows == rowLengths.length

function createBoxStructure(parent, rows, rowLengths, boxNames, titles){
    //console.log('im beign called')
    let boxNumber = 1;

    let boxWidth = [];
    
    for (let d = 0; d < rowLengths.length; d++){
        rowLengths[d][0]? boxWidth.push(100/rowLengths[d][1]) : boxWidth.push('');
    }

    //console.log(boxWidth);

    for(let i = 1; i <= rows; i++){
        let currentRow = parent.appendChild(document.createElement('div'));
        currentRow.classList.add('dashRow');
        currentRow.id = `dashRow${i}`;

        for(let j = 1; j <= rowLengths[i-1][1]; j++){
            let currentBox = currentRow.appendChild(document.createElement('div'));
            currentBox.classList.add(boxNames[boxNumber - 1]);
            currentBox.classList.add('box');
            currentBox.id = `box${boxNumber}`;

            currentTitle = currentBox.appendChild(document.createElement('div'));
            currentTitle.textContent = titles[boxNumber - 1];
            currentTitle.classList.add('boxTitle');

            currentContentBox = currentBox.appendChild(document.createElement('div'));
            currentContentBox.classList.add(`${boxNames[boxNumber - 1]}BoxContent`);
            currentContentBox.classList.add('boxContent');

            boxNumber++;

            //console.log(rowLengths[i-1][0]);

            //console.log(boxWidth);
            rowLengths[i-1][0] ? (currentBox.style.width = `${boxWidth[i-1]}%`): '';
        }
    }
}

function createSO2Box(container){

}

function createMissionStatusBox(container){

}

function createPressureBox(container, capsuleCount){

    let pressCont = container.appendChild(document.createElement('div'));
    pressCont.classList.add('pressureMeterContainer');

    for(let i = 1; i <= capsuleCount; i++) {

        let currentPressureBox = pressCont.appendChild(document.createElement('div'));
        currentPressureBox.classList.add('pressureMeterBox');
        currentPressureBox.id = `pressureMeterBox${i}`;
        currentPressureBox.style.setProperty('width',`${60/capsuleCount}%`);
        currentPressureBox.style.setProperty('margin',`0 ${3/capsuleCount}vw`);

        let currentLogoBox = currentPressureBox.appendChild(document.createElement('div'));
        currentLogoBox.classList.add('pressureMeterLogoBox');
        currentLogoBox.id = `pressureMeterLogoBox${i}`;

        let currentLogo = currentLogoBox.appendChild(document.createElement('img'));
        currentLogo.src = `Image-Assets/C${i}.png`;
        currentLogo.classList.add('pressureMeterCapsuleLogo');

        let currentMeter = currentPressureBox.appendChild(document.createElement('div'));
        currentMeter.classList.add('pressureMeter');
        currentMeter.id = `pressureMeter${i}`;

        let currentTextBox = currentMeter.appendChild(document.createElement('div'));
        currentTextBox.classList.add('pressureTextBox');
        currentTextBox.id = `pressureTextBox${i}`;

        let currentText = currentTextBox.appendChild(document.createElement('div'));
        currentText.classList.add('pressureText');
        currentText.id = `pressureText${i}`;
        currentText.textContent = '999';

        let currentUnit = currentTextBox.appendChild(document.createElement('div'));
        currentUnit.classList.add('pressureUnit');
        currentUnit.id = `pressureUnit${i}`;
        currentUnit.textContent = 'atm';

        let currentFillBox = currentMeter.appendChild(document.createElement('div'));
        currentFillBox.classList.add('pressureMeterFillBox');

        let currentFill = currentFillBox.appendChild(document.createElement('div'));
        currentFill.classList.add('pressureMeterFill');
        currentFill.id = `pressureMeterFill${i}`;
        
    }

}

function createMagenmtosphereBox(container){

}

function createAltitudeBox(container){

}

function createTemperatureBox(container, capsuleCount){
    
    let tempCont = container.appendChild(document.createElement('div'));
    tempCont.classList.add('temperatureMeterContainer');

    for(let i = 1; i <= capsuleCount; i++) {

        let currentTemperatureBox = tempCont.appendChild(document.createElement('div'));
        currentTemperatureBox.classList.add('temperatureMeterBox');
        currentTemperatureBox.id = `temperatureMeterBox${i}`;
        currentTemperatureBox.style.setProperty('height',`${51/capsuleCount}%`);
        currentTemperatureBox.style.setProperty('margin',`${5/capsuleCount}vw 0`);

        let currentLogoBox = currentTemperatureBox.appendChild(document.createElement('div'));
        currentLogoBox.classList.add('temperatureMeterLogoBox');
        currentLogoBox.id = `temperatureMeterLogoBox${i}`;

        let currentLogo = currentLogoBox.appendChild(document.createElement('img'));
        currentLogo.src = `Image-Assets/C${i}.png`;
        currentLogo.classList.add('temperatureMeterCapsuleLogo');

        let currentMeter = currentTemperatureBox.appendChild(document.createElement('div'));
        currentMeter.classList.add('temperatureMeter');
        currentMeter.id = `temperatureMeter${i}`;

        let currentText = currentMeter.appendChild(document.createElement('div'));
        currentText.classList.add('temperatureText');
        currentText.id = `temperatureText${i}`;
        currentText.textContent = '999°C';

        let currentFillBox = currentMeter.appendChild(document.createElement('div'));
        currentFillBox.classList.add('temperatureMeterFillBox');

        let currentFill = currentFillBox.appendChild(document.createElement('div'));
        currentFill.classList.add('temperatureMeterFill');
        currentFill.id = `temperatureMeterFill${i}`;
        
    }

}

function setCurrentBoxes(CSSClassArray){
    boxElements = [];

    for(let i = 0; i < CSSClassArray.length; i++){
        boxElements.push(CSSClassArray[i]);
    }

    //console.log('box titles: ' + boxElements.join(', '));
}