### Status do Pedido

Verifica as informações do pedido no site https://radar.tntbrasil.com.br com o puppeteer, monta uma mensagem e envia para um bot do telegram.

Pode ser executado com algum mecanismo de Cron, como o pm2, ou qualquer outro.

Foi utilizado com uma execução a cada 1 hora, onde a cada execução, é verificado um hash salvo em um serviço de Redis. Se o hash da mensagem for diferente da mensagem atual, ele faz um novo envio para o bot do telegram.

#### Variáveis de ambiente

- TELEGRAM_BOT_TOKEN: token fornecido pelo "bot father" do telegram
- TELEGRAM_CHAT_ID: chat id do cliente encontrado na url https://api.telegram.org/bot<token>/getUpdates

- REDIS_URL: url de conexão do redis
