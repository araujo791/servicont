# Servicont

Site institucional da Servicont Contabilidade & Assessoria Empresarial, com foco em contabilidade e no departamento Notarial/Registral.

## Executar

Abra `index.html` no navegador ou sirva esta pasta com qualquer servidor estático. Não há dependências nem etapa de build. Para desenvolvimento, com Python instalado:

```sh
python -m http.server 8000
```

## Estrutura e apresentação

- `index.html`: apresentação, serviços contábeis, Notarial/Registral, história e contato.
- `styles.css`: tema claro em branco e marfim, azul-marinho e detalhes dourados, tipografia editorial e layout responsivo.
- `script.js`: carrossel, navegação móvel, animações ao rolar e preparação da mensagem de contato.
- `assets/`: marca original e novas fotografias ilustrativas do Pexels, armazenadas localmente em WebP com versões de 640 e 1200 pixels. Veja autoria, fontes e licença em [Créditos das imagens](CREDITOS-IMAGENS.md).

As páginas Informativo e Área do Cliente foram removidas a pedido do responsável, assim como seus acessos no menu. Os textos de história, a descrição e a lista de serviços contábeis e a apresentação do departamento Notarial/Registral foram preservados do site https://guipgd.wixsite.com/contabilidade, consultado em 06/11/2026. Os títulos e textos de apoio foram reformulados para a nova apresentação. As datas da história e o copyright original foram mantidos.

O layout inclui menu móvel, atalho para pular ao conteúdo, estados de foco visíveis, rótulos de formulário e respeito à preferência por movimento reduzido. As fontes DM Sans e Instrument Serif são carregadas pelo Google Fonts, com alternativas locais Arial e Georgia.

## Efeitos e destaques

A abertura possui três slides: assessoria empresarial, serviços contábeis e Notarial/Registral. Cada um combina título animado, fotografia e frases sobrepostas em HTML, mantendo o texto selecionável e acessível. Não são necessárias novas imagens nem bibliotecas de animação.

- Troca automática a cada sete segundos, com botões anterior/próximo, seleção direta e controle de pausa.
- A troca pausa enquanto o ponteiro está sobre o carrossel, quando a aba fica oculta ou quando o carrossel sai da tela. A navegação manual e o foco nos links interrompem a reprodução; o visitante pode retomá-la pelo botão de reprodução.
- Navegação por setas do teclado nos controles e gesto horizontal em telas de toque.
- A preferência por movimento reduzido desativa as animações e a reprodução automática inicial.
- Entradas discretas de conteúdo com `IntersectionObserver`, efeitos nos serviços ao passar o mouse e barra de progresso de leitura no cabeçalho.
- Sem JavaScript, o primeiro destaque e o conteúdo institucional continuam disponíveis; os controles do carrossel ficam ocultos.

A versão foi verificada com validação de HTML, recursos e âncoras, checagem de sintaxe JavaScript e testes de interação em DOM simulado. A prévia visual no navegador não está disponível no ambiente usado nesta atualização.

## Formulário

O formulário valida os campos no navegador e abre o aplicativo de e-mail do visitante por `mailto:`, com destinatário `wolnei@servicont.net`, assunto e mensagem preenchidos. O visitante precisa concluir o envio no aplicativo. Não há backend nem confirmação automática de entrega. Para envio direto pelo site, será necessário integrar um serviço de formulários ou backend com credenciais apropriadas.

## Hospedagem

A pasta raiz pode ser publicada em qualquer hospedagem estática, incluindo GitHub Pages (branch `main`, pasta `/`). Nenhuma hospedagem é ativada automaticamente por este repositório.
