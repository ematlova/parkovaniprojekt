client = new Paho.MQTT.Client("d57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud", 8884, "letni-skola" + Math.random());
client.connect({
    onSuccess: onConnect,
    userName: "robot", 
    password: "P@ssW0rd!",
    useSSL: true
});


function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");

    client.onMessageArrived = onMessageArrived;
    client.subscribe("/out/parking/button/enter");
    client.subscribe("/out/parking/button/exit");
}

let counter = 20 

function onMessageArrived(message) {

    if (message.destinationName == "/out/parking/button/enter") {
        document.getElementById("/out/parking/button/enter").innerText = message.payloadString
        counter -= 1
    }
    else {
        document.getElementById("/out/parking/button/exit").innerText = message.payloadString
        counter += 1 
    }
    console.log (counter)
}

