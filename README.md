# DevShowcase API
Backend acadêmico com Node.js, Express, TypeScript, Prisma, SQLite e Zod.

## Modelo
- Profile 1:N Project
- Project N:N Technology
- Project 1:N Feedback

## Executar
```bash
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
Teste `GET http://localhost:3000/health`.

## Endpoints obrigatórios
- POST `/api/profiles` — body: `{"name":"Victor Manuel","email":"victor@example.com","bio":"Desenvolvedor em formação"}`
- GET `/api/profiles/1`
- POST `/api/technologies` — body: `{"name":"React"}`
- GET `/api/technologies`
- POST `/api/projects` — body: `{"title":"SIGEC","description":"Sistema Integrado de Gestão Comercial","repositoryUrl":"https://github.com/CharlesDEV7/SIGEC","profileId":1,"technologyIds":[1]}`
- GET `/api/projects`

POSTs válidos retornam 201. Validação retorna 400; recurso inexistente 404; duplicidade 409. Crie Profile e Technology antes do Project e use os IDs retornados.

## Validações para demonstrar no Postman
- Profile: e-mail inválido -> 400.
- Technology: nome vazio -> 400.
- Project: título vazio ou repositoryUrl inválida -> 400.
- Project: profileId inexistente -> 404.
- Project: technologyIds inexistentes -> 400.

Arquitetura: routes -> controllers -> services -> repositories -> Prisma -> SQLite. Feedback está modelado e possui repository; o enunciado desta etapa não exige endpoint de Feedback.
