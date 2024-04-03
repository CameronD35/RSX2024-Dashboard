
import Graph from './modules/lineChart.js';

import createHTMLChildElement from './modules/createElement.js';

import logoAnimationSetup from './modules/logoAnimation.js';

import setupSlider from './modules/slider.js'
// BEGIN SETUP CODE

let currentTab = 'MainButton';
let tabsArray = [];
let boxElements = [];
let timerState = false;

let currentPage = 0;

let graphArray = [];

// Indicates if the page was just started or not
let pageStart = true;

let num = 0;
// Object of page properties; names of box classes and box titles
const pageProperties = {
    0: {
        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']

    },

    1: {
        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Altitude', 'Temperature']
    },

    2: {
        CSSClassNames: ['SO2', 'MisStat', 'Pres', 'Alt', 'Temp'],

        titles: ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Altitude', 'Temperature']
    },

    3: {

        CSSClassNames: ['Mag', 'MisStat', 'Pres', 'Alt', 'Temp'],

        titles: ['Magnetosphere', 'Mission Status', 'Pressure', 'Altitude', 'Temperature']
    }
}

// END SETUP CODE


// Object full of functions for managing the page
let pageManage = {
    // '0' is the main page, the rest correspond to capsule #s
    0: function(CSSClasses, boxTitles){

        console.log('Creating MAIN page.')

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 4]], CSSClasses, boxTitles);
        //createSO2Box(document.querySelector(".SO2BoxContent"), 2);
        createMissionStagesBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2', '???'], timerState);
        createCapsuleStatusBox(document.querySelector('.MisStatBoxContent'), 3, null, false);
        
        createPressureBox(document.querySelector('.PresBoxContent'), 3);
        

        createMagnetosphereBox(document.querySelector('.MagBoxContent'));

        createAltitudeBox(document.querySelector('.AltBoxContent'), 3, 1);

        createTemperatureBox(document.querySelector('.TempBoxContent'), 3);
    
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);

        if(!pageStart){
            capsule1.changeParent(document.querySelector('.SO2BoxContent'), capsule1.sulfurDioxideBar);
            capsule1.changeParent(document.querySelector('.SO2BoxContent'), capsule1.sulfurDioxideChart);
            capsule1.sulfurDioxideChartSVG.resize(250, 300);
            capsule1.changeParent(document.querySelector('.pressureMeterContainer'), capsule1.pressureMeter);
            capsule1.changeParent(document.querySelector('.temperatureMeterContainer'), capsule1.temperatureMeter);

            capsule2.changeParent(document.querySelector('.SO2BoxContent'), capsule2.sulfurDioxideBar);
            capsule2.changeParent(document.querySelector('.SO2BoxContent'), capsule2.sulfurDioxideChart);
            capsule2.sulfurDioxideChartSVG.resize(250, 300);
            capsule2.changeParent(document.querySelector('.pressureMeterContainer'), capsule2.pressureMeter);
            capsule2.changeParent(document.querySelector('.temperatureMeterContainer'), capsule2.temperatureMeter);

            capsule3.changeParent(document.querySelector('.pressureMeterContainer'), capsule3.pressureMeter);
            capsule3.changeParent(document.querySelector('.temperatureMeterContainer'), capsule3.temperatureMeter);
        }

        document.documentElement.style.setProperty('--numOfCapsules', 3);
        //Tets function -- Not to be used in final deployment
        //magRad(0, 12);
    },

    1: function(CSSClasses, boxTitles){
        console.log('Creating first page.');

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 3]], CSSClasses, boxTitles, [60, 40]);
        //createSO2Box();
        createMissionStagesBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2', '???'], timerState);
        // createMissionStatusBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2', '???'], timerState);


        createPressureBox(document.querySelector('.PresBoxContent'), 1, 1);

        createAltitudeBox(document.querySelector('.AltBoxContent'), 1, 1);

        createTemperatureBox(document.querySelector('.TempBoxContent'), 1);
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);

        capsule1.changeParent(document.querySelector('.SO2BoxContent'), capsule1.sulfurDioxideBar);
        capsule1.changeParent(document.querySelector('.SO2BoxContent'), capsule1.sulfurDioxideChart);
        capsule1.changeParent(document.querySelector('.MisStatBoxContent'), capsule1.missionStatusPoints);
        capsule1.changeParent(document.querySelector('.pressureMeterContainer'), capsule1.pressureMeter);
        capsule1.changeParent(document.querySelector('.temperatureMeterContainer'), capsule1.temperatureMeter);

        capsule1.sulfurDioxideChartSVG.resize(300, 400);
        document.documentElement.style.setProperty('--numOfCapsules', 1);
    },

    2: function(CSSClasses, boxTitles){
        console.log('Creating second page.');

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 3]], CSSClasses, boxTitles, [60, 40]);
        //createSO2Box();
        createMissionStagesBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2', '???'], timerState);
        // createMissionStatusBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2', '???'], timerState);
        createPressureBox(document.querySelector('.PresBoxContent'), 1, 1);
        createAltitudeBox(document.querySelector('.AltBoxContent'), 1, 2);
        createTemperatureBox(document.querySelector('.TempBoxContent'), 1);
        //capsule1.changeParent(document.getElementById('box3'), capsule1.sulfurDioxideBar);
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);

        capsule2.changeParent(document.querySelector('.SO2BoxContent'), capsule2.sulfurDioxideBar);
        capsule2.changeParent(document.querySelector('.SO2BoxContent'), capsule2.sulfurDioxideChart);
        capsule2.changeParent(document.querySelector('.MisStatBoxContent'), capsule2.missionStatusPoints);
        capsule2.changeParent(document.querySelector('.pressureMeterContainer'), capsule2.pressureMeter);
        capsule2.changeParent(document.querySelector('.temperatureMeterContainer'), capsule2.temperatureMeter);

        capsule2.sulfurDioxideChartSVG.resize(300, 400);
        document.documentElement.style.setProperty('--numOfCapsules', 1);
    },

    3: function(CSSClasses, boxTitles){
        console.log('Creating third page.');

        createBoxStructure(document.querySelector('.boxContainer'), 2, [[false, 2], [true, 3]], CSSClasses, boxTitles, [60, 40]);
        //createSO2Box();
        createMissionStagesBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2'], timerState);
        // createMissionStatusBox(document.querySelector('.MisStatBoxContent'), 3, ['GSE', 'TE-1', 'TE-2'], timerState);
        createPressureBox(document.querySelector('.PresBoxContent'), 1, 3);
        createAltitudeBox(document.querySelector('.AltBoxContent'), 1, 3);
        createTemperatureBox(document.querySelector('.TempBoxContent'), 1);
        //capsule1.changeParent(document.getElementById('box3'), capsule1.sulfurDioxideBar);
        setCurrentBoxes(CSSClasses);
        //console.log(boxElements);

        capsule3.changeParent(document.querySelector('.pressureMeterContainer'), capsule3.pressureMeter);
        capsule3.changeParent(document.querySelector('.temperatureMeterContainer'), capsule3.temperatureMeter);

        document.documentElement.style.setProperty('--numOfCapsules', 1);
    
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

            console.log(`elements : ${boxArray}`)
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

class CapsuleObject {

    constructor(capsuleNumber, testNum, hasSO2Sensor, hasMagnetometer){
        this.parent = false;

        if(hasSO2Sensor){
            this.sulfurDioxideBar = createSO2Bar(capsuleNumber, document.querySelector('.SO2BoxContent'), testNum);
            this.sulfurDioxideChartArray = createSO2Graph(capsuleNumber, document.querySelector('.SO2BoxContent'));

            this.sulfurDioxideChart = this.sulfurDioxideChartArray[0];

            this.sulfurDioxideChartSVG = this.sulfurDioxideChartArray[1];

            console.log(this.sulfurDioxideChart);
        }

        this.missionStatusPoints = createCapsuleStatusBox(cleanElement(document.querySelector('.MisStatBoxContent')), 1, ['hi', 'hi', 'hi'], true);

        //console.log(this.missionStatusPoints)

        this.pressureMeter = createPressureMeter(document.querySelector('.pressureMeterContainer'), capsuleNumber, true, testNum);

        if (hasMagnetometer){
            this.magnetosphereCircle = 0;
        }
        this.altitude = 0;
        this.temperatureMeter = createTemperatureMeter(document.querySelector('.temperatureMeterContainer'), capsuleNumber, true, testNum);

        this.data = {
            pressureData: [],

            altitudeData: [],

            temperatureData: [],

            sulfurDioxideData: [],

            magnetosphereData: []
        }

        //console.log(this.sulfurDioxideBar);
    }

    changeParent(newParent, objectElement){
        newParent.appendChild(objectElement);
        this.parent = newParent;
    }

}



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

                }, 500)
                console.log(currentPage);

            }


            randomizeBackground();

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

