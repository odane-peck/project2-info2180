var puzzlearea;
var squares;
var shufflebutton;
var validMoves=[];
var emptySpaceX = '300px';
var emptySpaceY = '300px';
window.onload = function()
{
    btnFunc();

	var timerSpace = document.createElement("P");
	var pzl = document.getElementById("puzzlearea");
	var text = document.createTextNode("Timer: 00:00");
	document.getElementById("overall").insertBefore(timerSpace,pzl)
	timerSpace.id = "timerSpace";
	timerSpace.appendChild(text);
    
	puzzlearea = document.getElementById("puzzlearea");
	squares = puzzlearea.getElementsByTagName("div");
	shufflebutton = document.getElementById("shufflebutton");
	
	initializeGrid();
	shufflebutton.onclick = shufflePieces;
	

	calcValidMoves();
}

function initializeGrid()
{
	for (var i=0; i<squares.length; i++)
	{
		 
		squares[i].className = "puzzlepiece";
		squares[i].style.left = (i % 4 * 100) + "px";
		squares[i].style.top = (parseInt(i / 4) * 100) + "px";
		squares[i].style.backgroundPosition = "-" + squares[i].style.left + " " + "-" + squares[i].style.top;
		squares[i].onclick = function()
		{
			if (isValidMove(this.style.left, this.style.top))
			{
				switchPieces(parseInt(this.innerHTML-1));
                calcValidMoves();
			}
			
		}

		
		squares[i].onmouseover = function()
		{
			
			if (isValidMove(this.style.left, this.style.top))
			{
				this.classList.add("movablepiece");
			}
			
		}

		squares[i].onmouseout = function()
		{
			this.classList.remove("movablepiece");
		}
	}
}


function shufflePieces() 
{
    var timerFunc = setInterval(timer, 1000);
	var rndNum;
	
	
	for (var i = 0; i < 250; i++) 
	{
		
		rndNum = Math.floor(Math.random() * validMoves.length);

	
		for (var x = 0; x < squares.length; x++)
		{
			if ((validMoves[rndNum][0] === parseInt(squares[x].style.left)) 
				&& (validMoves[rndNum][1] === parseInt(squares[x].style.top)))
			{
				
				switchPieces(parseInt(squares[x].innerHTML-1));
				calcValidMoves();
				break; 
			}
		}
	}
}


function switchPieces(puzzlePiece)
{
	
	var temp = squares[puzzlePiece].style.left;
	squares[puzzlePiece].style.left = emptySpaceX;
	emptySpaceX = temp;

	
	temp = squares[puzzlePiece].style.top;
	squares[puzzlePiece].style.top = emptySpaceY;
	emptySpaceY = temp;
}


function calcValidMoves()
{
	tempX = parseInt(emptySpaceX);
	tempY = parseInt(emptySpaceY);

	
	validMoves = [];

	
	if (tempY != 0)
	{
		validMoves.push([tempX, tempY - 100]);
	}

	
	if (tempX != 300)
	{
		validMoves.push([tempX + 100, tempY]);
	}

	
	if (tempY != 300)
	{
		validMoves.push([tempX, tempY + 100]);
	}

	
	if (tempX != 0)
	{
		validMoves.push([tempX - 100, tempY]);
	}
}

function btnFunc(){
    var btn = document.createElement("BUTTON");
    btn.id = "btn";
    btn.appendChild(document.createTextNode("Reset"));
    btn.addEventListener("click",reset);
    document.getElementById("controls").appendChild(btn);
}



function isValidMove(pieceX, pieceY)
{
	pieceX = parseInt(pieceX);
	pieceY = parseInt(pieceY);

	for (var i = 0; i < validMoves.length; i++){
 		if ((validMoves[i][0] === pieceX) && (validMoves[i][1] === pieceY))
		{
			return true;
		}
	}
	return false;	
}
var minute = 0;
var second = 0;
function timer(){
    var minuteSecond;
    if(minute<10){
        minuteSecond= "0"+minute+":";
        }
    else{minuteSecond = minute+":";
        }
    if(second<10){minuteSecond += "0"+second;
                 }
    else{minuteSecond += second;
        }
    if(second<60){
        second++;
    }
    else{
        second = 0;
        minute++;
        }
    document.getElementById("timerSpace").innerHTML = "Timer: "+minuteSecond;
}

function reset(){
    emptySpaceX = '300px';
    emptySpaceY = '300px';
    initializeGrid();
    sessionStart = false;
}