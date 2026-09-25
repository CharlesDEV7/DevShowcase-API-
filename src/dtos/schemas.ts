import {z} from 'zod';
export const profileSchema=z.object({name:z.string().trim().min(1,'Nome obrigatório'),email:z.string().email('E-mail inválido'),bio:z.string().trim().max(500).optional()});
export const technologySchema=z.object({name:z.string().trim().min(1,'Nome obrigatório')});
export const projectSchema=z.object({title:z.string().trim().min(1,'Título obrigatório'),description:z.string().trim().optional(),repositoryUrl:z.string().url('URL do repositório inválida'),demoUrl:z.string().url('URL de demonstração inválida').optional(),profileId:z.number().int().positive(),technologyIds:z.array(z.number().int().positive()).default([])});
export const feedbackSchema=z.object({author:z.string().trim().min(1),comment:z.string().trim().min(1),projectId:z.number().int().positive()});
export type CreateProfileDTO=z.infer<typeof profileSchema>; export type CreateTechnologyDTO=z.infer<typeof technologySchema>; export type CreateProjectDTO=z.infer<typeof projectSchema>; export type CreateFeedbackDTO=z.infer<typeof feedbackSchema>;
