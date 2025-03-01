document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("input");
    const outputDiv = document.getElementById("output");
    const prompt = "user@neon-terminal:~$ ";

    // Initial message
    outputDiv.innerHTML = "<div><span style='color: cyan;'>Welcome to Neon Terminal! Type 'help' for a list of commands.</span></div>";

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const inputText = inputField.value.trim();
            processCommand(inputText);
            inputField.value = "";
        }
    });

    function processCommand(command) {
        let response = "<span style='color: red;'>Command not found</span>";
        
        const commands = {
            "help": "Available commands: help, clear, about, neon, time, joke, date, inspire, flip, uptime, news, fact, ip",
            "clear": "clear",
            "about": "Neon Terminal - A command-line-inspired interactive website.",
            "neon": "<span style='color: cyan;'>NEON!!!</span>",
            "time": `Current Time: <span style='color: yellow;'>${new Date().toLocaleTimeString()}</span>`,
            "date": `Today's Date: <span style='color: yellow;'>${new Date().toLocaleDateString()}</span>`
        };
        
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "There are 10 types of people in the world: those who understand binary and those who don't.",
            "Why did the developer go broke? Because he used up all his cache!"
        ];
        
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Stay hungry, stay foolish. - Steve Jobs",
            "Sometimes it is the people no one imagines anything of who do the things that no one can imagine. - Alan Turing"
        ];
        
        const facts = [
            "The first computer virus was created in 1986 and was called Brain.",
            "Python is named after Monty Python, not the snake.",
            "The first programmer was Ada Lovelace in the 1800s."
        ];
        
        if (command in commands) {
            response = commands[command];
        }
        
        if (command === "clear") {
            outputDiv.innerHTML = "";
            return;
        }
        
        if (command === "joke") {
            response = `<span style='color: magenta;'>${jokes[Math.floor(Math.random() * jokes.length)]}</span>`;
        }
        
        if (command === "inspire") {
            response = `<span style='color: blue;'>${quotes[Math.floor(Math.random() * quotes.length)]}</span>`;
        }
        
        if (command === "flip") {
            response = `<span style='color: purple;'>${Math.random() < 0.5 ? 'Heads' : 'Tails'}</span>`;
        }
        
        if (command === "uptime") {
            const uptime = Math.floor(performance.now() / 1000);
            response = `<span style='color: green;'>System Uptime: ${uptime} seconds</span>`;
        }
        
        if (command === "news") {
            fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
                .then(response => response.json())
                .then(ids => {
                    return fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json`);
                })
                .then(response => response.json())
                .then(article => {
                    response = `<span style='color: orange;'>Latest News: <a href='${article.url}' target='_blank'>${article.title}</a></span>`;
                    outputDiv.innerHTML += `<div>${response}</div>`;
                });
            response = "Fetching latest news...";
        }
        
        if (command === "fact") {
            response = `<span style='color: cyan;'>${facts[Math.floor(Math.random() * facts.length)]}</span>`;
        }
        
        if (command === "ip") {
            fetch("https://api64.ipify.org?format=json")
                .then(response => response.json())
                .then(data => {
                    response = `<span style='color: cyan;'>Your IP Address: ${data.ip}</span>`;
                    outputDiv.innerHTML += `<div>${response}</div>`;
                });
            response = "Fetching IP address...";
        }
        
        outputDiv.innerHTML += `<div>${prompt}${command}</div>`;
        outputDiv.innerHTML += `<div>${response}</div>`;
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
});
