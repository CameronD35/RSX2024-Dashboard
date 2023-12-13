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

updateTabs(tabsArray);
setUpTabs(tabsArray);

