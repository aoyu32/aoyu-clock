const cards = document.getElementsByClassName("card-box")
const root = document.documentElement

window.api.onMainMsg('set-win-theme', (event,data) => {

    console.log("main send msg:",data);
    
    changeBoxColor(data)


})

function changeBoxColor(model) {

    switch (model) {
        case "dark":
            console.log("is dark");
            root.style.setProperty('--card-color', '#2e2e2e')
            root.style.setProperty('--card-number-color','#e3e8ee')
            root.style.setProperty('--colon-color','#e3e8ee')
            break;
        case "light":
            console.log("is light");
            root.style.setProperty('--card-color', '#e3e8ee')
            root.style.setProperty('--card-number-color','#2e2e2e')
            root.style.setProperty('--colon-color','#2e2e2e')
            break;
    }

}