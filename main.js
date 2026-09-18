let arrlvl=[
    {lvl:'Easy',time:5},
    {lvl:'Normal',time:3},
    {lvl:'Hard',time:2},
]
let lvls=document.querySelectorAll('.buttons .lvl');
let lvl;
let time;
let arr=[];
for(let i=0;i<lvls.length;i++){
    lvls[i].onclick=function(){
        for(let y=0;y<lvls.length;y++){
            lvls[y].remove();
        }
        lvl=arrlvl[i].lvl;
        time=arrlvl[i].time;
        if(lvl=='Easy'){
            arr=arrEasy;
        }
        else if(lvl=='Normal'){
            arr=arrNormal;
        }
        else{
            arr=arrHard;
        }
        document.querySelector('.txt .level').innerHTML=`[ ${lvl} ]`;
        document.querySelector('.txt .sec').innerHTML=`[ ${time} ]`;
        document.querySelector('.time .timeCount').innerHTML=time;
        document.querySelector('.playing').style.opacity='1';
        document.querySelector('.playing').style.cursor='pointer';
        document.querySelector('.playing').onclick=play;
        document.querySelector('.result .numWords').innerHTML=arr.length;
        createArr();
    }
}
let arrEasy = [
    'html',
    'css',
    'js',
    'sass',
    'java',
    'cpp',
    'php',
    'sql',
    'node',
    'vue',
]
let arrNormal = [
    'python',
    'http',
    'https',
    'github',
    'object',
    'array',
    'string',
    'props',
    'state',
    'hook',
]
let arrHard = [
    'library',
    'function',
    'variable',
    'constant',
    'operator',
    'ecmascript',
    'frontend',
    'backend',
    'fullstack',
    'programming',
];
document.querySelector('.scoreCurrent').innerHTML=0;
function play(){
    this.remove();
    count();
    setTimeout(()=>{
        document.querySelector('.count').style.display='none';
        main();
        interval();
    },3000)
}
function main(){
    let i=Math.floor(Math.random()*arr.length);
    document.querySelector('.word').innerHTML=arr[i];
    arr.splice(i,1);
    document.querySelector('input').value='';
    document.querySelector('input').focus();
    document.querySelector('input').onpaste=function(){
        return false;
    }
    createArr();
}
function interval(){
    let count=setInterval(()=>{
        document.querySelector('.time .timeCount').innerHTML--;
        if(document.querySelector('.time .timeCount').innerHTML==0){
            clearInterval(count);
            if(document.querySelector('input').value.toLowerCase()==document.querySelector('.word').innerHTML){
                document.querySelector('.scoreCurrent').innerHTML++;
                document.querySelector('.time .timeCount').innerHTML=time;
                if(arr.length>0){
                    main();
                    interval();
                }
                else if(arr.length==0){
                    document.querySelector('.word').innerHTML='';
                    document.querySelector('.words').remove();
                    document.querySelector('.time .timeCount').innerHTML=0;
                    document.querySelector('input').value='';
                    document.querySelector('input').style.cursor='no-drop';
                    document.querySelector('input').readOnly=true;
                    document.querySelector('.finish').innerHTML='Congratz';
                    document.querySelector('.finish').classList.add('win');
                    document.querySelector('.again').style.display='block';
                    localStorage.setItem('score',document.querySelector('.scoreCurrent').innerHTML)
                    localStorage.setItem('date',new Date())
                }
            }
            else{
                document.querySelector('.finish').innerHTML='Game Over';
                document.querySelector('.finish').classList.add('lost');
                document.querySelector('.again').style.display='block';
                localStorage.setItem('score',document.querySelector('.scoreCurrent').innerHTML)
                localStorage.setItem('date',new Date())
            }
        }
    },1000)
}
document.querySelector('.again').onclick=function(){
    location.reload();
}
function createArr(){
    document.querySelector('.words').innerHTML='';
    for(let i=0;i<arr.length;i++){
        let span=document.createElement('span');
        let txt=document.createTextNode(arr[i]);
        span.appendChild(txt);
        document.querySelector('.words').appendChild(span);
    }
}
function count(){
    document.querySelector('.count').style.display='block';
    let x=setInterval(() => {
        document.querySelector('.count').textContent--;
        if(document.querySelector('.count').textContent==0){
            clearInterval(x);
        }
    }, 1000);
}