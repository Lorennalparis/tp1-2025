<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquete - Matérias Favoritas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 10px;
        }
        
        h2 {
            text-align: center;
            margin-bottom: 20px;
            font-weight: normal;
        }
        
        .container {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        .votacao-container, .resultados-container {
            flex: 1;
            min-width: 300px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .materia-btn {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid #007bff;
            background-color: white;
            cursor: pointer;
            font-size: 16px;
        }
        
        .materia-btn:hover {
            background-color: #f0f8ff;
        }
        
        .materia-btn.selecionado {
            background-color: #007bff;
            color: white;
        }
        
        .submit-btn {
            width: 100%;
            padding: 12px;
            margin: 15px 0;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        
        .submit-btn:hover:not(:disabled) {
            background-color: #218838;
        }
        
        .submit-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        .reset-btn {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            background-color: #dc3545;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
        
        .reset-btn:hover {
            background-color: #c82333;
        }
        
        .resultado {
            margin: 15px 0;
            padding: 15px;
            border: 1px solid #007bff;
            border-radius: 5px;
        }
        
        .materia-titulo {
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .barra-container {
            height: 25px;
            background-color: #f0f0f0;
            margin: 8px 0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .barra {
            height: 100%;
            background-color: #007bff;
            padding-right: 5px;
            color: white;
            font-size: 0.8em;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            transition: width 0.3s ease;
        }
        
        .stats {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            font-size: 0.9em;
            color: #555;
        }
        
        .total-votos {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            color: #333;
        }
        
        .vencedor {
            border-color: #28a745;
            background-color: #f8fff8;
        }
        
        .vencedor .barra {
            background-color: #28a745;
        }
        
        .notificacao {
            padding: 10px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            margin-bottom: 15px;
            text-align: center;
            display: none;
        }
        
        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            
            .votacao-container, .resultados-container {
                min-width: 100%;
            }
        }
    </style>
</head>
<body>
    <h1>Enquete - Matérias Favoritas</h1>
    
    <div class="container">
        <div class="votacao-container">
            <h2>Escolha sua matéria favorita</h2>
            
            <div class="notificacao" id="notificacao">
                Voto registrado com sucesso!
            </div>
            
            <form action="/votar" method="post" id="formVotacao">
                <div>
                    <button type="button" class="materia-btn" onclick="selecionarMateria('microcontroladores', this)">
                        Microcontroladores
                    </button>
                    <button type="button" class="materia-btn" onclick="selecionarMateria('tecnicas_programacao', this)">
                        Técnicas de Programação 1
                    </button>
                    <button type="button" class="materia-btn" onclick="selecionarMateria('programacao_web', this)">
                        Programação Web
                    </button>
                </div>
                
                <input type="hidden" name="voto" id="votoInput">
                
                <button type="submit" class="submit-btn" id="submitBtn" disabled>
                    Enviar Voto
                </button>
            </form>
            
            <form action="/reset" method="get">
                <button type="submit" class="reset-btn" onclick="return confirm('Tem certeza que deseja zerar todos os votos?')">
                    Zerar Votação
                </button>
            </form>
        </div>
        
        <div class="resultados-container">
            <h2>Resultados da Enquete</h2>
            <p class="total-votos">Total de votos: <strong><%= totalVotos %></strong></p>
            
            <div class="resultado <%= votos.microcontroladores >= Math.max(votos.tecnicas_programacao, votos.programacao_web) && votos.microcontroladores > 0 ? 'vencedor' : '' %>">
                <h3 class="materia-titulo">Microcontroladores</h3>
                <div class="barra-container">
                    <div class="barra" style="width: <%= totalVotos > 0 ? (votos.microcontroladores / totalVotos * 100) : 0 %>%;">
                        <%= totalVotos > 0 ? ((votos.microcontroladores / totalVotos * 100).toFixed(1)) : 0 %>%
                    </div>
                </div>
                <div class="stats">
                    <span><%= votos.microcontroladores %> votos</span>
                    <span><%= totalVotos > 0 ? ((votos.microcontroladores / totalVotos * 100).toFixed(1)) : 0 %>%</span>
                </div>
            </div>
            
            <div class="resultado <%= votos.tecnicas_programacao >= Math.max(votos.microcontroladores, votos.programacao_web) && votos.tecnicas_programacao > 0 ? 'vencedor' : '' %>">
                <h3 class="materia-titulo">Técnicas de Programação 1</h3>
                <div class="barra-container">
                    <div class="barra" style="width: <%= totalVotos > 0 ? (votos.tecnicas_programacao / totalVotos * 100) : 0 %>%;">
                        <%= totalVotos > 0 ? ((votos.tecnicas_programacao / totalVotos * 100).toFixed(1)) : 0 %>%
                    </div>
                </div>
                <div class="stats">
                    <span><%= votos.tecnicas_programacao %> votos</span>
                    <span><%= totalVotos > 0 ? ((votos.tecnicas_programacao / totalVotos * 100).toFixed(1)) : 0 %>%</span>
                </div>
            </div>
            
            <div class="resultado <%= votos.programacao_web >= Math.max(votos.microcontroladores, votos.tecnicas_programacao) && votos.programacao_web > 0 ? 'vencedor' : '' %>">
                <h3 class="materia-titulo">Programação Web</h3>
                <div class="barra-container">
                    <div class="barra" style="width: <%= totalVotos > 0 ? (votos.programacao_web / totalVotos * 100) : 0 %>%;">
                        <%= totalVotos > 0 ? ((votos.programacao_web / totalVotos * 100).toFixed(1)) : 0 %>%
                    </div>
                </div>
                <div class="stats">
                    <span><%= votos.programacao_web %> votos</span>
                    <span><%= totalVotos > 0 ? ((votos.programacao_web / totalVotos * 100).toFixed(1)) : 0 %>%</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        function selecionarMateria(materia, botao) {
            const botoes = document.querySelectorAll('.materia-btn');
            botoes.forEach(b => b.classList.remove('selecionado'));

            botao.classList.add('selecionado');
            document.getElementById('votoInput').value = materia;
            document.getElementById('submitBtn').disabled = false;
        }

        document.getElementById('formVotacao').addEventListener('submit', function() {
            const voto = document.getElementById('votoInput').value;
            localStorage.setItem('ultimoVoto', voto);
        });
    </script>
</body>
</html>
