// 定义三个尺寸的 CSS 变量值
const sizes = {
    large: {
        '--background-width': '1500px',
        '--background-height': '380px',
        '--logo-date-fontsize': '21.43px',
        '--logo-date-height': '33.93px',
        '--card-width': '250px',
        '--card-height': '321.43px',
        '--card-border-radius': '12.5px',
        '--card-number-fontsize': '271.43px',
        '--card-center-height': '2.71px',
        '--colon-box-width': '50px',
        '--colon-size': '21.43px',
        '--colon-margin': '38px',
        '--colon-border-radius': '6.43px',
        '--clock-margin': '6.25px',
        '--cards-transition': '0s'
    },
    middle: {
        '--background-width': '1200px',
        '--background-height': '280px',
        '--logo-date-fontsize': '20px',
        '--logo-date-height': '30px',
        '--card-width': '200px',
        '--card-height': '250px',
        '--card-border-radius': '10px',
        '--card-number-fontsize': '200px',
        '--card-center-height': '2px',
        '--colon-box-width': '40px',
        '--colon-size': '20px',
        '--colon-margin': '30px',
        '--colon-border-radius': '5px',
        '--clock-margin': '5px',
        '--cards-transition': '0s'
    },
    small: {
        '--background-width': '400px',
        '--background-height': '100px',
        '--logo-date-fontsize': '7.14px',
        '--logo-date-height': '10.71px',
        '--card-width': '66.67px',
        '--card-height': '89.29px',
        '--card-border-radius': '3.57px',
        '--card-number-fontsize': '71.43px',
        '--card-center-height': '0.71px',
        '--colon-box-width': '13.33px',
        '--colon-size': '7.14px',
        '--colon-margin': '10px',
        '--colon-border-radius': '1.79px',
        '--clock-margin': '1.67px',
        '--cards-transition': '0s'
    }
};

// 切换尺寸的函数
function updateRootVariables(size) {
    const root = document.documentElement;
    const newVariables = sizes[size];

    for (const [key, value] of Object.entries(newVariables)) {
        root.style.setProperty(key, value);
    }

    setTimeout(() => {
        root.style.setProperty('--cards-transition', '1s')
    }, 50)
}

window.api.onMainMsg('change-clock-size', (event, data) => {
    console.log(data);
    updateRootVariables(data)
})
