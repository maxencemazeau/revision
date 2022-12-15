
function getData() {
    var data = document.getElementById("lireTemp").value;
    document.getElementById("value").innerHTML = data;
    console.log(data)
     var xhttp = new XMLHttpRequest();
     xhttp.open("GET", "getData?data="+data, true);
     xhttp.send();
    
}

function getValue() {
    var value = document.getElementById("lireInput").value;
    document.getElementById("value2").innerHTML = value;
    console.log(value)
     var xhttp = new XMLHttpRequest();
     xhttp.open("GET", "getValue?value="+value, true);
     xhttp.send();
    
}

  setInterval(function getTemperature(){
    var xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("temperature").innerHTML = this.responseText;
            temperature = this.responseText;
        }
    };
    xhttp.open("GET", "getTemperature", true);
    xhttp.send();
}, 2000); 

 /* setInterval(function getFromEsp_TemperatureSensor(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("temperature").innerHTML = this.responseText;
            temperature = this.responseText;
        }
    };
    xhttp.open("GET", "getTemperature", true);
    xhttp.send();
    }, 3000); */