// This utilizes the above functions to create the 'skeleton' of the page, which will be used across all tabs (TF)
function createPageLayout(){
    createNavigation(document.getElementById('navList'), 3);
    logoAnimationSetup(document.getElementById('logo'));
    setupSlider(document.querySelector('.slider'), document.querySelector('.sliderNumInput'));
}


// This creates the main boxes found in the center of the page, allows customization of the # of boxes in each row and adjusts width accordingly
// rows: integer; definies how many rows will be present
// rowLengths: array; allows definition of the boxes in each row and their lengths.
// rowsLength format: [[auto-length, boxes amount #1], [auto-length, boxes amount #2], ...]] auto-length: boolean, boxes amount #i: integer
// NOTE: rows == rowLengths.length

function createBoxStructure(parent, rows, rowLengths, boxNames, titles, height){
    //console.log('im beign called')
    let boxNumber = 1;

    let boxWidth = [];

    let rowHeights = [];
    
    // Checks to see if auto-length is set to true and if so autosets the length. 
    // Else, it uses CSS definied length
    for (let d = 0; d < rowLengths.length; d++){
        rowLengths[d][0]? boxWidth.push(100/rowLengths[d][1]) : boxWidth.push('');
    }

    //console.log(boxWidth);

    for(let i = 1; i <= rows; i++){

        let currentRow = createHTMLChildElement(parent, 'div', 'dashRow', null, `dashRow${i}`);

        // if a height argument is passed, set the height of rows
        if (height) { currentRow.style.height = `${height[i-1]}%`; }

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


function createSO2Bar(capsuleNumber, container, testNum) {
    let currentSO2Container = createHTMLChildElement(container, 'div', 'SO2BarContainer', null, `SO2BarContainer${capsuleNumber}-P${currentPage}`);

    let currentSO2Box = createHTMLChildElement(currentSO2Container, 'div', `SO2BarBox`, null, `SO2BarBox${capsuleNumber}-P${currentPage}`);

    let currentSO2Num = createHTMLChildElement(currentSO2Box, 'div', 'SO2Num', `${testNum}`, `SO2Num${capsuleNumber}-P${currentPage}`);

    let currentSO2Unit = createHTMLChildElement(currentSO2Num, 'div', 'SO2Unit', 'ppm', `SO2Unit${capsuleNumber}-P${currentPage}`);
    
    console.log(currentSO2Container);

    return currentSO2Container;
}

function createSO2Graph(capsuleNumber, container){

    let currentSvgContainer = createHTMLChildElement(container, 'div', 'svgContainer', null, `svgContainer${capsuleNumber}-P${currentPage}`);


        let currentGraph = new Graph(250, 300, {top: 20, bottom: 20, right: 30, left: 30}, `#${currentSvgContainer.id}`, null, ['time', 'concentration'], ['red', 'blue'], 'SO2Chart');

        graphArray.push(currentGraph);

        currentGraph.create();
    
        return [currentSvgContainer, currentGraph];
}


//console.log(createSO2Bar(5, document.getElementById('box1')));

// Creates the stages and timer buttons in the 'mission status' box. Intended to be global
function createMissionStagesBox(container, numOfCapsules, stages, timerRunning, capsuleNumber){

    console.log(`timer state: ${timerState}`);

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

        timerRunning = !timerRunning;

        checkToggleState(timerRunning);

    });

    let restartButton = createHTMLChildElement(timerControlsCont, 'div', 'restartTimerButton');
    restartButton.style.opacity = '0.5';

    let restartArrow = createHTMLChildElement(restartButton, 'img', 'restartArrow');
    restartArrow.src = '../Image-Assets/RestartArrow.webp';

    restartButton.addEventListener('mouseenter', () => {
        if(timerRunning){restartArrow.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) reverseLogo`;}
    });

    restartButton.addEventListener('mouseleave', () => {
        if(timerRunning){restartArrow.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) spinLogo`;}
    });

    checkToggleState();

    function checkToggleState(){
        //console.log(timerRunning)
    
            if (timerRunning) {
                console.log('hi');
                document.documentElement.style.setProperty('--timerStateColor', 'var(--rsxRed)');
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
    
            timerState = timerRunning;
        }
    
    
        console.log(`timer check 2: ${timerState}`);
}

