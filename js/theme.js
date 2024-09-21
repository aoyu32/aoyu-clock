const root = document.documentElement
window.api.onMainMsg('set-win-theme', (event, data) => {
    changeBoxColor(data)
})

function changeBoxColor(model) {

    // let dark = {
    //     darkcolor: '#2e2e2e',
    //     numberColor: '#e3e8ee',
    //     colonColor: '#e3e8ee',
    //     transitionTime: '1s'
    // }

    // let light = {
    //     cardColor: '#e3e8ee',
    //     numberColor: '#2e2e2e',
    //     colonColor: '#2e2e2e',
    //     transitionTime: '1s'
    // }

    switch (model) {
        case "dark":
            setColorProperty('#2e2e2e','#e3e8ee')
            break
        case "light":
            setColorProperty('#e3e8ee','#2e2e2e')
            break
    }

}

function setColorProperty(cardColor,numColor) {
    root.style.setProperty('--cards-transition','0s')
    root.style.setProperty('--card-color', cardColor)
    root.style.setProperty('--card-number-color',numColor) 
    root.style.setProperty('--colon-color',numColor)
    setTimeout(() => {
        root.style.setProperty('--cards-transition', '1s')
    }, 50)
}