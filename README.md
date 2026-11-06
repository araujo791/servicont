# Servicont

Site institucional responsivo da Servicont Contabilidade & Assessoria Empresarial, recriado a partir de https://guipgd.wixsite.com/contabilidade em 06/11/2026.

## Executar

Abra `index.html` no navegador ou sirva esta pasta com qualquer servidor estático. Não há dependências nem etapa de build. Para desenvolvimento, com Python instalado:

```sh
python -m http.server 8000
```

## Conteúdo

- `index.html`: apresentação, história, contabilidade, Notarial/Registral e contato.
- `area-do-cliente.html`: acesso ao portal Questor original.
- `informativo.html`: página reservada; a página de origem não apresentava artigos no momento da consulta.
- `styles.css` e `script.js`: layout responsivo, navegação móvel e formulário.
- `assets/`: marca e fotografias do site de origem, armazenadas localmente. As fotografias foram otimizadas para web.

Os textos institucionais foram preservados, inclusive as referências temporais e o copyright do original. Novos títulos de navegação e apoio complementam o layout. Os dados de contato incluem o e-mail informado pelo responsável: `wolnei@servicont.net`.

## Formulário

O formulário valida os campos no navegador e abre o aplicativo de e-mail do visitante por `mailto:`, com destinatário, assunto e mensagem preenchidos. O visitante precisa concluir o envio no aplicativo. Não há backend nem confirmação automática de entrega. Para envio direto pelo site, será necessário integrar um serviço de formulários ou backend com credenciais apropriadas.

## Hospedagem

A pasta raiz pode ser publicada em qualquer hospedagem estática, incluindo GitHub Pages (branch `main`, pasta `/`). Nenhuma hospedagem é ativada automaticamente por este repositório.

As fontes são carregadas pelo Google Fonts; na ausência de conexão, o site usa Arial. Os demais recursos visuais são locais.
