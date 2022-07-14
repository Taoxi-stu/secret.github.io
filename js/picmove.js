
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
    var x = e.pageX;
    var y = e.pageY;
    let pic = document.getElementById('tyqh');
    pic.style.left = x + 'px';
    pic.style.top = y + 'px';   
};
function unFollow(){
    console.log('111');            
    document.getElementById('c').removeEventListener('mousemove',picFollow)
};

