const port = 3000;

const express = require('express');
const fs = require('fs').promises;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("codigoindex");
});

app.get("/index", (req, res) => {
    res.render("codigoindex");
});

app.get("/produtos", (req, res) => {
    res.render("codigoprodutos");
});

app.get("/fotos", (req, res) => {
    res.render("codigofotos");
});

app.get("/detalhes", (req, res) => {
    res.render("codigodetalhes");
});

app.get("/contato", (req, res) => {
    res.render("codigocontato");
});

app.post("/respostas", async (req, res) => {
    try {
        const dados = req.body;

        await fs.appendFile(
            "app.json",
            JSON.stringify(dados) + "\n",
            "utf-8"
        );

        console.log("Dados salvos:", dados);

        res.redirect("/respostas");

    } catch (err) {
        console.error("Erro ao salvar:", err);
        res.send("Erro ao salvar dados");
    }
});

app.get("/respostas", async (req, res) => {
    try {

        const conteudo = await fs.readFile("app.json", "utf-8");

        const linhas = conteudo.trim().split("\n");

        const dados = linhas.map(linha => JSON.parse(linha));

        res.render("codigorespostas", { dados });

    } catch (err) {
        console.error("Erro ao ler arquivo:", err);

        res.render("codigorespostas", { dados: [] });
    }
});

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});
