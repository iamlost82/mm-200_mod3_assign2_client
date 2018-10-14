function FancyChart(canvas, array){
    this.canvas = canvas;
    this.values = array;
    this.barLimits = [];
    this.pieLimits = [];
    this.fillColorArray = [];
    this.fillColor = '#ffaa00';
    this.strokeColor = '#aa0000';
    this.lineWidth = 1;
    this.drawingType = '';
    let canvasOffsetLeft = this.canvas.offsetLeft;
    let canvasOffsetTop = this.canvas.offsetTop;
    let canvasCenterX = this.canvas.width / 2;
    let canvasCenterY = this.canvas.height / 2;
    let barLimits = this.barLimits;
    let pieLimits = this.pieLimits;
    this.barclicker = function (e){
        let event = new Event("barselect");
        let canvasMouseX = e.clientX-canvasOffsetLeft;
        let canvasMouseY = e.clientY-canvasOffsetTop;
        event.index = 'None selected';
        event.value = 'None selected';
        for(i in barLimits){
            if(canvasMouseX >= barLimits[i].xmin && canvasMouseX <= barLimits[i].xmax && canvasMouseY <= barLimits[i].ymin && canvasMouseY >= barLimits[i].ymax){
                event.index = i;
                event.value = barLimits[i].value;
                break;
            }
        }
        this.dispatchEvent(event);
    }
    this.pieclicker = function (e){
        let event = new Event("pieselect");
        let canvasMouseX = e.clientX-canvasOffsetLeft;
        let canvasMouseY = e.clientY-canvasOffsetTop;
        let radian = Math.atan2(canvasMouseY - canvasCenterX, canvasMouseX - canvasCenterY);
        if(radian < 0){radian = 2*Math.PI + radian}
        event.index = 'None selected';
        event.value = 'None selected';
        if(Math.sqrt((canvasMouseX-250)*(canvasMouseX-250)+(250-canvasMouseY)*(250-canvasMouseY))<240){
            for(i in pieLimits){
                if(radian >= pieLimits[i].minrad && radian < pieLimits[i].maxrad){
                    event.index = pieLimits[i].index;
                    event.value = pieLimits[i].value;
                    break;
                }
            }
        }
        this.dispatchEvent(event);
    }
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
        this.barLimits.push({index:i,xmin:x,xmax:(x+barWidth),ymax:(this.canvas.height - barHeight),ymin:(this.canvas.height),value:values[i]});
        ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
        ctx.strokeRect(x, this.canvas.height - barHeight, barWidth, barHeight);
        x = x + (barWidth + barDistance);
    }
    this.canvas.onclick = this.barclicker;
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
        this.pieLimits.push({index:i,minrad:lastEndPoint,maxrad:(lastEndPoint + (Math.PI * 2 * (this.values[i]/totalValue))),value:this.values[i]});
        ctx.fillStyle = this.fillColorArray[i];
        ctx.beginPath();
        ctx.moveTo(centerx,centery);
        ctx.arc(centerx,centery,radius,lastEndPoint, lastEndPoint + (Math.PI * 2 * (this.values[i]/totalValue)));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        lastEndPoint += Math.PI * 2 * (this.values[i] / totalValue);
    }
    this.canvas.onclick = this.pieclicker;
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
