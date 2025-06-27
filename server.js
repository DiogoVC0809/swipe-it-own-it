const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/api/upload', (req, res) => {
  const surveyData = req.body;

  // Cria um arquivo na pasta Resultados
  const filePath = path.join(__dirname, 'Resultados', `survey-${Date.now()}.json`);

  fs.writeFile(filePath, JSON.stringify(surveyData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao salvar o arquivo.' });
    }
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
