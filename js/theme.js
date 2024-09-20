const root = document.documentElement
window.api.onMainMsg('set-win-theme', (event, data) => {
    changeBoxColor(data)
})

function changeBoxColor(model) {

    let dark = {
        cardColor: '#2e2e2e',
        numberColor: '#e3e8ee',
        colonColor: '#e3e8ee',
        transitionTime: '1s'
    }

    let light = {
        cardColor: '#e3e8ee',
        numberColor: '#2e2e2e',
        colonColor: '#2e2e2e',
        transitionTime: '1s'
    }

    switch (model) {
        case "dark":
            setColorProperty(dark)
            break
        case "light":
            setColorProperty(light)
            break
    }

}

function setColorProperty(model) {
    root.style.setProperty('--cards-transition','0s')
    root.style.setProperty('--card-color', model.cardColor)
    root.style.setProperty('--card-number-color', model.numberColor)
    root.style.setProperty('--colon-color', model.colonColor)
    setTimeout(() => {
        root.style.setProperty('--cards-transition', model.transitionTime)
    }, 50)
}