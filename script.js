client = new Paho.MQTT.Client("d57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud", 8884, "letni-skola" + Math.random());
client.connect({
    onSuccess: onConnect,
    userName: "robot", 
    password: "P@ssW0rd!",
    useSSL: true
});

// Tláčítka

function onConnect() {
    console.log("onConnect");

    client.onMessageArrived = onMessageArrived;
    client.subscribe("/out/parking/button/enter");
    client.subscribe("/out/parking/button/exit");
}

let counter = 20 

function onMessageArrived(message) {

    if (message.destinationName == "/out/parking/button/enter") {
        counter -= 1
        document.getElementById("vjezd").innerText = counter.toString().padStart(4, "0")
        otevriZavoru()
        
    }
    else {
        counter += 1 
        document.getElementById("vjezd").innerText = counter.toString().padStart(4, "0")
        zavriZavoru()
    }

    sendMessage()

    console.log (counter) 

}
// Displej
function sendMessage(){ 
    message = new Paho.MQTT.Message(document.getElementById("vjezd").textContent);
    message.destinationName = "/in/parking/display";
    client.send(message);
}

// závory

 
function otevriZavoru(){ 
    let message = new Paho.MQTT.Message("1");
    message.destinationName = "/in/parking/gate/enter";
    client.send(message);
    setTimeout(function(){
       let message = new Paho.MQTT.Message("0");
        message.destinationName = "/in/parking/gate/enter";
        client.send(message);

    }, 1000,)
}

function zavriZavoru(){ 
    let message = new Paho.MQTT.Message("1");
    message.destinationName = "/in/parking/gate/exit";
    client.send(message);
    setTimeout(function(){
       let message = new Paho.MQTT.Message("0");
        message.destinationName = "/in/parking/gate/exit";
        client.send(message);

    }, 1000,)
}


