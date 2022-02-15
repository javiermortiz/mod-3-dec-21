window.onload = () => {
    document.getElementById("click-me").addEventListener("click", ev => {
        const ball = document.getElementById("ball");
        console.log(ball);
        ball.classList.add("red-ball");
        
        // const instructor = document.querySelector(".instructor");
        // console.log(instructor);
        // instructor.style.backgroundColor = "red";

        const instructors = document.querySelectorAll(".instructor");
        console.log(instructors);
        console.log(document.body.children);
        instructors.forEach(instructor => {
            instructor.style.color = "red";
        });

        debugger;
        const playground = document.getElementById("playground");
        const title = "Hope you enjoyed the demo!";
        playground.innerHTML = `
            <h2 class='red'>${title}</h2>
            <img 
                src='https://p4.wallpaperbetter.com/wallpaper/70/625/78/animal-baby-cute-dog-wallpaper-preview.jpg'
            >
        `;

        // const h2 = document.createElement('h2');
        // const title = document.createTextNode('Hope you enjoyed the demo!')
        // h2.appendChild(title);
        // h2.classList.add('red');
        // const img = document.createElement('img');
        // img.src = 'https://p4.wallpaperbetter.com/wallpaper/70/625/78/animal-baby-cute-dog-wallpaper-preview.jpg';
        // playground.appendChild(h2);
        // playground.appendChild(img);
    });


}