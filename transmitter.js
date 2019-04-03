  //id of this sender
let id = files.settingsReadNumber("id");
//this device is ready to send data
let active = false;

//a and b both just pressed last frame
let bothJustPressed = false;

let counter = 0;

input.onShake(function () {
    radio.sendNumber(Math.pow(2, id));
})

//initialisation
if (id != -1) {
    basic.showIcon(IconNames.Yes);
    //start it up
    active = true;
} else {
    basic.showIcon(IconNames.No);
}
radio.setGroup(1)

basic.forever(function () {
    let a = input.buttonIsPressed(Button.A);
    let b = input.buttonIsPressed(Button.B);

    if (a && b && !active && !bothJustPressed) {
        //start it up
        active = true;
        basic.showIcon(IconNames.Yes);
        counter = 0;
        files.settingsSaveNumber("id", id);
        bothJustPressed = true;
    } else if (a && b && active && counter > 10 && !bothJustPressed) {
        //stop it
        active = false;
        basic.showNumber(id);
        counter = 0;
        bothJustPressed = true;
        files.settingsSaveNumber("id", -1);
    } else if (b && counter > 10 && !active) {
        id++;
        basic.showNumber(id);
    } else if (a && counter > 10 && !active) {
        //stay on default id otherwise
        id--;

        //id can't be negative
        if (id < 0) {
            id = 0;
        }

        basic.showNumber(id);
    } else if (a || b) {
        counter++;
    } else {
        counter = 0;
        bothJustPressed = false;
    }
})
