// This sets up the slider found in the bottom center; Handles the text change when dragging the slider and changes the text according to the sliders position

export default function setupSlider(slider, valueDisplay){
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