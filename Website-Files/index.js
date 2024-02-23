
import Graph from './modules/lineChart.js';
// BEGIN SETUP CODE

let currentTab = 'MainButton';
let tabsArray = [];
let boxElements = [];
let timerStartToggle = false;

let currentPage = 0;

let graphArray = [];

// Indicates if the page was just started or not
let pageStart = true;

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


// Object full of functions for managing the page
let pageManage = {
    // '0' is the main page, the rest correspond to capsule #s
    0: function(CSSClasses, boxTitles){

        console.log('Creating MAIN page.')

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 4]], CSSClasses, boxTitles);
        createSO2Box(document.querySelector(".SO2BoxContent"), 2);
        createMissionStatusBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2', '???'], timerStartToggle);
        createPressureBox(document.querySelector('.PresBoxContent'), 3);
        createMagnetosphereBox(document.querySelector('.MagBoxContent'));
        createAltitudeBox(document.querySelector('.AltBoxContent'), 3);
        createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);

        
        //Tets function -- Not to be used in final deployment
        magRad(0, 10);
    },

    1: function(CSSClasses, boxTitles){
        console.log('Creating first page.');

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 3], [true, 7]], CSSClasses, boxTitles);
        //createSO2Box();
        //createMissionStatusBox();
        //createPressureBox(document.querySelector('.PresBoxContent'), 3);
        //createMagnetosphereBox(document.querySelector('.MagBoxContent'));
        createAltitudeBox();
        //createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    2: function(CSSClasses, boxTitles){
        console.log('Creating second page.');

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 8]], CSSClasses, boxTitles);
        //createSO2Box();
        //createMissionStatusBox();
        //createPressureBox(document.querySelector('.PresBoxContent'), 3);
        //createMagnetosphereBox(document.querySelector('.MagBoxContent'));
        createAltitudeBox();
        //createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    3: function(CSSClasses, boxTitles){
        console.log('Creating third page.');

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 5], [true, 9]], CSSClasses, boxTitles);
        //createSO2Box();
        //createMissionStatusBox();
        //createPressureBox(document.querySelector('.PresBoxContent'), 3);
        //createMagnetosphereBox(document.querySelector('.MagBoxContent'));
        createAltitudeBox();
        //createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);
    },

    open: function(boxContainer){
        document.querySelector(boxContainer).style.opacity = '0';
        //console.log('whats good');
        document.querySelector(boxContainer).style.animation = `0.5s showElements`
        setTimeout(() => {
            document.querySelector(boxContainer).style = '';
            disableTabs(tabsArray, false);
        }, 500)
    },

    close: function(boxArray){
        //console.log(`func arr length: ${boxArray.length}, glob arr length: ${boxElements.length}`)
        if (boxArray.length != 0){
            boxElements = [];
            pageStart = false;

            for(let i = 0; i < boxArray.length; i++){
                let currentElement = document.querySelector(`.${boxArray[i]}`);

                if(currentElement.hasChildNodes()){
                        currentElement.replaceChildren();
                        currentElement.style.animation = `0.5s hideElements`;
                    //console.log(boxArray);
                }
            }
            setTimeout(() => {
                document.querySelector('.boxContainer').replaceChildren();
                console.log('deleting stuff');
            }, 400);
        }
    }
}

