// 获取搜索框元素
const clock = document.querySelector('.clock-background');
let isWinMax = false


// 鼠标按下事件
clock.addEventListener('mousedown', async (event) => {


    if (isWinMax) {

        return
    }
    // 只允许鼠标左键拖动窗口
    if (event.button !== 0) {
        return;
    }

    //向主进程请求窗口位置
    const [winX, winY] = await window.api.invoke('get-win-position')

    // 获取鼠标在窗口中的位置
    const mouseX = event.screenX;
    const mouseY = event.screenY;

    // 鼠标移动事件
    const mouseMoveHandler = (event) => {

        //计算新窗口位置
        const newX = winX + event.screenX - mouseX
        const newY = winY + event.screenY - mouseY
        //向主进程发送修改窗口位置消息
        window.api.send("set-win-position", {

            x: newX,
            y: newY
        })
    };

    // 鼠标释放事件
    const mouseUpHandler = () => {
        // 取消鼠标移动和鼠标释放事件的监听
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    // 监听鼠标移动和鼠标释放事件
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});


window.api.onMainMsg('is-win-max', (event, data) => {

    if (data) {
        document.body.style.backgroundColor = '#181717'
    } else {
        document.body.style.background = 'none'; // 设置背景颜色为无
    }

    isWinMax = data

})

