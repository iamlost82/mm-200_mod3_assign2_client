let cnv = document.getElementById("myCanvas");
let myChart = new FancyChart(cnv, [20, 45, 65, 90]);
myChart.drawBarChart();

let cnv2 = document.getElementById("myCanvas2");
let myChart2 = new FancyChart(cnv2, [10,10,10,10,20,10,30,10,60]);
myChart2.drawPieChart();