// Creates the status of the capsules. If singleCapsule is true, i9t lists the components of that capsule, otheriwse a general status for all capsules is provided
function createCapsuleStatusBox(container, numOfCapsules, statusPointsArray, singleCapsule){

    let capStatCont = createHTMLChildElement(container, 'div', 'capStatContainer');

    if(!singleCapsule){

        for (let i = 1; i <= numOfCapsules; i++){

            let currentStatBox = createHTMLChildElement(capStatCont, 'div', 'capStatBox', null, `capStatBox${i}`);
    
            let currentText = createHTMLChildElement(currentStatBox, 'div', 'capStatText', `Capsule ${i}`, `capStatText${i}`);
    
            let currentDot = createHTMLChildElement(currentStatBox, 'div', 'capStatDot', null, `capStatDot${i}`);
        }

        console.log('yreyuwgfsf')

        return;

    } else {
        for(let j = 1; j <= statusPointsArray.length; j++){
            console.log('test');
            let currentStatusPointText = createHTMLChildElement(capStatCont, 'div', 'capStatPoint', statusPointsArray[j-1], `capStatPoint${j}`);

        }

        return capStatCont;
    }

}


function createPressureBox(container, numOfCapsules, capsuleNumber){

    let pressCont = createHTMLChildElement(container, 'div', 'pressureMeterContainer', null)

    // if(numOfCapsules != 1){

        
    //     for(let i = 1; i <= numOfCapsules; i++) {

    //         createPressureMeter(pressCont, i, true, numOfCapsules);

    //     }

    //     return;

    // } else {

    //     createPressureMeter(pressCont, capsuleNumber, false, 1);

    // }

}

