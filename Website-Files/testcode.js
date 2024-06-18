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