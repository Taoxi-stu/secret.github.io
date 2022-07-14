var picFollowStatus = true;
function isFollow(){
    if(picFollowStatus){
        unFollow();
        picFollowStatus = false;
    }else{
        document.getElementById('c').addEventListener('mousemove',picFollow)
        picFollowStatus = true;
    }
};
function picFollow(e){
    var x = Number(e.pageX);
    var y = Number(e.pageY);
    let pic = document.getElementById('tyqh');
    let nx = Number(pic.style.left.substring(0,pic.style.left.lastIndexOf('px')));
    let ny = Number(pic.style.top.substring(0,pic.style.top.lastIndexOf('px')));
    var followTime = 20;
    function delayFollow(i){
        var tempx = nx + f1((x-nx)*i/followTime, Math.abs(x-nx));
        var tempy = ny + f1((y-ny)*i/followTime, Math.abs(y-ny));
        pic.style.left = String(tempx) + 'px';
        pic.style.top = String(tempy)  + 'px';   //两个字符 '+8' 达到延时效果
    }
    // setInterval(delayFollow,100)
    for(let i = 1; i<=followTime; i++){
        setTimeout(delayFollow(i),10000)
    }

};
function unFollow(){      
    document.getElementById('c').removeEventListener('mousemove',picFollow);
    let pic = document.getElementById('tyqh');
    pic.style.left = '10px';
    pic.style.top = '60%'

};
// function picChange(){
//     let pic = document.getElementById('tyqh');
//     // pic.draggable = true;
//     // console.log('1111');
//     pic.onmousedown = (e) => {
//         e.target.style.left = e.pageX+ 'px';
//         e.target.style.top = e.pageY+ 'px';
//     }
// }
function f1(x,xmax){
    return 1/Math.pow(xmax,2)*Math.pow(x,3);
}