function createPressureMeter(container, capsuleNumber, includeLogo, num){

        let currentPressureBox = createHTMLChildElement(container, 'div', 'pressureMeterBox', null, `pressureMeterBox${capsuleNumber}`);

            currentPressureBox.style.setProperty('width',`calc(75%/var(--numOfCapsules))`);
            currentPressureBox.style.setProperty('margin',`0 calc(3vw/var(--numOfCapsules))`);

            if (includeLogo){
                let currentLogoBox = createHTMLChildElement(currentPressureBox, 'div', 'pressureMeterLogoBox', null, `pressureMeterLogoBox${capsuleNumber}`);

                let currentLogo = createHTMLChildElement(currentLogoBox, 'img', 'pressureMeterCapsuleLogo', null, `pressureMeterCapsuleLogo${capsuleNumber}`);
                currentLogo.src = `../Image-Assets/C${capsuleNumber}.webp`;
            }

            let currentMeter = createHTMLChildElement(currentPressureBox, 'div', 'pressureMeter', null, `pressureMeter${capsuleNumber}`);

            let currentTextBox = createHTMLChildElement(currentMeter, 'div', 'pressureTextBox', null, `pressureTextBox${capsuleNumber}`);

            let currentText = createHTMLChildElement(currentTextBox, 'div', 'pressureText', num, `pressureText${capsuleNumber}`);

            let currentUnit = createHTMLChildElement(currentTextBox, 'div', 'pressureUnit', 'atm', `pressureUnit${capsuleNumber}`);

            let currentFillBox = createHTMLChildElement(currentMeter, 'div', 'pressureMeterFillBox', null, `pressureMeterFillBox${capsuleNumber}`);

            let currentFill = createHTMLChildElement(currentFillBox, 'div', 'pressureMeterFill', null, `pressureMeterFill${capsuleNumber}`);

            return currentPressureBox;
}


