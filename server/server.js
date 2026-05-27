











// SERVER : 
 
const express = require('express');
const app = express();

// Middleware para permitir que o servidor entenda JSON no corpo da requisição
app.use(express.json());

app.post('/applicationApi', (req, res) => {
    const receivedJson = req.body;

    // Retorna o JSON recebido
    res.json(receivedJson);
    console.log(receivedJson)
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Rocon Server Port : ${PORT}`);
});
