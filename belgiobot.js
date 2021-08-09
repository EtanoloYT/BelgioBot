const { Client } = require('discord.js');
const client = new Client({disableMentions: 'everyone'});
const { TOKEN, KEY, CITY } = require('./config.json');
const fetch = require('node-fetch');

// API REQUEST
let url = `http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY}&units=metric`

async function get() {
    const response = await fetch(url);
    let data = await response.json();
    return data.weather[0].main;
}

client.on('ready', () => {
    console.log("ready");
    client.user.setPresence(
        {
            activity: {
                name: "Se piove",
                type: 3
            },
            status: "dnd"
        }
    )
})

client.on('message', message => {
    let channel = message.channel;
    if(message.content === "piove?" || message.content === "Piove?") {
        let data = get();
        if(data == "Rain" || data == "Thunderstorm") {
            channel.send("Sì :cloud_rain:");
            setInterval(() => {
                if(data == "Rain" || data == "Thunderstorm") {
                    channel.send("Sta piovendo. :cloud_rain:");
                }
            }, 3600000);
        }
        else {
            channel.send("No :sunny:");
        }
    }
})

client.login(TOKEN);