function createMagnetosphereBox(container){

    let outerCircle = createHTMLChildElement(container, 'div', 'outerCircle', null);
    
    let innerCircle = createHTMLChildElement(outerCircle, 'div', 'innerCircle', null);

    let magNumber = createHTMLChildElement(outerCircle, 'div', 'magNumber', '99999');

}

function createAltitudeBox(container, numOfCapsules, startCapsule){

    let altContainer = createHTMLChildElement(container, 'div', 'capStatAltContainer');

    for(let i = startCapsule; i <= (startCapsule + numOfCapsules - 1); i++){

        let currentStatBox = createHTMLChildElement(altContainer, 'div', 'capAltStatBox', null, `capAltStatBox${i}`);

        let currentText = createHTMLChildElement(currentStatBox, 'div', 'capAltStatText', `Capsule ${i}`, `capAltStatText${i}`);

        let currentData = createHTMLChildElement(currentStatBox, 'div', 'capAltStatData', `9999 ft.`, `capAltStatData${i}`);
    }

    let tableElement = createHTMLChildElement(container, 'table', 'atmosphericLayerTable');

    let layerArray = ['Exosphere', 'Thermosphere', 'Mesosphere', 'Stratosphere', 'Troposphere'];

    for (let i = 1; i <= layerArray.length; i++){

        let currentTableRow = createHTMLChildElement(tableElement, 'tr', 'atmosphericLayerRow', null, `atmosphericLayerRow${i}`)

        let currentTableHeader = createHTMLChildElement(currentTableRow, 'th', 'atmosphericLayerHeader', layerArray[i-1], `atmosphericLayerHeader${i}`)

        for (let j = 1; j <= numOfCapsules; j++) {

            let currentTableCell = createHTMLChildElement(currentTableRow, 'td', 'atmosphericLayerCell', null, `atmosphericLayerCell${i}-${j}`);

            let currentTableCellImage = createHTMLChildElement(currentTableCell, 'img', 'atmosphericLayerCellImage', null, `atmosphericLayerCellImage${i}-${j}`);

            currentTableCellImage.src = `../Image-Assets/C${j + startCapsule - 1}.webp`;

        }
    }
}

function createTemperatureBox(container, numOfCapsules, capsuleNumber){
    
    let tempCont = createHTMLChildElement(container, 'div', 'temperatureMeterContainer', null);

    // for(let i = 1; i <= numOfCapsules; i++) {

    //     createTemperatureMeter(tempCont, i, true, 54);
        
    // }

}

