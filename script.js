var matrix = [];
var curFirstCell = [];
var curSecondCell = [];
let counterWin = 0;
let nativeColor = "#ffffff";
var startTime = null;
var timerId = null;

var colors = 	[
				["#008080",2],
				["#008000",2],
				["#FF0000",2],
				["#808000",2],
				["#808080",2],
				["#0000FF",2],
				["#000000",2],
				["#800080",2]
				];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function preStart(){
	//Сбрасываем все переменные
	curFirstCell = null;
	curSecondCell = null;
	counterWin = 0;
	document.getElementById("timer").textContent = "00.00.000";
	
	//Записываем время  начала игры
	startTime = new Date;
	
	matrix = new Array(4);
	for (i = 0;i < 4;i++)
		matrix[i] = new Array(4);
	
	//Записываем изначальный цвет ячеек
	nativeColor = document.getElementById("table").rows[0].cells[0].bgColor;
	
}

function btnClick(){
	preStart();
	
	
	document.getElementById("btn").textContent = "Стоп";
	
	//Создаем копию массива цветов, чтобы не удалить его
	let subMas = colors.slice();
	let indexer = 0;
	
	for (i = 0; i < 4;i++)
	{
		for (j=0; j < 4;j++)
		{
			//Генерируем индекс цвета
			indexer = getRandomInRange(0,subMas.length);

			//Записываем цвет в массив
			matrix[i][j] = subMas[indexer][0];
			
			//Уменьшаем колличество возможных использований цвета на 1
			subMas[indexer][1]--;
			
			//Если цвет больше нельзя использовать - удаляем его
			if (subMas[indexer][1] == 0) subMas.splice(indexer,1);
		}
	}
	
	//Ставим таймер
	timerId = setInterval(
		function() { 
			document.getElementById("timer").textContent = getCurTime();
      },
      1
   );
}

function getCurTime()
{
	now = new Date;
	now.setTime(now - startTime);
	return (now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds());
}


function tdClick(event){
	let cell = event.target;
	if (cell.tagName.toLowerCase() != 'td') return;
	
	//Получаем индексы клетки
	let i = cell.parentNode.rowIndex;
	let j = cell.cellIndex;
	
	//Если нажали на окрашенную клетку - выходим
	if (cell.bgColor != nativeColor) return;
	
	//Красим нажатую клетку
	cell.bgColor = matrix[i][j];
	
	if (curFirstCell == null)
	{
		curFirstCell = [i,j];
	}
	else if (curSecondCell == null)
	{
		curSecondCell = [i,j];
		
		let first = matrix[
					curFirstCell[0]]
					[curFirstCell[1]];
					
		let second = matrix[
					curSecondCell[0]]
					[curSecondCell[1]];
		
		//Проверяем цвета двух клеток
		if (first === second)		
			{
				curFirstCell = null;
				curSecondCell = null;
				counterWin++;
				
				//Проверяем условие победы
				if (counterWin == 8) 
				{
					setTimeout(function() {
						clearInterval(timerId);
						}, 1);
					alert("Вы выйграли!\n\rЗатраченное время: " + getCurTime());
				}
			}
	}
	else 
	{
		//Очищаем ранее выбранные клетки
		let table = document.getElementById("table");

		table.rows[curFirstCell[0]].cells[curFirstCell[1]].bgColor = nativeColor;
		table.rows[curSecondCell[0]].cells[curSecondCell[1]].bgColor = nativeColor;
		
		curFirstCell = [i,j];
		curSecondCell = null;
	}

}

document.querySelector('table').onclick = tdClick;
document.getElementById("btn").onclick = btnClick;