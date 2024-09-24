window.api.onMainMsg('system-resumed', () => {
    console.log('Resuming clock synchronization.');
    // 重新同步时钟的时间，例如从系统时间获取
    initTime()
    // updateTime();
});

//获取dom元素

const hours1 = document.getElementById("hours1")
const hours2 = document.getElementById("hours2")
const minutes1 = document.getElementById("minutes1")
const minutes2 = document.getElementById("minutes2")
const seconds1 = document.getElementById("seconds1")
const seconds2 = document.getElementById("seconds2")
const date = document.getElementById("date")
const background = document.querySelector('body')


const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
var second_ones
var second_tenth
var minute_ones
var minute_tenth
var hour_ones
var hour_tenth

//获取当前时间时分秒
function getTime(isDate) {
    var nowDate = new Date()
    let h = nowDate.getHours()
    let m = nowDate.getMinutes()
    let s = nowDate.getSeconds()
    second_ones = getOnesOrTenth(s, true)
    second_tenth = getOnesOrTenth(s, false)
    minute_ones = getOnesOrTenth(m, true)
    minute_tenth = getOnesOrTenth(m, false)
    hour_ones = getOnesOrTenth(h, true)
    hour_tenth = getOnesOrTenth(h, false)

    if (isDate) {
        return {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth() + 1,
            day: nowDate.getDate(),
            weekDay: nowDate.getDay(),
        }
    } else {
        return {
            second: s,
            minute: m,
            hour: h,
            s_ones: second_ones,
            s_tenth: second_tenth,
            m_ones: minute_ones,
            m_tenth: minute_tenth,
            h_ones: hour_ones,
            h_tenth: hour_tenth,
        }
    }
}

//更新日期
function updateDate() {
    let nowDate = getTime(true)
    date.innerHTML = `${nowDate.year}年${nowDate.month}月${nowDate.day}日  ${weekDays[nowDate.weekDay]}`
}

//初始化时间
function initTime() {
    let nowTime = getTime(false)
    setCardNumber(seconds2, nowTime.s_ones, getNextNumber(nowTime.s_ones, 'd'), true)
    setCardNumber(seconds1, nowTime.s_tenth, getNextNumber(nowTime.s_tenth, 'h'), true)
    setCardNumber(minutes2, nowTime.m_ones, getNextNumber(nowTime.m_ones, 'd'), true)
    setCardNumber(minutes1, nowTime.m_tenth, getNextNumber(nowTime.m_tenth, 'h'), true)
    setCardNumber(hours2, nowTime.h_ones, getNextNumber(nowTime.h_ones, 't'), true)
    setCardNumber(hours1, nowTime.h_tenth, getNextNumber(nowTime.h_tenth, 'o'), true)
}

//实时更新时间
function updateTime() {
    let nowTime = getTime(false)
    //更新秒数个位
    setCardNumber(seconds2, nowTime.s_ones, getNextNumber(nowTime.s_ones, 'd'), false)
    //判断秒数个位是否等于9，等于更新秒数十位
    if (nowTime.s_ones == 9) {
        //更新秒数十位
        setCardNumber(seconds1, nowTime.s_tenth, getNextNumber(nowTime.s_tenth, 'h'), false)
    }
    //判断秒数是否等于59，等于更新分数个位
    if (nowTime.second == 59) {
        //更新分数个位
        setCardNumber(minutes2, nowTime.m_ones, getNextNumber(nowTime.m_ones, 'd'), false)
        //判断分数个位是否等于9，秒数是否等于59，等于更新分数十位
        if (nowTime.m_ones == 9) {
            //更新分数十位
            setCardNumber(minutes1, nowTime.m_tenth, getNextNumber(nowTime.m_tenth, 'h'), false)
            console.log(nowTime.m);
            //判断分数是否等于59,等于更新时数个位
            if (nowTime.minute == 59) {
                //更新分数个位
                setCardNumber(hours2, nowTime.h_ones, getNextNumber(nowTime.h_ones, 't'), false)

                //判断分数、秒数是否等于59，实数个位是否等于3，等于则更新时数十位
                if (nowTime.h_ones == 3) {
                    //更新时数十位
                    setCardNumber(hours1, nowTime.h_tenth, getNextNumber(nowTime.h_tenth, 'o'), false)
                }
            }
        }
    }



}

//获取个位或十位数
function getOnesOrTenth(Number, isOnes) {
    if (isOnes) {
        return Number % 10
    } else {
        return Math.floor(Number / 10)
    }
}

//判断下一位数字
function getNextNumber(currentNumber, type) {
    switch (type) {
        case 'd':
            return currentNumber == 9 ? 0 : currentNumber + 1
            break;
        case 'h':
            return currentNumber == 5 ? 0 : currentNumber + 1
            break
        case 't':
            return currentNumber == 3 ? 0 : currentNumber + 1
            break
        default:
            return currentNumber == 2 ? 0 : currentNumber + 1
            break;
    }
}

//更新dom元素
function setCardNumber(dom, currentTime, nextTime, isInit) {

    dom.innerHTML = `<div class="card1 card-item">${nextTime}</div>
            <div class="card2 card-item">${nextTime}</div>
            <div class="card3 card-item">${currentTime}</div>
            <div class="card4 card-item">${currentTime}</div>`

    if (isInit == false) {
        setTimeout(() => {
            dom.querySelector(".card2").style.transform = 'rotateX(0deg)'
            dom.querySelector(".card3").style.transform = 'rotateX(-180deg)'
        }, 20)
    }
}


//右键菜单
background.addEventListener('contextmenu', (ev) => {
    ev.preventDefault()
    window.api.send("right-menu")
})

updateDate()
initTime()
setInterval(updateTime, 1000)
