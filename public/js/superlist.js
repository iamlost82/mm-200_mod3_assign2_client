// superlist =========================================
function superlist(values) {

    // init *******************************************
    let ul = document.createElement("ul"); //create a new ul
    let arr = values.slice(); //the array with values
    let selected = undefined; //index of the selected element
    let thm = "sunny"; //default color theme
    let selThm = "sunnyhighlight"; //default color theme
    ul.classList.add("superListStyle");
    drawList();
    
    // "public" properties ****************************
    ul.showSelected = true;    

    // "public" methods *******************************    
    // addElement -------------------------------------
    ul.addElement = function(value) {
        let li = document.createElement("li");        
        li.innerHTML = value;
        //li.onclick = liClick;
        ul.appendChild(li);
    }    
    
    // fillFromArray ----------------------------------
    ul.fillFromArray = function(values) {        
        arr = values.slice();
        drawList();    
    }    
    
    // removeElement ----------------------------------
    ul.removeElement = function(index) {
        if (selected === index) {
            selected = undefined;
        }        
        arr.splice(index, 1);
        drawList();
    }    
    
    // removeAll --------------------------------------
    ul.removeAll = function() {        
        selected = undefined;
        arr = [];
        drawList();     
    }    
    
    // setSelected ------------------------------------
    ul.setSelected = function(index) {        
        setSelected(index);       
    }
    
    // getSelected ------------------------------------
    ul.getSelected = function() {        
        return selected;       
    }
    
    // getElementAt -----------------------------------
    ul.getElementAt = function(index) {        
        return ul.children.item(index);       
    }
    
    // setTheme ---------------------------------------
    ul.setTheme = function(theme) {        
        thm = theme;
        selThm = thm + "highlight";
        drawList();
    }

    // getLength --------------------------------------
    ul.getLength = function(){
        return arr.length;
    }

    // "private" methods ******************************
    // drawList ---------------------------------------
    function drawList() {
        
        ul.innerHTML = "";        
        
        for (let i = 0; i < arr.length; i++) {            
            let li = document.createElement("li");
            li.id = i;
            li.innerHTML = arr[i];
            li.onclick = liClick;
            li.classList.add(thm);
            ul.appendChild(li); 
        }   
    }
    
    // liClick ----------------------------------------
    function liClick(evt) {
        setSelected(evt.currentTarget.id);                
    }
    
    //setSelected -------------------------------------
    function setSelected(index) {     
        
        selected = index;
        
        //the selected element
        let elm = ul.children.item(index);
        
        //change appearance
        if (ul.showSelected) {
            clearSelected();
            elm.classList.remove(thm);
            elm.classList.add(selThm);
        }        
        
        //create an event object        
        let event = new Event("listchange");
        
        //fill in data in the event-object
        event.index = index;
        event.element = elm;
        
        //send the event
        ul.dispatchEvent(event);
    }
    
    // clearSelected ----------------------------------
    function clearSelected() {
        
        //retrieve all the li-elements and remove CSS class
        let elms = ul.children;
        for (let i = 0; i < elms.length; i++) {
            elms[i].classList.remove(selThm);
            elms[i].classList.add(thm);
        }
    }
    
    // return the ul ***********************************
    return ul;      
}
// end superlist =======================================