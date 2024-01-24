async function budgetHtml(budget) {
    return (
        `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        margin: 0;
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
            
                    .header {
                        padding: 20px;
                        text-align: center;
                    }
            
                    .header img {
                        display: block;
                        margin: auto;
                        max-width: 150px;
                        height: auto;
                    }
            
                    .content {
                        padding: 30px;
                        text-align: center;
                    }
            
                    .content h2 {
                        font-size: 24px;
                        color: #333333;
                        margin-bottom: 20px;
                    }
            
                    .content p {
                        font-size: 18px;
                        color: #555555;
                        margin-bottom: 15px;
                    }
            
                    .content hr {
                        border: 1px solid #dddddd;
                        margin: 20px 0;
                    }
            
                    .cta {
                        font-size: 18px;
                        color: #007BFF;
                        margin-bottom: 10px;
                    }
            
                    .cta a {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007BFF;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            
            <body>
            
                <div class="container">
                    <div class="header">
                        <img src="https://mf-planejados.s3.amazonaws.com/logo.png" alt="Logo da Empresa">
                    </div>
                    <div class="content">
                        <h2>Contato - Orçamento</h2>
            
                        <p><strong>Nome:</strong> ${budget?.name}</p>
                        <p><strong>E-mail:</strong> ${budget?.email}</p>
                        <p><strong>Contato:</strong> ${budget?.telephone}</p>
            
                        <hr>
            
                        <p><strong>Mensagem:</strong></p>
                        <p>${budget?.message}</p>
            
                        <p class="cta">Acesse o painel M&F Admin para analisar o orçamento:</p>
                        <a href="https://www.mfplanejadoseferragens.online" target="_blank">Painel Admin</a>
                    </div>
                </div>
            
            </body>
            
            </html>
        `
    )
}


module.exports = {
    budgetHtml
};