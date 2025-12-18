
const port = 8080;

const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let votos = {
    microcontroladores: 0,
    tecnicas_programacao: 0,
    programacao_web: 0
};

app.get("/", (request, response) => {
    const totalVotos = votos.microcontroladores + votos.tecnicas_programacao + votos.programacao_web;
    
    response.render("main", {
        votos: votos,
        totalVotos: totalVotos
    });
});

app.post("/votar", (request, response) => {
    const voto = request.body.voto;
    
    if (votos.hasOwnProperty(voto)) {
        votos[voto]++;
    }
    response.redirect("/");
});

app.get("/reset", (request, response) => {
    votos = {
        microcontroladores: 0,
        tecnicas_programacao: 0,
        programacao_web: 0
    };
    response.redirect("/");
});

app.use((request, response, next) => {
    response.status(404).send("<h1>Página não encontrada.</h1>");
});

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
});
