# Atividade 2 — próximos passos

O código foi preparado para a segunda atividade. Como o banco agora é PostgreSQL, o SQLite antigo não é usado nesta etapa.

## 1. Criar o PostgreSQL em nuvem
Crie o banco no Supabase ou Render PostgreSQL e copie a connection string PostgreSQL.

## 2. Configurar localmente
Crie/edite `.env` (não versionar):
```env
DATABASE_URL="SUA_CONNECTION_STRING_POSTGRESQL"
PORT=3000
```

Depois rode:
```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
npm run dev
```

## 3. Testes principais
- `GET http://localhost:3000/health`
- `GET http://localhost:3000/docs`
- recrie Profile, Technology e Project no PostgreSQL novo
- `POST /api/projects/1/feedbacks` com nota 1–5
- `PUT /api/projects/1/upvote`
- `GET /api/projects?technology=React&page=1&limit=10`
- teste `rating: 6` para confirmar `400 Bad Request`

## 4. Git
Depois que os testes locais passarem:
```bash
git add .
git commit -m "feat: regras avancadas, swagger e preparacao para deploy"
git push origin main
```

## 5. Render
Conecte o repositório ao Render e configure `DATABASE_URL`.
Build:
```text
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```
Start:
```text
npm start
```

## Observação
O deploy real não pode ser concluído dentro do ZIP porque exige as credenciais/URL do banco em nuvem e a conta do provedor. Não coloque senhas no GitHub.
