
# Trabalho Prático 07 - Semanas 13 e 14

A partir dos dados cadastrados na etapa anterior, vamos trabalhar formas de apresentação que representem de forma clara e interativa as informações do seu projeto. Você poderá usar gráficos (barra, linha, pizza), mapas, calendários ou outras formas de visualização. Seu desafio é entregar uma página Web que organize, processe e exiba os dados de forma compreensível e esteticamente agradável.

Com base nos tipos de projetos escohidos, você deve propor **visualizações que estimulem a interpretação, agrupamento e exibição criativa dos dados**, trabalhando tanto a lógica quanto o design da aplicação.

Sugerimos o uso das seguintes ferramentas acessíveis: [FullCalendar](https://fullcalendar.io/), [Chart.js](https://www.chartjs.org/), [Mapbox](https://docs.mapbox.com/api/), para citar algumas.

## Informações do trabalho

- Nome: Izabela Ribeiro Câmara
- Matricula: 737464
- Proposta de projeto escolhida: Lugares e Experiências
- Breve descrição sobre seu projeto: O projeto "Visit BH" é um guia digital e interativo sobre os pontos turísticos de Belo Horizonte.

**Print da tela com a implementação**

<< Coloque aqui uma breve explicação da implementação feita nessa etapa>> Nesta etapa, o projeto "Visit BH" foi aprimorado com uma nova funcionalidade de visualização de dados: um mapa interativo. Para que isso fosse possível, a estrutura de dados no db.json foi atualizada para incluir as coordenadas (latitude e longitude) de cada ponto turístico. O formulário de cadastro (cadastro_ponto.html) também foi modificado para permitir a inclusão e edição dessas coordenadas, integrando o mapa ao sistema de CRUD. Finalmente, o app.js foi atualizado para buscar esses dados da API, desenhar o mapa na nova página mapa.html usando a biblioteca Mapbox e adicionar um marcador (pin) interativo para cada local. Cada marcador, ao ser clicado, exibe um popup com informações e um link direto para a página de detalhes daquele ponto.

<<  COLOQUE A IMAGEM TELA 1 AQUI >>
<img width="1919" height="1029" alt="Captura de tela 2025-11-16 161351" src="https://github.com/user-attachments/assets/aed50755-f547-414c-a750-0ae3a70004a2" />


<<  COLOQUE A IMAGEM TELA 2 AQUI >> <img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/2c4ef1f3-61b5-40b0-a73a-0cb2ea5d4b83" />

