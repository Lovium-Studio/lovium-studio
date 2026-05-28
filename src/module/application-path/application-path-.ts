









// APLICATION PATH : 

import { console } from "../console/console.js";

export function applicationPath(){
    const jsonData = {
        nome: "Rhyan",
        idade: 25
    };

    fetch('http://localhost:3000/applicationApi', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        console(data); 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}