export const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'DevShowcase API',
    version: '2.0.0',
    description: 'API acadêmica com regras avançadas, tratamento global de erros e deploy em produção.',
  },
  servers: [{ url: '/', description: 'Servidor atual' }],
  components: {
    schemas: {
      ProfileInput: {
        type: 'object', required: ['name', 'email'],
        properties: { name: { type: 'string', example: 'Jean Charles' }, email: { type: 'string', format: 'email', example: 'jean@example.com' }, bio: { type: 'string', example: 'Desenvolvedor' } },
      },
      TechnologyInput: {
        type: 'object', required: ['name'], properties: { name: { type: 'string', example: 'React' } },
      },
      ProjectInput: {
        type: 'object', required: ['title', 'repositoryUrl', 'profileId'],
        properties: {
          title: { type: 'string', example: 'DevShowcase' },
          description: { type: 'string', example: 'Projeto acadêmico' },
          repositoryUrl: { type: 'string', format: 'uri', example: 'https://github.com/exemplo/devshowcase' },
          demoUrl: { type: 'string', format: 'uri', example: 'https://example.com' },
          profileId: { type: 'integer', example: 1 },
          technologyIds: { type: 'array', items: { type: 'integer' }, example: [1] },
        },
      },
      FeedbackInput: {
        type: 'object', required: ['author', 'rating', 'comment'],
        properties: {
          author: { type: 'string', example: 'Aluno' },
          rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
          comment: { type: 'string', example: 'Projeto muito bom' },
        },
      },
      Error: {
        type: 'object', properties: { error: { type: 'string' }, message: { type: 'string' } },
      },
    },
  },
  paths: {
    '/health': { get: { summary: 'Verifica a saúde da API', responses: { '200': { description: 'API funcionando' } } } },
    '/api/profiles': {
      post: {
        summary: 'Cadastrar perfil',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ProfileInput' } } } },
        responses: { '201': { description: 'Perfil criado' }, '400': { description: 'Dados inválidos' }, '409': { description: 'E-mail já cadastrado' } },
      },
    },
    '/api/profiles/{id}': {
      get: {
        summary: 'Buscar perfil por ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', minimum: 1 } }],
        responses: { '200': { description: 'Perfil encontrado' }, '400': { description: 'ID inválido' }, '404': { description: 'Perfil não encontrado' } },
      },
    },
    '/api/technologies': {
      post: {
        summary: 'Cadastrar tecnologia',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/TechnologyInput' } } } },
        responses: { '201': { description: 'Tecnologia criada' }, '400': { description: 'Dados inválidos' }, '409': { description: 'Tecnologia já cadastrada' } },
      },
      get: { summary: 'Listar tecnologias', responses: { '200': { description: 'Lista de tecnologias' } } },
    },
    '/api/projects': {
      post: {
        summary: 'Cadastrar projeto',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ProjectInput' } } } },
        responses: { '201': { description: 'Projeto criado' }, '400': { description: 'Dados inválidos' }, '404': { description: 'Profile não encontrado' } },
      },
      get: {
        summary: 'Listar projetos com filtro e paginação',
        parameters: [
          { name: 'technology', in: 'query', schema: { type: 'string' }, description: 'Filtra pelo nome da tecnologia' },
          { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 } },
        ],
        responses: { '200': { description: 'Projetos paginados' }, '400': { description: 'Parâmetros inválidos' } },
      },
    },
    '/api/projects/{id}/feedbacks': {
      post: {
        summary: 'Cadastrar feedback (nota 1 a 5) e recalcular média',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', minimum: 1 } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/FeedbackInput' } } } },
        responses: { '201': { description: 'Feedback criado e média atualizada' }, '400': { description: 'Nota ou dados inválidos' }, '404': { description: 'Projeto não encontrado' } },
      },
    },
    '/api/projects/{id}/upvote': {
      put: {
        summary: 'Incrementar curtidas/estrelas do projeto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer', minimum: 1 } }],
        responses: { '200': { description: 'Upvote incrementado' }, '400': { description: 'ID inválido' }, '404': { description: 'Projeto não encontrado' } },
      },
    },
  },
};

export const swaggerHtml = `<!doctype html><html><head><meta charset="utf-8"><title>DevShowcase API - Swagger</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css"></head><body><div id="swagger-ui"></div><script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({url:'/openapi.json',dom_id:'#swagger-ui'});</script></body></html>`;
