import { prisma } from '../lib/prisma';
import { CreateProfileDTO, CreateTechnologyDTO, CreateProjectDTO, CreateFeedbackDTO, ProjectListQueryDTO } from '../dtos/schemas';

export class ProfileRepository {
  create(d: CreateProfileDTO) { return prisma.profile.create({ data: d }); }
  findById(id: number) { return prisma.profile.findUnique({ where: { id }, include: { projects: true } }); }
  findByEmail(email: string) { return prisma.profile.findUnique({ where: { email } }); }
}

export class TechnologyRepository {
  create(d: CreateTechnologyDTO) { return prisma.technology.create({ data: d }); }
  findAll() { return prisma.technology.findMany({ orderBy: { name: 'asc' } }); }
  findByName(name: string) { return prisma.technology.findUnique({ where: { name } }); }
  findByIds(ids: number[]) { return prisma.technology.findMany({ where: { id: { in: ids } } }); }
}

export class ProjectRepository {
  create(d: CreateProjectDTO) {
    const { technologyIds, ...data } = d;
    return prisma.project.create({
      data: { ...data, technologies: { connect: technologyIds.map(id => ({ id })) } },
      include: { profile: true, technologies: true, feedbacks: true },
    });
  }

  findById(id: number) {
    return prisma.project.findUnique({ where: { id }, include: { profile: true, technologies: true, feedbacks: true } });
  }

  async findAll(q: ProjectListQueryDTO) {
    const where = q.technology
      ? { technologies: { some: { name: { equals: q.technology, mode: 'insensitive' as const } } } }
      : {};
    const skip = (q.page - 1) * q.limit;
    const [items, total] = await prisma.$transaction([
      prisma.project.findMany({ where, include: { profile: true, technologies: true, feedbacks: true }, orderBy: { createdAt: 'desc' }, skip, take: q.limit }),
      prisma.project.count({ where }),
    ]);
    return { items, total };
  }

  incrementUpvote(id: number) {
    return prisma.project.update({ where: { id }, data: { upvotes: { increment: 1 } }, include: { technologies: true } });
  }

  updateAverageRating(id: number, averageRating: number) {
    return prisma.project.update({ where: { id }, data: { averageRating } });
  }
}

export class FeedbackRepository {
  create(projectId: number, d: CreateFeedbackDTO) { return prisma.feedback.create({ data: { ...d, projectId } }); }
  findByProject(projectId: number) { return prisma.feedback.findMany({ where: { projectId } }); }
  averageByProject(projectId: number) { return prisma.feedback.aggregate({ where: { projectId }, _avg: { rating: true } }); }
}
