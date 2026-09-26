import { Request, Response, NextFunction } from 'express';
import { profileSchema, technologySchema, projectSchema, feedbackSchema, projectListQuerySchema } from '../dtos/schemas';
import { ProfileService, TechnologyService, ProjectService } from '../services/services';
import { AppError } from '../utils/app-error';

const ps = new ProfileService();
const ts = new TechnologyService();
const js = new ProjectService();

function positiveId(value: string) {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw new AppError(400, 'ValidationError', 'ID inválido');
  return id;
}

export const profiles = {
  create: async (req: Request, res: Response, next: NextFunction) => { try { res.status(201).json(await ps.create(profileSchema.parse(req.body))); } catch (e) { next(e); } },
  get: async (req: Request, res: Response, next: NextFunction) => { try { res.json(await ps.get(positiveId(String(req.params.id)))); } catch (e) { next(e); } },
};

export const technologies = {
  create: async (req: Request, res: Response, next: NextFunction) => { try { res.status(201).json(await ts.create(technologySchema.parse(req.body))); } catch (e) { next(e); } },
  list: async (_req: Request, res: Response, next: NextFunction) => { try { res.json(await ts.list()); } catch (e) { next(e); } },
};

export const projects = {
  create: async (req: Request, res: Response, next: NextFunction) => { try { res.status(201).json(await js.create(projectSchema.parse(req.body))); } catch (e) { next(e); } },
  list: async (req: Request, res: Response, next: NextFunction) => { try { res.json(await js.list(projectListQuerySchema.parse(req.query))); } catch (e) { next(e); } },
  upvote: async (req: Request, res: Response, next: NextFunction) => { try { res.json(await js.upvote(positiveId(String(req.params.id)))); } catch (e) { next(e); } },
  feedback: async (req: Request, res: Response, next: NextFunction) => { try { res.status(201).json(await js.addFeedback(positiveId(String(req.params.id)), feedbackSchema.parse(req.body))); } catch (e) { next(e); } },
};
