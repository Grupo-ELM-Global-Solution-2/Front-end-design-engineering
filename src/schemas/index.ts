import { z } from 'zod';

// ============================================
// USER SCHEMAS
// ============================================

export const UserSchema = z.object({
    idUser: z.number().int().positive(),
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
    email: z.string().email('Email inválido').toLowerCase(),
    senha: z.string().optional()
});

export const LoginSchema = z.object({
    email: z.string().email('Email inválido').toLowerCase(),
    senha: z.string().min(1, 'Senha é obrigatória')
});

export const RegisterSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
    email: z.string().email('Email inválido').toLowerCase(),
    senha: z.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .regex(/\d/, 'A senha deve conter pelo menos 1 número')
});

export const UpdateUserSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
    email: z.string().email('Email inválido').toLowerCase().optional(),
    senha: z.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .regex(/\d/, 'A senha deve conter pelo menos 1 número')
        .optional()
});

// ============================================
// TRILHA SCHEMAS
// ============================================

export const ModuloSchema = z.object({
    idModulo: z.number().int().positive(),
    nome: z.string().min(1, 'Nome do módulo é obrigatório'),
    duracao: z.string(),
    link: z.string().url('Link inválido'),
    idTrilha: z.number().int().positive()
});

export const TrilhaProntaSchema = z.object({
    idTrilha: z.number().int().positive().optional(),
    nome: z.string().min(1, 'Nome da trilha é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    dificuldade: z.enum(['Iniciante', 'Intermediário', 'Avançado']),
    modulos: z.array(ModuloSchema).optional()
});

// ============================================
// TRILHA PERSONALIZADA SCHEMAS
// ============================================

export const ModuloPersonalizadoSchema = z.object({
    id: z.number().int().positive(),
    nome: z.string().min(1, 'Nome do módulo é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    duracao: z.string()
});

export const TrilhaPersonalizadaSchema = z.object({
    id: z.string().optional(),
    interesse: z.string().min(1, 'Interesse é obrigatório'),
    dificuldade: z.string().min(1, 'Dificuldade é obrigatória'),
    disponibilidade: z.string().min(1, 'Disponibilidade é obrigatória'),
    respostaIA: z.string(),
    modulos: z.array(ModuloPersonalizadoSchema)
});

export const TrilhaPersonalizadaFormSchema = z.object({
    objetivo: z.string().min(3, 'O objetivo deve ter no mínimo 3 caracteres'),
    dificuldade: z.enum(['Iniciante', 'Intermediário', 'Avançado']),
    tempoDisponivel: z.string().min(1, 'Tempo disponível é obrigatório'),
    preferencias: z.array(z.string())
});

// ============================================
// PROGRESSO SCHEMAS
// ============================================

export const ProgressoSchema = z.object({
    id: z.number().int().positive().optional(),
    idUser: z.number().int().positive(),
    status: z.number().int().min(0).max(2), // 0: não iniciado, 1: em progresso, 2: concluído
    idModulo: z.number().int().positive(),
    idTrilha: z.number().int().positive()
});

export const UpsertProgressoSchema = z.object({
    idProgresso: z.number().int().positive().optional(),
    idUser: z.number().int().positive(),
    idModulo: z.number().int().positive(),
    status: z.number().int().min(0).max(2)
});

// ============================================
// SUGESTAO SCHEMAS
// ============================================

export const SugestaoSchema = z.object({
    idSugestoes: z.number().int().positive(),
    titulo: z.string().min(1, 'Título é obrigatório'),
    tipo: z.enum(['video', 'artigo', 'curso', 'projeto']),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    duracao: z.string(),
    dificuldade: z.string(),
    link: z.string().url('Link inválido')
});

// ============================================
// CONTATO SCHEMAS
// ============================================

export const ContatoSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('Email inválido').toLowerCase(),
    assunto: z.enum(['duvida', 'suporte', 'parceria', 'feedback', 'outro']),
    mensagem: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres').max(1000, 'Mensagem muito longa (máximo 1000 caracteres)')
});

// ============================================
// TYPE EXPORTS (inferred from schemas)
// ============================================

export type User = z.infer<typeof UserSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

export type Modulo = z.infer<typeof ModuloSchema>;
export type TrilhaPronta = z.infer<typeof TrilhaProntaSchema>;

export type ModuloPersonalizado = z.infer<typeof ModuloPersonalizadoSchema>;
export type TrilhaPersonalizada = z.infer<typeof TrilhaPersonalizadaSchema>;
export type TrilhaPersonalizadaForm = z.infer<typeof TrilhaPersonalizadaFormSchema>;

export type Progresso = z.infer<typeof ProgressoSchema>;
export type UpsertProgresso = z.infer<typeof UpsertProgressoSchema>;

export type Sugestao = z.infer<typeof SugestaoSchema>;

export type ContatoData = z.infer<typeof ContatoSchema>;
