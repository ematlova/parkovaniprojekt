client = new Paho.MQTT.Client("d57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud", 8884, "letni-skola" + Math.random());
client.connect({
    onSuccess: onConnect,
    userName: "robot", 
    password: "P@ssW0rd!",
    useSSL: true
});


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
        document.getElementById("vjezd").innerText = counter
    }
    else {
        counter += 1 
        document.getElementById("vjezd").innerText = counter
    }


    console.log (counter)
}

