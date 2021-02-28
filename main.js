let buttonNumbers=document.getElementsByClassName("number");
let display=document.getElementById("display");

for (let i = 0; i < buttonNumbers.length; i++) {
    buttonNumbers[i].onclick=function() {
        if (display.innerText[0]==='0') {
         display.innerText="";
        }
        display.innerText+=buttonNumbers[i].innerText;
    };
}

document.getElementById("ac").onclick=function () {
    display.innerText="0";
}

document.getElementById("dot").onclick=function () {
    if(!display.innerText.includes(".")){
        display.innerText+=".";
    }
}