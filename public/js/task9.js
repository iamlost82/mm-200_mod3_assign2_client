let cnv = document.getElementById("myCanvas");
let myChart = new FancyChart(cnv, [230, 156, 12, 89]);
myChart.drawBarChart();

let cnv2 = document.getElementById("myCanvas2");
let myChart2 = new FancyChart(cnv2, [20, 45, 65, 90]);
myChart2.drawPieChart();

/*
cnv.addEventListener("click", function(evt) {
    console.log(evt.clientX - cnv.offsetLeft);
    console.log(evt.clientY - cnv.offsetTop);
});
*/

cnv.addEventListener("barselect", function(evt) {
    console.log(evt.index);
    console.log(evt.value);
});