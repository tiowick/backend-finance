const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.listen(8080, function(request, response){
    console.log("Servidor rodando na porta 8080")
});
