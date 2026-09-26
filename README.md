# DevShowcase API — Atividade 2
Backend acadêmico com Node.js, Express, TypeScript, Prisma, PostgreSQL e Zod.

## Requisitos implementados
- Profile 1:N Project
- Project N:N Technology
- Project 1:N Feedback
- Feedback com nota de 1 a 5 e recálculo da média do projeto
- Upvote incremental em projetos
- Listagem de projetos com filtro por tecnologia e paginação
- Tratamento global de erros (400, 404, 409, 500 e validações Zod)
- Documentação OpenAPI/Swagger em `/docs`
- Configuração para PostgreSQL e deploy em PaaS (Render)

## Variáveis de ambiente
Copie `.env.example` para `.env` e configure uma URL PostgreSQL real:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
PORT=3000
```

Nunca envie o arquivo `.env` ao GitHub.

## Instalação e execução
```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
npm run dev
```

- Saúde: `GET /health`
- Swagger: `GET /docs`
- OpenAPI JSON: `GET /openapi.json`

## Endpoints da etapa anterior
- POST `/api/profiles`
- GET `/api/profiles/:id`
- POST `/api/technologies`
- GET `/api/technologies`
- POST `/api/projects`
- GET `/api/projects`

## Novos endpoints da Atividade 2
### Feedback
`POST /api/projects/:id/feedbacks`
```json
{
  "author": "Aluno",
  "rating": 5,
  "comment": "Projeto muito bom"
}
```
A nota aceita valores inteiros de 1 a 5. Após o cadastro, a média (`averageRating`) do projeto é recalculada.

### Upvote
`PUT /api/projects/:id/upvote`
Incrementa `upvotes` em 1.

### Filtro e paginação
`GET /api/projects?page=1&limit=10`

Filtro opcional por tecnologia:
`GET /api/projects?technology=React&page=1&limit=10`

Resposta inclui `data` e metadados em `pagination`.

## Teste de erro 400 para o vídeo
Envie uma nota fora do intervalo:
```json
{
  "author": "Teste",
  "rating": 6,
  "comment": "Nota inválida"
}
```
A API deve responder `400 Bad Request` pelo manipulador global.

## Deploy no Render
1. Crie/provisione um PostgreSQL em nuvem (Supabase ou Render PostgreSQL).
2. No serviço Web do Render, conecte este repositório GitHub.
3. Configure `DATABASE_URL` nas Environment Variables.
4. Build Command sugerido:
   `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
5. Start Command:
   `npm start`
6. Após o deploy, valide `/health`, `/docs` e os endpoints públicos no Postman.

## Entrega
O PDF final deve conter 3 links:
1. Repositório GitHub.
2. URL pública da API em produção.
3. Vídeo não listado no YouTube (5–8 minutos).
