import { CreateProfileDTO, CreateTechnologyDTO, CreateProjectDTO, CreateFeedbackDTO, ProjectListQueryDTO } from '../dtos/schemas';
import { ProfileRepository, TechnologyRepository, ProjectRepository, FeedbackRepository } from '../repositories/repositories';
import { AppError } from '../utils/app-error';

const pr = new ProfileRepository();
const tr = new TechnologyRepository();
const jr = new ProjectRepository();
const fr = new FeedbackRepository();

export class ProfileService {
  async create(d: CreateProfileDTO) {
    if (await pr.findByEmail(d.email)) throw new AppError(409, 'Conflict', 'E-mail já cadastrado');
    return pr.create(d);
  }
  async get(id: number) {
    const x = await pr.findById(id);
    if (!x) throw new AppError(404, 'NotFound', 'Profile não encontrado');
    return x;
  }
}

export class TechnologyService {
  async create(d: CreateTechnologyDTO) {
    if (await tr.findByName(d.name)) throw new AppError(409, 'Conflict', 'Tecnologia já cadastrada');
    return tr.create(d);
  }
  list() { return tr.findAll(); }
}

export class ProjectService {
  async create(d: CreateProjectDTO) {
    if (!await pr.findById(d.profileId)) throw new AppError(404, 'NotFound', 'Profile informado não existe');
    const ids = [...new Set(d.technologyIds)];
    if ((await tr.findByIds(ids)).length !== ids.length) throw new AppError(400, 'ValidationError', 'Uma ou mais tecnologias não existem');
    return jr.create({ ...d, technologyIds: ids });
  }

  async list(q: ProjectListQueryDTO) {
    const { items, total } = await jr.findAll(q);
    return { data: items, pagination: { page: q.page, limit: q.limit, total, totalPages: Math.ceil(total / q.limit) } };
  }

  async upvote(id: number) {
    if (!await jr.findById(id)) throw new AppError(404, 'NotFound', 'Projeto não encontrado');
    return jr.incrementUpvote(id);
  }

  async addFeedback(projectId: number, d: CreateFeedbackDTO) {
    if (!await jr.findById(projectId)) throw new AppError(404, 'NotFound', 'Projeto não encontrado');
    const feedback = await fr.create(projectId, d);
    const avg = await fr.averageByProject(projectId);
    const averageRating = Number((avg._avg.rating ?? 0).toFixed(2));
    await jr.updateAverageRating(projectId, averageRating);
    return { feedback, averageRating };
  }
}
