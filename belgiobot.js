const Discord = require("discord.js");
let request = require('request');
const config = require("./config.json");
const client = new Discord.Client();

var weather;
let city = 'Leuven';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.key}&units=metric`

request(url, function (err, response, body) {
    if(err){
      console.log('error:', err);
    } else {
        weather = JSON.parse(body);
    }
  });


client.on("ready", ()=>{
    console.log("[Bot online]");
    client.user.setPresence({
        activity: {
            name: "piove?",
            type: 3,
        },
    });
})

client.on("message", msg => {
    if (msg.content === "piove?") {
        if (weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
            msg.channel.send("Sì :cloud_rain:");
        } else {
            msg.channel.send("No :sunny:");
        }
    }
})

setInterval(() => {
    if (weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
        msg.channel.send("Piove :cloud_rain:");
    }
}, 3600000);

client.login(config.token);