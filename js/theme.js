const root = document.documentElement
const card2 = document.querySelector(".card2")
const card3 = document.querySelector(".card3")
window.api.onMainMsg('set-win-theme', (event, data) => {

    console.log("main send msg:", data);

    changeBoxColor(data)


})

function changeBoxColor(model) {

    switch (model) {
        case "dark":
            console.log("is dark");
            root.style.setProperty('--cards-transition', '0s')
            root.style.setProperty('--card-color', '#2e2e2e')
            root.style.setProperty('--card-number-color', '#e3e8ee')
            root.style.setProperty('--colon-color', '#e3e8ee')
            setTimeout(() => {
                root.style.setProperty('--cards-transition', '1s')
            }, 50)
            // root.style.setProperty('--cards-transition','1s')
            break;
        case "light":
            console.log("is light");
            root.style.setProperty('--cards-transition', '0s')
            root.style.setProperty('--card-color', '#e3e8ee')
            root.style.setProperty('--card-number-color', '#2e2e2e')
            root.style.setProperty('--colon-color', '#2e2e2e')
            setTimeout(() => {
                root.style.setProperty('--cards-transition', '1s')
            }, 50)
            break;
    }

}