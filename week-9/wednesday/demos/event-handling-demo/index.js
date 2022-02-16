document.addEventListener("DOMContentLoaded", e => {
    console.log(e.type);
    // phase 1
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    document.getElementById("click-me").addEventListener("click", event => {
        console.log(event.type);
        modal.style.display = "flex";
        modalContent.style.display = "flex";
        modalContent.innerHTML = `
            <h2>Subscribe to our newsletter</h2>
            <form id="my-form" action="/users" method="POST">
                <label for="email">Email</label>
                <input type="text" name="email">
                <label for="password">Password</label>
                <input type="password" name="password">
                <button>Submit</button>
                <p id="errors"></p>
            </form>
        `;

        // phase 4
        const form = document.getElementById("my-form");
        const errors = document.getElementById("errors");
        form.addEventListener("input", e => {
            console.log(e.target);
            if (e.target.name === "email") {
                const inputVal = e.target.value;
                if (!inputVal.includes('@')) {
                    errors.innerText = "Email must include '@'";
                } else {
                    errors.innerText = "";
                }
            }
        });
    });

    // phase 2
    modalContent.addEventListener("click", e => {
        e.stopPropagation();
    });

    modal.addEventListener("click", e => {
        console.log(e.target);
        console.log(e.currentTarget);
        modal.style.display = "none";
    });

    // phase 3


});
