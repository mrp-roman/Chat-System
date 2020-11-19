console.log('Ya ya welcomen');

const form = document.querySelector('form');
const API_URL = "http://localhost:8080/chappo"
const audio = new Audio('pling.mp3');
const chappoElement = document.querySelector('.chappo');

function listAllChappo() {
    chappoElement.innerHTML = '';
    fetch(API_URL).then(response => response.json()).then(chappo => {
        console.log(chappo);
        chappo.reverse();
        chappo.forEach(chappo => {
            const div = document.createElement('div');
           
            const header = document.createElement('h3');
            header.textContent = chappo.name;

            const comment = document.createElement('p');
            comment.textContent = chappo.comment;

            const created = document.createElement('p');
            created.textContent = chappo.created;

            div.appendChild(header);
            div.appendChild(comment);
            div.appendChild(created);

            chappoElement.appendChild(div);
        });
    });
}

listAllChappo()

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const message = formData.get('message-user');

    const jason = {
        name,
        message
    };
    console.log(jason);

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(jason),
        headers: {
            'content-type':'application/json'
        }
    }).then(response => response.json()).then(createdChappo => {
        console.log(createdChappo);
        form.reset();
        listAllChappo();
    });
    audio.play();
    console.log("Ya vas ist message ist logged!");
});