// Function call that sets the website page to the main page on startup
pageManage[0](['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'], ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']);

// This sets up the different tabs accessible in the top right navigation
// It give sthe tabs there animations and functions to be used upon hover and click respectively

function setupTabs(tabs){
    for(let i = 0; i < tabs.length; i++){
        document.getElementById(tabs[i]).addEventListener('click', () => {    

            if(currentPage != i){
                console.log(tabsArray);
                disableTabs(tabsArray, true);
                currentTab = tabs[i];
                currentPage = i;
                updateTabs(tabs);

                pageManage.close(boxElements);
                //console.log('closing');
                setTimeout(() => {
                    pageManage[i](pageProperties[i].CSSClassNames, pageProperties[i].titles)
                        
                    if (!pageStart){
                            pageManage.open('.boxContainer');
                            console.log('opening');
                    }
                    tabs[i].disabled = '';
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

    let main = createHTMLChildElement(parent, 'li', 'hoverBig', 'MAIN', `MainButton`);
    tabsArray.push(main.id);

    for (let i = 1; i <= count; i++){
        let currentElement = createHTMLChildElement(parent, 'li', 'hoverBig', null, `C${i}Button`);
        tabsArray.push(currentElement.id);

        let currentImage = createHTMLChildElement(currentElement, 'img', 'capsuleLogo', null, `capsuleLogo${i}`);
        currentImage.src = `../Image-Assets/C${i}.webp`;
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
    slider.addEventListener('mousedown', () => { turnYellow(); });

    slider.addEventListener('mouseup', async () => {
        turnWhite();

        // DATABASE CODE
        console.log(await sendDataToPython("http://127.0.01:5000/dashboard", slider.value));
        //document.querySelector('.randomNumberThing').textContent = await sendDataToPython("http://127.0.01:5000/dashboard", slider.value);


    });

    slider.addEventListener('input', () => {
        valueDisplay.value = `${slider.value}`;
    });

    valueDisplay.onkeydown = async function(key){

        if(key.keyCode == 13){
            turnWhite();
            if(slider.value > 1000){
                slider.value = 1000;
            } else {
                slider.value = `${valueDisplay.value}`;
            }

            valueDisplay.blur();
            console.log(await sendDataToPython("http://127.0.01:5000/dashboard", slider.value));
            //document.querySelector('.randomNumberThing').textContent = await sendDataToPython("http://127.0.01:5000/dashboard", slider.value);

            //console.log(slider.value);
        }
        
    }

    valueDisplay.addEventListener('input', () => {
        turnYellow();

        if (valueDisplay.value.length > valueDisplay.maxLength){
            valueDisplay.value = valueDisplay.value.slice(0, valueDisplay.maxLength);
        }
    });

    function turnYellow(){
        valueDisplay.style.setProperty('color', `rgb(255,234, 0)`);
        valueDisplay.style.setProperty('font-size', `18px`);
    }

    function turnWhite(){
        valueDisplay.style.setProperty('color', `white`);
        valueDisplay.style.setProperty('font-size', `12px`);
    }
}

// This utilizes the above functions to create the 'skeleton' of the page, which will be used across all tabs (TF)
function createPageLayout(){
    createNavigation(document.getElementById('navList'), 3);
    logoAnimationSetup(document.getElementById('logo'));
    setupSlider(document.querySelector('.slider'), document.querySelector('.sliderNumInput'));
}



// Rad units are in vw (TF)
function magRad(initRad, maxRad){
    let currentRad = initRad;
    let radDiff = maxRad - initRad;
    console.log(window.getComputedStyle(document.getElementById('innerCircle')).getPropertyValue('outline-width'))
    let timerId = setInterval(() => {
        if ((currentRad >= maxRad) || currentPage != 0){
            currentRad = maxRad;
            clearInterval(timerId);
        } else {
            currentRad += radDiff/100
            document.getElementById('innerCircle').style.setProperty('outline-width', `${currentRad}vmin`);
            document.getElementById('magNumber').textContent = `${Math.round(currentRad)}00`;
            //console.log(`${currentRad} / ${maxRad}`);
        }
    }, 100);

}

// (TF) 
function setTemperature(tempElem, fillElem){
    let fillSize = 0;
    let timerId = setInterval(() => {
        if (fillSize >= 100){
            clearInterval(timerId);
        } else {
            fillSize++;
            tempElem.textContent = (`${fillSize}°C`);
            fillElem.style.setProperty('width', `${fillSize}%`);
        }
    }, 100);
}
// (TF)
function setPressure(pressureElem, fillElem){
    let fillSize = 0;
    let timerId = setInterval(() => {
        if (fillSize >= 300){
            clearInterval(timerId);
        } else {
            fillSize += 3;
            pressureElem.textContent = (`${fillSize}`);
            fillElem.style.setProperty('height', `${fillSize/3}%`);
        }
    }, 100);
}

// TESTING STUFF
for(let i = 1; i <= 3; i++){
    setTemperature(document.getElementById(`temperatureText${i}`), document.getElementById(`temperatureMeterFill${i}`));
}

// TESTING STUFF
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

        let currentRow = createHTMLChildElement(parent, 'div', 'dashRow', null, `dashRow${i}`);

        for(let j = 1; j <= rowLengths[i-1][1]; j++){

            let currentBox = createHTMLChildElement(currentRow, 'div', [boxNames[boxNumber - 1], 'box'], null, `box${boxNumber}`);

            let currentTitle = createHTMLChildElement(currentBox, 'div', 'boxTitle', titles[boxNumber - 1], `boxTitle${boxNumber}`);

            let currentContentBox = createHTMLChildElement(currentBox, 'div', [`${boxNames[boxNumber - 1]}BoxContent`, 'boxContent'], null, `boxContent${boxNumber}`);

            boxNumber++;

            //console.log(rowLengths[i-1][0]);

            //console.log(boxWidth);
            rowLengths[i-1][0] ? (currentBox.style.width = `${boxWidth[i-1]}%`): '';
        }
    }
}

function createSO2Box(container, capsuleCount){
    // let randomNumberThing = container.appendChild(document.createElement('div'));
    // randomNumberThing.classList.add('randomNumberThing');

    // randomNumberThing.textContent = 36;

    for(let i = 1; i <= capsuleCount; i++) {

        let currentSO2Container = createHTMLChildElement(container, 'div', 'SO2BarContainer', null, `SO2BarContainer${i}`);

        let currentSO2Box = createHTMLChildElement(currentSO2Container, 'div', `SO2BarBox`, null, `SO2BarBox${i}`);

        let currentSO2Num = createHTMLChildElement(currentSO2Box, 'div', 'SO2Num', '99', `SO2Num${i}`);

        let currentSO2Unit = createHTMLChildElement(currentSO2Num, 'div', 'SO2Unit', 'ppm', `SO2Unit${i}`);

        let currentSvgContainer = createHTMLChildElement(container, 'div', 'svgContainer', null, `svgContainer${i}`);

        let currentGraph = new Graph(200, 200, {top: 20, bottom: 20, right: 30, left: 30}, '.SO2BoxContent', null, ['time', 'concentration'], ['red', 'blue'], 'SO2Chart');

        graphArray.push(currentGraph);

        currentGraph.create();
        
    }


    
}

function createMissionStatusBox(container, capsuleCount, stages, startToggle){

    let stageCont = createHTMLChildElement(container, 'div', 'stageContainer');

    let timeCont = createHTMLChildElement(container, 'div', 'timeContainer');

    for(let i = 0; i < stages.length; i++){

        let currentStageBox = createHTMLChildElement(stageCont, 'div', 'stageBox', stages[i], `stageBox${i+1}`);

        let currentTimeText = createHTMLChildElement(timeCont, 'div', 'timeText', 'T-999', `timeText${i+1}`);

    }

    let timerControlsCont = createHTMLChildElement(container, 'div', 'timerControlsContainer');

    let timer = createHTMLChildElement(timerControlsCont, 'div', 'missionTimer', 'T-999');

    let startButton = createHTMLChildElement(timerControlsCont, 'div', 'startButton');

    let startText = createHTMLChildElement(startButton, 'div', 'startText', 'START MISSION');

    let startCircle = createHTMLChildElement(startButton, 'div', 'startCircle');

    startButton.addEventListener('mouseenter', () => {
        startCircle.style.transitionTimingFunction = 'cubic-bezier(0.77, 0, 0.175, 1)';
        startCircle.style.width = '27vmax';
        startCircle.style.height = '27vmax';
        startText.style.color = 'var(--timerHoverColor)';

    });


    startButton.addEventListener('mouseleave', () => {
        startCircle.style.transitionTimingFunction = ' cubic-bezier(0.23, 1, 0.825, 0)';
        startCircle.style.width = '0%';
        startCircle.style.height = '0%';
        startText.style.color = 'var(--timerNoHoverColor)';
    });

    startButton.addEventListener('click', () => {

        if (!startToggle) {
            console.log('hi');
            document.documentElement.style.setProperty('--timerStateColor', 'rgba(230,0,0,1)');
            document.documentElement.style.setProperty('--timerHoverColor', 'white');
            startText.textContent = 'STOP MISSION';

            restartButton.style.opacity = '1';

            startButton.style.backgroundColor = ('rgba(230,0, 0, 0.2)');
            
        } else {
            console.log('bye');
            document.documentElement.style.setProperty('--timerStateColor', 'rgba(255,255,255,1)');
            document.documentElement.style.setProperty('--timerHoverColor', 'black');

            startText.textContent = 'START MISSION';


            restartButton.style.opacity = '0.25';

            startButton.style.backgroundColor = ('rgba(255,255, 255, 0.2');
        }
        startToggle = !startToggle;
    });

    let restartButton = createHTMLChildElement(timerControlsCont, 'div', 'restartTimerButton');
    restartButton.style.opacity = '0.5';

    let restartArrow = createHTMLChildElement(restartButton, 'img', 'restartArrow');
    restartArrow.src = '../Image-Assets/RestartArrow.webp';

    restartButton.addEventListener('mouseenter', () => {
        if(startToggle){restartArrow.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) spinLogo`;}
    });

    restartButton.addEventListener('mouseleave', () => {
        if(startToggle){restartArrow.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) reverseLogo`;}
    })


    let capStatCont = createHTMLChildElement(container, 'div', 'capStatContainer');

    for(let i = 1; i <= capsuleCount; i++){

        let currentStatBox = createHTMLChildElement(capStatCont, 'div', 'capStatBox', null, `capStatBox${i}`);

        let currentText = createHTMLChildElement(currentStatBox, 'div', 'capStatText', `Capsule ${i}`, `capStatText${i}`);

        let currentDot = createHTMLChildElement(currentStatBox, 'div', 'capStatDot', null, `capStatDot${i}`);
    }

}

function createPressureBox(container, capsuleCount){

    let pressCont = createHTMLChildElement(container, 'div', 'pressureMeterContainer', null)

    for(let i = 1; i <= capsuleCount; i++) {

        let currentPressureBox = createHTMLChildElement(pressCont, 'div', 'pressureMeterBox', null, `pressureMeterBox${i}`);
        currentPressureBox.style.setProperty('width',`${60/capsuleCount}%`);
        currentPressureBox.style.setProperty('margin',`0 ${3/capsuleCount}vw`);

        let currentLogoBox = createHTMLChildElement(currentPressureBox, 'div', 'pressureMeterLogoBox', null, `pressureMeterLogoBox${i}`);

        let currentLogo = createHTMLChildElement(currentLogoBox, 'img', 'pressureMeterCapsuleLogo', null, `pressureMeterCapsuleLogo${i}`);
        currentLogo.src = `../Image-Assets/C${i}.webp`;

        let currentMeter = createHTMLChildElement(currentPressureBox, 'div', 'pressureMeter', null, `pressureMeter${i}`);

        let currentTextBox = createHTMLChildElement(currentMeter, 'div', 'pressureTextBox', null, `pressureTextBox${i}`);

        let currentText = createHTMLChildElement(currentTextBox, 'div', 'pressureText', '999', `pressureText${i}`);

        let currentUnit = createHTMLChildElement(currentTextBox, 'div', 'pressureUnit', 'atm', `pressureUnit${i}`);

        let currentFillBox = createHTMLChildElement(currentMeter, 'div', 'pressureMeterFillBox', null, `pressureMeterFillBox${i}`);

        let currentFill = createHTMLChildElement(currentFillBox, 'div', 'pressureMeterFill', null, `pressureMeterFill${i}`);
        
    }

}

function createMagnetosphereBox(container){

    let outerCircle = createHTMLChildElement(container, 'div', 'outerCircle', null);
    
    let innerCircle = createHTMLChildElement(outerCircle, 'div', 'innerCircle', null);

    let magNumber = createHTMLChildElement(outerCircle, 'div', 'magNumber', '99999');

}

function createAltitudeBox(container, capsuleCount){

    let altContainer = createHTMLChildElement(container, 'div', 'capStatAltContainer', null);

    for(let i = 1; i <= capsuleCount; i++){

        let currentStatBox = createHTMLChildElement(altContainer, 'div', 'capAltStatBox', null, `capAltStatBox${i}`);

        let currentText = createHTMLChildElement(currentStatBox, 'div', 'capAltStatText', `Capsule ${i}`, `capAltStatText${i}`);
    }
}

function createTemperatureBox(container, capsuleCount){
    
    let tempCont = createHTMLChildElement(container, 'div', 'temperatureMeterContainer', null);

    for(let i = 1; i <= capsuleCount; i++) {

        let currentTemperatureBox = createHTMLChildElement(tempCont, 'div', 'temperatureMeterBox', null,`temperatureMeterBox${i}`);
        currentTemperatureBox.style.setProperty('height',`${51/capsuleCount}%`);
        currentTemperatureBox.style.setProperty('margin',`${5/capsuleCount}vw 0`);

        let currentLogoBox = createHTMLChildElement(currentTemperatureBox, 'div', 'temperatureMeterLogoBox', null, `temperatureMeterLogoBox${i}`);

        let currentLogo = createHTMLChildElement(currentLogoBox, 'img', 'temperatureMeterCapsuleLogo', null, `temperatureMeterCapsuleLogo${i}`);
        currentLogo.src = `../Image-Assets/C${i}.webp`;

        let currentMeter = createHTMLChildElement(currentTemperatureBox, 'div', 'temperatureMeter', null, `temperatureMeter${i}`);

        let currentText = createHTMLChildElement(currentMeter, 'div', 'temperatureText', '999°C', `temperatureText${i}`);

        let currentFillBox = createHTMLChildElement(currentMeter, 'div', 'temperatureMeterFillBox', null, `temperatureMeterFillBox${i}`);

        let currentFill = createHTMLChildElement(currentFillBox, 'div', 'temperatureMeterFill', null, `temperatureMeterFill${i}`);
        
    }

}

function setCurrentBoxes(CSSClassArray){
    boxElements = [];

    for(let i = 0; i < CSSClassArray.length; i++){
        boxElements.push(CSSClassArray[i]);
    }

    //console.log('box titles: ' + boxElements.join(', '));
}

function disableTabs(tabs, value) {
    if (value){
        for(let i = 0; i < tabs.length; i++){
            document.getElementById(tabs[i]).classList.add('nonClickable');
        }
    } else {
        for(let i = 0; i < tabs.length; i++){
            document.getElementById(tabs[i]).classList.remove('nonClickable');
        }
    }

}

async function sendDataToPython(endpoint, data){
    let number = 0;
    const res = await axios.post(endpoint, {
        value: data
    }).then((response) => {
            number = response.data[data > Object.keys(response.data).length ? Object.keys(response.data).length : data];
            //console.log(Object.keys(response.data).length);
            //console.log(data);
    }).catch((err) => {
        console.error(err);
        console.log("Make sure that your python app is running.")
    })
    return (number);
}
// Function that simplifies the process of adding an id, class, and text to an HTML Element
// The first three parameters ARE required

function createHTMLChildElement(parent, tag, classes, text, id){

    // Create element as child of parent argument

    let elem = parent.appendChild(document.createElement(tag));

    // Add class if string or classes if array

    if (typeof classes == 'object') {
        for (let i = 0; i < classes.length; i++){
            elem.classList.add(classes[i]);
        }
    } else if (classes) {
        elem.classList.add(classes);
    }

    // Add text if a text argument is passed

    if (text) {
        elem.textContent = text;
    }

    // Give the element an id if a class or id argument is passed, otherwise don't create element
    // If you wish to let your class == your id automatically, pass null

    if (id) {
        elem.id = id;
        return document.getElementById(id);
    } else if (classes) {
        elem.id = typeof classes !== 'object' ? classes : classes[0];
        return document.getElementById(classes);
    } else {
        return console.log('You must have an id or class.');
    }
}

function testSO2Bar(){
    const rgbNum = 255;
    for(let i = 0; i <= 50; i++){
        setTimeout(() => {
            let rgbDiff = Math.round(i * 2.55 * 2);
            document.documentElement.style.setProperty('--c', `conic-gradient(from 270deg at 50% 100%, red 0%, rgb(${rgbNum - rgbDiff}, 0, ${rgbDiff}) ${i}%,  rgba(0, 0, 0, 0) ${i}%`);
        }, ((10 * i) + i*5));
        //console.log("yo");
    } 
}

function testSO2Bar2(){
    const rgbNum = 255;
    for(let i = 0; i <= 50; i++){
        setTimeout(() => {
            let rgbDiff = Math.round(i * 2.55);
            document.documentElement.style.setProperty('--c', `conic-gradient(from 270deg at 50% 100%, red 0%, rgb(${rgbDiff}, 0, ${rgbNum - rgbDiff}) ${50 - i}%,  rgba(0, 0, 0, 0) ${50 - i}%`);
        }, (10 * i) + i*5);
        //console.log("yo2");
    } 
}

testSO2Bar();
setTimeout(testSO2Bar2, 1500);

setInterval(() => {
    testSO2Bar();
    setTimeout(testSO2Bar2, 1500);
}, 5000)