function createTemperatureMeter(container, capsuleNumber, includeLogo, num){

        let currentTemperatureBox = createHTMLChildElement(container, 'div', 'temperatureMeterBox', null,`temperatureMeterBox${capsuleNumber}`);
        currentTemperatureBox.style.setProperty('height',`calc(51%/var(--numOfCapsules))`);
        currentTemperatureBox.style.setProperty('margin',`calc(5vw/var(--numOfCapsules)) 0`);

        if (includeLogo){
            let currentLogoBox = createHTMLChildElement(currentTemperatureBox, 'div', 'temperatureMeterLogoBox', null, `temperatureMeterLogoBox${capsuleNumber}`);

            let currentLogo = createHTMLChildElement(currentLogoBox, 'img', 'temperatureMeterCapsuleLogo', null, `temperatureMeterCapsuleLogo${capsuleNumber}`);
            currentLogo.src = `../Image-Assets/C${capsuleNumber}.webp`;
        }

        let currentMeter = createHTMLChildElement(currentTemperatureBox, 'div', 'temperatureMeter', null, `temperatureMeter${capsuleNumber}`);

        let currentText = createHTMLChildElement(currentMeter, 'div', 'temperatureText', `${num}°C`, `temperatureText${capsuleNumber}`);

        let currentFillBox = createHTMLChildElement(currentMeter, 'div', 'temperatureMeterFillBox', null, `temperatureMeterFillBox${capsuleNumber}`);

        let currentFill = createHTMLChildElement(currentFillBox, 'div', 'temperatureMeterFill', null, `temperatureMeterFill${capsuleNumber}`);

        return currentTemperatureBox;
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
    })

    .then((response) => {
            number = response.data[data > Object.keys(response.data).length ? Object.keys(response.data).length : data];
            //console.log(Object.keys(response.data).length);
            //console.log(data);
    })
    
    .catch((err) => {
        console.error(err);
        console.log("Make sure that your python app is running.")
    })

    return (number);
}

function ifElementExists(element, func) {
    if (element) {
        console.log('work');
        func();
    }

    else {
        console.log('no work');
    }
}

function cleanElement(element){
    if(element && element.hasChildNodes()){
        element.replaceChildren();

        return element;
    }
}


// Creates the animation for the backgorund by moving elemments by random percenatges (0 - 20%)
function randomizeBackground(){
    for(let i = 1; i <= 3; i++){
        document.getElementById(`backgroundElem${i}`).style.transform = `translate(${Math.round(Math.random() * 20)}%, ${Math.round(Math.random() * 20)}%)`;
        // document.getElementById(`backgroundElem${i}`).style.transform = `rotate(${Math.round(Math.random() * 30)}deg)`;
        // document.getElementById(`backgroundElem${i}`).style.transform = `scale(${100 - Math.round(Math.random() * 10)}%)`;
    }
}
setInterval(() => {
    ++num;
    ifElementExists(document.getElementById('capAltStatData3'), () => {
        document.getElementById('capAltStatData3').innerText = num;
    });
}, 1)



// THIS IS ALL TESTING STUFF

// function testSO2Bar(){
//     const rgbNum = 255;
//     for(let i = 0; i <= 50; i++){
//         setTimeout(() => {
//             let rgbDiff = Math.round(i * 2.55 * 2);
//             document.documentElement.style.setProperty('--c', `conic-gradient(from 270deg at 50% 100%, red 0%, rgb(${rgbNum - rgbDiff}, 0, ${rgbDiff}) ${i}%,  rgba(0, 0, 0, 0) ${i}%`);
//         }, ((10 * i) + i*5));
//         //console.log("yo");
//     } 
// }

// function testSO2Bar2(){
//     const rgbNum = 255;
//     for(let i = 0; i <= 50; i++){
//         setTimeout(() => {
//             let rgbDiff = Math.round(i * 2.55);
//             document.documentElement.style.setProperty('--c', `conic-gradient(from 270deg at 50% 100%, red 0%, rgb(${rgbDiff}, 0, ${rgbNum - rgbDiff}) ${50 - i}%,  rgba(0, 0, 0, 0) ${50 - i}%`);
//         }, (10 * i) + i*5);
//         //console.log("yo2");
//     } 
// }

