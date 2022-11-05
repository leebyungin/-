/**
 * 
 */
 var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = 400;

var ground = 300;
var sky=220;
var enemySpawnPoint=900;
var JUMPHEIGHT=110;
var tile=60;

var user1=new Image();
user1.src='b3.png';
var item1=new Image();
item1.src='moneybag.png';
var dino = {
    x:40,
    y: ground,
    width: 20,
    height: tile,

    ix:40+5,
    iy:ground-tile+20,
    iwidth:20,
    iheight:40,
    draw() {
        ctx.fillStyle = 'green';
       // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle='blue';
       // ctx.fillRect(this.ix,this.iy, this.iwidth, this.iheight);
        ctx.drawImage(user1,this.x-20,this.y+5,tile,tile);
        ctx.drawImage(item1,this.ix-30,this.iy-5,tile,tile);
    }
}

var enemy1=new Image();
enemy1.src='b4.png';
class Cactus {
    constructor() {
        this.x = enemySpawnPoint;
        this.y = ground;
        this.width = 10;
        this.height = tile ;
    }

    draw() {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(enemy1,this.x-20,this.y,tile+5,tile+5);
    }
}

class Bird{
    constructor() {
        this.x = enemySpawnPoint;
        this.y = sky;
        this.width = 10;
        this.height = 60;
    }

    draw() {
        ctx.fillStyle = 'black';
       //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(enemy1,this.x-20,this.y,tile+5,tile+5);
    }
}

var timer1 = 0;
var enemies1=[];
var animation;
var randLevel=200;
var stage=1;

function eachFrame() {
    animation=requestAnimationFrame(eachFrame);
    timer1++;

    document.getElementById("score").textContent = timer1;

    if(timer1>2000){
        stage++;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer1 % randLevel === 0) {
        if(stage>=2){
            if(timer1%3===0)
                enemies1.push(new Bird());
            else{
                enemies1.push(new Cactus());
            }
        }else {
            enemies1.push(new Cactus());
        }

        randLevel+=Math.floor(Math.random()*300)+150;
    }

    enemies1.forEach((a,i,o)=>{
        a.x-=1.5;
        collision(dino,a);

        if(a.x.width<0){
            o.splice(i,1)
        }
        a.draw();
        })

    if(jumpToggle===1){ //점프
        dino.y-=1.3;
        dino.iy-=1.3;
    }
    if(dino.y<=ground-JUMPHEIGHT){
        jumpToggle=-1;
    }
    if(jumpToggle===-1){    //하강
        if(dino.y<ground) {
            dino.y+=1.4;
            dino.iy+=1.4;
            if(dino.y>=ground)jumpToggle=0;
        }

    }
    dino.draw();
}
alert("조작법\nW, SPACE");
eachFrame();

var ending=new Image();
ending.src='end.png';

function collision(dino,obj){
    var xRdiff= obj.x-(dino.x+dino.width);
    var xLdiff= obj.x+obj.width-dino.x;
    var yBdiff= obj.y-(dino.y+dino.height);
    var yTdiff= obj.y+obj.height-dino.iy;

    if(xRdiff<0 && xLdiff>0 && yBdiff<0&&yTdiff>0){
        cancelAnimationFrame(animation);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(ending,30,ground-180);
    }
}

var jumpToggle=0;
document.addEventListener('keydown',function(e){
    if(e.code==='Space'){
        if(jumpToggle===0) jumpToggle=1;
    }
})

document.addEventListener('keydown',function(w){
    if(w.code==="KeyW"){
        if(jumpToggle===0) {
            jumpToggle = 3;
            dino.iy = dino.y + 20;
            dino.ix=dino.x-15;
        }
    }
})
document.addEventListener('keyup',function(w){
    if(w.code==="KeyW"){
        if(jumpToggle===3) {
            dino.iy = ground - tile + 20;
            dino.ix=dino.x+5;
            jumpToggle=0;
        }
    }
})