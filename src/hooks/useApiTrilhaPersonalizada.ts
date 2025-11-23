import { useCallback } from 'react';
import { useApiBase } from './useApiBase';
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { TrilhaPersonalizada } from '../types/trilhaPersonalizada';
import { getTrilhaSteps } from '../data/trilhaSteps';

// Inicializa a IA
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY não encontrada no .env.local. Por favor, adicione sua chave lá.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

// Hook específico para trilhas personalizadas
export function useTrilhaPersonalizada() {
    const { loading, error, fetchApi } = useApiBase();

    const gerarTrilhaPersonalizada = useCallback(async (formData: {
        objetivo: string;
        dificuldade: string;
        tempoDisponivel: string;
        preferencias: string[];
    }) => {
        try {
            // Busca dados das trilhas existentes para contextualizar
            const trilhaBase = getTrilhaSteps(formData.objetivo);

            // Engenharia de Prompt
            const prompt = `
                Você é um mentor de carreira sênior especializado em desenvolvimento de software.
                O usuário quer aprender ${formData.objetivo} e tem dificuldade ${formData.dificuldade}.
                Tem ${formData.tempoDisponivel} horas disponíveis por semana.

                BASEADO NAS TRILHAS EXISTENTES DO SISTEMA:
                ${trilhaBase.map(step => `- ${step.titulo}: ${step.descricao} (${step.duracao})`).join('\n')}

                Sua tarefa é criar uma trilha de aprendizado personalizada baseada nas trilhas existentes, mas adaptada ao perfil do usuário.

                Responda APENAS com um JSON válido contendo exatamente estas 2 chaves:

                1. "respostaIA": Uma string com uma mensagem motivacional e personalizada explicando por que esta trilha é perfeita para o perfil do usuário, mencionando elementos das trilhas existentes.

                2. "modulos": Um array de 3-5 objetos selecionados/adaptados das trilhas existentes, cada um com:
                   - "titulo": string (nome do módulo baseado nas trilhas existentes)
                   - "descricao": string (breve descrição explicativa do que será aprendido neste módulo)
                   - "duracao": string (duração realista baseada no tempo disponível)

                IMPORTANTE:
                - Selecione módulos das trilhas existentes (${trilhaBase.map(s => s.titulo).join(', ')})
                - Adapte as durações ao tempo disponível (${formData.tempoDisponivel})
                - Considere a dificuldade do usuário (${formData.dificuldade})
                - Mantenha as durações realistas e sequenciais
                - NÃO inclua links externos, vídeos ou referências web
                - Foque apenas em explicações textuais simples
            `;

            // Chama a API da IA
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textResponse = response.text();

            // Limpa e parseia o JSON
            const jsonString = textResponse.replace(/^```json\s*/, '').replace(/```$/, '').trim();
            const aiData = JSON.parse(jsonString);

            // Valida a resposta da IA
            if (!aiData.respostaIA || !Array.isArray(aiData.modulos)) {
                throw new Error('Resposta da IA inválida - estrutura incorreta');
            }

            // Adiciona IDs aos módulos
            const modulosComId = aiData.modulos.map((modulo: { titulo: string; descricao: string; duracao: string }, index: number) => ({
                id: index + 1,
                nome: modulo.titulo,
                descricao: modulo.descricao,
                duracao: modulo.duracao
            }));

            // Prepara dados para salvar
            const assessmentData: Omit<TrilhaPersonalizada, 'id'> = {
                interesse: formData.objetivo,
                dificuldade: formData.dificuldade,
                disponibilidade: formData.tempoDisponivel,
                respostaIA: aiData.respostaIA,
                modulos: modulosComId
            };

            // Salva no backend
            const idUserStr = localStorage.getItem('idUser');
            if (!idUserStr) {
                throw new Error('Usuário não autenticado. Por favor, faça login novamente.');
            }
            const idUser = parseInt(idUserStr, 10);
            const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (LocalDate)
            const savedAssessment = await fetchApi('/trilhapersonalizada', {
                method: 'POST',
                body: JSON.stringify({
                    idUser: idUser,
                    jsonConteudo: JSON.stringify(assessmentData),
                    dataCriacao: today
                })
            });

            return savedAssessment;

        } catch (err) {
            console.error('Erro ao gerar trilha com IA:', err);
            // Em caso de erro da IA, salva apenas uma mensagem de erro
            const assessmentData: Omit<TrilhaPersonalizada, 'id'> = {
                interesse: formData.objetivo,
                dificuldade: formData.dificuldade,
                disponibilidade: formData.tempoDisponivel,
                respostaIA: `❌ ERRO NA GERAÇÃO DA IA: ${err instanceof Error ? err.message : 'Erro desconhecido'}. A IA não conseguiu gerar uma trilha personalizada neste momento.`,
                modulos: []
            };

            const idUserStr = localStorage.getItem('idUser');
            if (!idUserStr) {
                throw new Error('Usuário não autenticado. Por favor, faça login novamente.');
            }
            const idUser = parseInt(idUserStr, 10);
            const today = new Date().toISOString().split('T')[0];
            return await fetchApi('/trilhapersonalizada', {
                method: 'POST',
                body: JSON.stringify({
                    idUser: idUser,
                    jsonConteudo: JSON.stringify(assessmentData),
                    dataCriacao: today
                })
            });
        }
    }, [fetchApi]);

    const getTrilhasPersonalizadas = useCallback(async (idUser: number) => {
        return await fetchApi(`/trilhapersonalizada/usuario/${idUser}`);
    }, [fetchApi]);

    const getTrilhaPersonalizadaById = useCallback(async (id: string) => {
        return await fetchApi(`/trilhapersonalizada/${id}`);
    }, [fetchApi]);

    const deleteTrilhaPersonalizada = useCallback(async (id: string) => {
        return await fetchApi(`/trilhapersonalizada/${id}`, {
            method: 'DELETE'
        });
    }, [fetchApi]);

    return {
        loading,
        error,
        gerarTrilhaPersonalizada,
        getTrilhasPersonalizadas,
        getTrilhaPersonalizadaById,
        deleteTrilhaPersonalizada,
    };
}
