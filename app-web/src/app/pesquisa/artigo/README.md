# Como adicionar novos artigos

Esta página de artigos funciona com duas partes separadas por slug:

1. **Metadados obrigatórios em JSON**: cada arquivo `*.json` em `app/pesquisa/artigo` é carregado automaticamente. Ele deve conter apenas `article_metadata` (slug, título, autor, data, tempo de leitura, resumo, categoria e tags) e os `insights` do artigo. Mantenha o JSON limpo, sem HTML embutido.
2. **Conteúdo em TSX recomendado**: um componente em `app/pesquisa/artigo/conteudos/<slug>.tsx` que exporte `default` é usado para renderizar o corpo. Se o componente não existir, a página mostra uma mensagem padrão sinalizando a ausência do conteúdo TSX.

Assim, ao criar um artigo novo, adicione **sempre** o JSON de metadados e, de forma preferencial, o TSX correspondente para o corpo. Basta seguir o mesmo `slug` em ambos os arquivos para que o carregamento automático funcione.
