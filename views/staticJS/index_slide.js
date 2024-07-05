var newsWord = '————————————サーバーが学校にバレました————————————'
var defaultMax = 100
var defualtMin = -20

var screenWidth = screen.width

var rightI = 0
var leftI = defaultMax
function slideWord(movingObject){
    movingObject = document.getElementById('slideBar')
    rightI --
    leftI ++
    if (rightI < 0){
        rightI = defaultMax
    }
    else if(leftI >= defaultMax){
        leftI = 0;
    }

    var exportText = ''
    for (var i = 0;i < leftI;i ++){
        exportText += '　'
    }
    exportText += newsWord
    for (var i = 0;i < rightI;i ++){
        exportText += '　'
    }
    movingObject.innerText = exportText;
    setTimeout('slideWord()',50)
}


var positionLR = 0
function slideByCSS(movingObject){
    movingObject = document.getElementsByClassName('slideBar')
    rightI -= 0.1;
    leftI += 0.1;
    if (rightI < defualtMin){
        rightI = defaultMax
    }
    else if(leftI >= defaultMax){
        leftI = 0;
    }
    for (var i = 0;i < movingObject.length;i ++){
        movingObject[i].style.right = rightI + '%'
    }
    setTimeout('slideByCSS()',5)
}
slideByCSS()