// testSO2Bar();
// setTimeout(testSO2Bar2, 1500);

// setInterval(() => {
//     testSO2Bar();
//     setTimeout(testSO2Bar2, 1500);
// }, 5000)

// // Rad units are in vw (TF)
// function magRad(initRad, maxRad){

//     let currentRad = initRad;
//     let radDiff = maxRad - initRad;

//     console.log(window.getComputedStyle(document.getElementById('innerCircle')).getPropertyValue('outline-width'))

//     let timerId = setInterval(() => {

//         if ((currentRad >= maxRad) || currentPage != 0){
            
//             currentRad = maxRad;
//             clearInterval(timerId);

//         } else {

//             currentRad += radDiff/100

//             document.getElementById('innerCircle').style.setProperty('outline-width', `${currentRad}vmin`);
//             document.getElementById('magNumber').textContent = `${Math.round(currentRad)}00`;

//             //console.log(`${currentRad} / ${maxRad}`);

//         }

//     }, 100);

// }

// // (TF) 
// function setTemperature(tempElem, fillElem){
//     let fillSize = 0;
//     let timerId = setInterval(() => {
//         if (fillSize >= 100){
//             clearInterval(timerId);
//         } else {
//             fillSize++;
//             tempElem.textContent = (`${fillSize}°C`);
//             fillElem.style.setProperty('width', `${fillSize}%`);
//         }
//     }, 100);
// }
// // (TF)
// function setPressure(pressureElem, fillElem){
//     let fillSize = 0;
//     let timerId = setInterval(() => {
//         if (fillSize >= 300){
//             clearInterval(timerId);
//         } else {
//             fillSize += 3;
//             pressureElem.textContent = (`${fillSize}`);
//             fillElem.style.setProperty('height', `${fillSize/3}%`);
//         }
//     }, 100);
// }

// TESTING STUFF
// for(let i = 1; i <= 3; i++){
//     setTemperature(document.getElementById(`temperatureText${i}`), document.getElementById(`temperatureMeterFill${i}`));
// }

// // TESTING STUFF
// for(let i = 1; i <= 3; i++){
//     setPressure(document.getElementById(`pressureText${i}`), document.getElementById(`pressureMeterFill${i}`));
// }


// Function call that sets the website page to the main page on startup

pageManage[0](['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'], ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']);

let capsule1 = new CapsuleObject(1, 56, true, false);

let capsule2 = new CapsuleObject(2, 77, true, false);

let capsule3 = new CapsuleObject(3, 78, false, true);

document.querySelector('.boxContainer').replaceChildren();

pageManage[0](['SO2', 'MisStat', 'Pres', 'Mag', 'Alt', 'Temp'], ['SO₂ Concentration', 'Mission Status', 'Pressure', 'Magnetosphere', 'Altitude', 'Temperature']);

createPageLayout();

capsule1.changeParent(document.querySelector('.SO2BoxContent'), capsule1.sulfurDioxideBar);
capsule1.changeParent(document.querySelector('.SO2BoxContent'), capsule1.sulfurDioxideChart);
capsule1.changeParent(document.querySelector('.pressureMeterContainer'), capsule1.pressureMeter);
capsule1.changeParent(document.querySelector('.temperatureMeterContainer'), capsule1.temperatureMeter);

capsule2.changeParent(document.querySelector('.SO2BoxContent'), capsule2.sulfurDioxideBar);
capsule2.changeParent(document.querySelector('.SO2BoxContent'), capsule2.sulfurDioxideChart);
capsule2.changeParent(document.querySelector('.pressureMeterContainer'), capsule2.pressureMeter);
capsule2.changeParent(document.querySelector('.temperatureMeterContainer'), capsule2.temperatureMeter);

capsule3.changeParent(document.querySelector('.pressureMeterContainer'), capsule3.pressureMeter);
capsule3.changeParent(document.querySelector('.temperatureMeterContainer'), capsule3.temperatureMeter);

console.log(capsule1)
