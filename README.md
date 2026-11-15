# Mundo Blox · Abrir no navegador

Versão independente para Android e iPhone. Este repositório não altera a versão original da landing.

## Abertura com um toque

- Android: o botão usa um link `intent:` para tentar abrir o destino no Chrome. Se a abertura não for permitida, a página oferece o guia manual.
- iPhone/iPad: o botão tenta abrir no Safari usando `x-safari-https:`. A página HTTPS `ir.html` continua para o destino configurado. Há também uma opção para tentar no Chrome, caso esteja instalado.
- Computador: o botão abre o endereço de destino normalmente.

Os links para aplicativos só são acionados por um toque do visitante. Não há tentativa automática de sair do aplicativo ao carregar a landing, nem repetição de tentativas. A página não consegue confirmar se o navegador externo abriu. A animação é um exemplo e continua disponível como ajuda.

O suporte depende do sistema e da versão do TikTok. O esquema do Safari não é uma API pública garantida pela Apple. É necessário validar a saída real em Android e iPhone com TikTok; a emulação de navegador no computador só verifica aparência, detecção e links.

Arquivos adicionais: `browser-open.js`, `browser-open.css`, `ir.html` e `browser-relay.js`. O redirecionamento usa exclusivamente `config.js`, nunca um destino recebido pela URL.

Referências: [Android Intents](https://developer.chrome.com/docs/android/intents), [Chrome no iOS](https://chromium.googlesource.com/chromium/src.git/+/master/docs/ios/opening_links.md), [uso do esquema Safari no código do Telegram](https://github.com/TelegramMessenger/Telegram-iOS/commit/bae459179959bfb28d5580aecf83221460c18a2a).

Landing page em português. O guia animado aparece no início, antes da capa. Mostra como abrir a página pelo TikTok e mantém o exemplo de copiar e colar.

## Reprodução automática

A animação começa sozinha, percorre as três etapas e volta ao início. Cada ciclo dura 11,6 segundos. Não há botão obrigatório para começar. A pausa, a repetição e a seleção manual de etapas continuam disponíveis.

Conforme solicitado, a animação também começa em dispositivos com movimento reduzido. O visitante pode pausar. A reprodução é suspensa quando a demonstração sai da tela ou a guia do navegador fica oculta.

## Arquivos

O projeto contém tudo na raiz: `index.html`, CSS, JavaScript, `.nojekyll` e `assets/`. Não precisa de instalação ou compilação. No GitHub Pages, publique a branch `main` a partir da pasta raiz (`/`).

- `config.js`: nome e endereço de destino.
- `index.html`: estrutura e textos.
- `browser-guide.js` e `browser-guide.css`: guia automático com setas.
- `tutorial.js` e `tutorial.css`: exemplo de copiar e colar.
- `app.js`: cópia do link e animação da capa.
- `assets/`: imagens, animações e fontes.

O botão «Continuar para o site» usa o endereço de `config.js`. A demonstração orienta o visitante; ele deve abrir o menu real do TikTok. O projeto não inclui credenciais nem a identidade do projeto de Sites.
