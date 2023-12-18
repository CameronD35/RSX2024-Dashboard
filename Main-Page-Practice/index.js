let currentTab = 'MainButton';
let tabsArray = ['MainButton', 'C1Button', 'C2Button', 'C3Button'];

function setUpTabs(tabs){
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

function magRad(initRad, maxRad){
    let currentRad = initRad;
    let radDiff = maxRad - initRad;
    console.log(window.getComputedStyle(document.getElementById('innerCircle')).getPropertyValue('outline-width'))
    let magId = setInterval(() => {
        if (currentRad == maxRad){
            currentRad = maxRad;
            clearInterval(magId);
        } else {
            currentRad += radDiff/100
            document.getElementById('innerCircle').style.setProperty('outline-width', `${currentRad}px`);
            document.getElementById('magNumber').textContent = currentRad;
            console.log(`${currentRad} / ${maxRad}`);
        }
    }, 100);

}

function animationSetup(elem){
    document.getElementById('logoBox').addEventListener('hover', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) spinLogo;`;
    });
}

updateTabs(tabsArray);
setUpTabs(tabsArray);
magRad(0, 100);
animationSetup(document.getElementById('logo'))

