function FancyChart(canvas, array){
    this.canvas = canvas;
    this.values = array;
    this.fillColorArray = [];
    this.fillColor = '#ffaa00';
    this.strokeColor = '#aa0000';
    this.lineWidth = 1;
    this.drawingType = '';
}

FancyChart.prototype.fillOutPieColorArray = function(){
    let myHue = 0;
    if(this.fillColorArray.length !== this.values.length){
        for(let i = this.fillColorArray.length; i < this.values.length; i++){
            this.fillColorArray.push('hsl(' + myHue + ', 50%, 50%)');
            if(myHue < 360){
                myHue = myHue + 20;
            } else{
                myHue = 0;
            }
        }
    }
}

FancyChart.prototype.drawBarChart = function(){
    this.drawingType = 'bar';
    let ctx = this.canvas.getContext('2d');
    let values = this.values;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    let numberOfBars = values.length;
    let barDistance = 10;
    let barWidth = (this.canvas.width / numberOfBars) - barDistance;

    let x = 4;
    for(let i = 0; i < numberOfBars; i++){
        let barHeight = values[i];
        ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
        ctx.strokeRect(x, this.canvas.height - barHeight, barWidth, barHeight);
        x = x + (barWidth + barDistance);
    }

}
 
FancyChart.prototype.drawPieChart = function(){
    this.drawingType = 'pie';
    this.fillOutPieColorArray();
    let ctx = this.canvas.getContext('2d');
    let totalValue = 0;
    for(i = 0;i<this.values.length;i++){
        totalValue += this.values[i];
    }
    let centerx = Math.floor(this.canvas.width / 2);
    let centery = Math.floor(this.canvas.height / 2);
    let radius = Math.min(centerx,centery)-10;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeColor;
    let lastEndPoint = 0;
    for(i in this.values){
        ctx.fillStyle = this.fillColorArray[i];
        ctx.beginPath();
        ctx.moveTo(centerx,centery);
        ctx.arc(centerx,centery,radius,lastEndPoint, lastEndPoint + (Math.PI * 2 * (this.values[i]/totalValue)));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        lastEndPoint += Math.PI * 2 * (this.values[i] / totalValue);
    }
}

FancyChart.prototype.setValues = function(newArray){
    this.values = newArray;
}

FancyChart.prototype.setBarColor = function(newColor){
    this.fillColor = newColor;
    this.drawBarChart();
}

FancyChart.prototype.setPieColor = function(newColors){
    this.fillColorArray = newColors;
    this.drawPieChart();
}

FancyChart.prototype.setLineColor = function(newColor){
    this.strokeColor = newColor;
    if(this.drawingType === 'bar'){
        this.drawBarChart();
    } else if(this.drawingType === 'pie'){
        this.drawPieChart();
    }
}

FancyChart.prototype.setLineWidth = function(newWidth){
    this.lineWidth = newWidth;
    if(this.drawingType === 'bar'){
        this.drawBarChart();
    } else if(this.drawingType === 'pie'){
        this.drawPieChart();
    }
}