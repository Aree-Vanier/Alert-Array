let setModeFlag = false
let baseCount = 0
let counter = 0
let b = false
let a = false
radio.onReceivedNumber(function (receivedNumber) {
    val = val | receivedNumber;
    basic.showNumber(val)
})
function notify2() {
    let err = base ^ val;
    if (err == 0) {
        basic.showIcon(IconNames.Heart)
        return;
    }
    basic.showNumber(err)
    for (let i = 0; i < 100 * err; i++) {
        servos.turnLeftServo(90);
        basic.pause(1);
        servos.turnLeftServo(-90);
        basic.pause(1);
    }

}
function setMode2() {
    a = input.buttonIsPressed(Button.A)
    b = input.buttonIsPressed(Button.B)
    if (baseCount == -1) {
        basic.showIcon(IconNames.No)
    }
    if (counter >= 2) {
        if (a && b) {
            setModeFlag = false
            init()
            basic.showIcon(IconNames.Yes)
            // files.settingsSaveNumber("count", baseCount)
        } else if (a) {
            baseCount += -1
            if (baseCount <= 0) {
                baseCount = 0
            }
            basic.showNumber(baseCount)
        } else if (b) {
            baseCount += 1
            basic.showNumber(baseCount)
        }
        counter = 0
    }
    if (a || b) {
        counter += 1
    } else {
        counter = 0
    }
}
function init() {
    base = 2 ** (baseCount + 1) - 1
    val = 2 ** baseCount
}
let val = 0b0;
let base = 0b0;
baseCount = -1;
init();

radio.setGroup(1)
// let foo = files.open("data.txt");
// foo.read();

// if (files.settingsReadNumber("count") == -1) {
//     setModeFlag = true
// } else {
//     basic.showNumber(files.settingsReadNumber("count"))
// }

setModeFlag = true;

basic.forever(function () {
    if (setModeFlag) {
        setMode2()
        return;
    }
    // counter += 1
    // if (counter == 100) {
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B))
        notify2()
    if (input.buttonIsPressed(Button.AB))
        init()
    // counter = 0
    // }
})
