import { Router } from 'express';
import { profiles, technologies, projects } from '../controllers/controllers';

const r = Router();
r.post('/profiles', profiles.create);
r.get('/profiles/:id', profiles.get);
r.post('/technologies', technologies.create);
r.get('/technologies', technologies.list);
r.post('/projects', projects.create);
r.get('/projects', projects.list);
r.post('/projects/:id/feedbacks', projects.feedback);
r.put('/projects/:id/upvote', projects.upvote);
export default r;
