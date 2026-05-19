# Câncer de mama — Folder educativo (MVP)

Página única em estilo folder/panfleto para o projeto de extensão da **turma T60 de Biomedicina (UNIFESP)**.

Conteúdo resumido com base na cartilha do [INCA](https://www.gov.br/inca/pt-br/assuntos/cancer-de-mama).

## Visualizar

Abra `index.html` no navegador ou acesse o site publicado (após ativar o Pages):

**https://kayhori.github.io/cancer-de-mama/**

## Publicar (GitHub Pages + Actions)

1. Abra [Settings → Pages](https://github.com/kayhori/cancer-de-mama/settings/pages).
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Faça push na `main` (ou rode o workflow manualmente em **Actions**).
4. Aguarde o job **Deploy to GitHub Pages** concluir; o link acima ficará disponível.

O deploy roda em [`.github/workflows/pages.yml`](.github/workflows/pages.yml) a cada push na `main`.
