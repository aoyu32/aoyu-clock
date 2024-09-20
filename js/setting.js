const winBtns = document.querySelectorAll(".btn")

console.log(winBtns);
console.log(winBtns[1]);
const maxicon = winBtns[1].querySelector('i')
console.log(maxicon);


winBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action')
        window.api.send('win:status', action)
    })
})

window.api.onMainMsg("is-win-max", (event, data) => {
    console.log(data);
    if (data) {
        maxicon.classList.replace('icon-stop', 'icon-fuzhi2')
    } else {
        maxicon.classList.replace('icon-fuzhi2', 'icon-stop')
    }

})
