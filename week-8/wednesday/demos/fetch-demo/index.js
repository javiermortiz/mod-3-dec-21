const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

document.addEventListener("DOMContentLoaded", ev => {
    const form = document.querySelector("form");
    form.addEventListener("submit", async ev => {
        ev.preventDefault();
        const input = document.querySelector("input");
        const number = input.value;


        const res = await fetch(`https://swapi.dev/api/people/${number}`, {
            method: "POST",
            body: JSON.stringify({name: "Javier"}),
            headers: {'Content-Type': 'application/json'}
        });
        console.log(res);
        const data = await res.json();


        
        const people = document.querySelector("#people");
        people.innerHTML = `What Star Wars character has ${data.eye_color} eyes?`;

        await wait(5000);
        
        people.innerHTML += `<h2>${data.name}</h2>`;
        input.value = "";
    })
});

