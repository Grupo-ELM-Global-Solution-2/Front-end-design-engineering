import { useCallback } from 'react';
import { useApiBase } from './useApiBase';
import { sugestoes, type Sugestao } from '../data/sugestoes';

// Hook específico para trilhas personalizadas
export function useTrilhaPersonalizada() {
    const { loading, error, fetchApi } = useApiBase();

    const gerarTrilhaPersonalizada = useCallback(async (formData: {
        objetivo: string;
        experiencia: string;
        tempoDisponivel: string;
        preferencias: string[];
    }) => {
        // Filter suggestions based on user preferences
        let filteredSugestoes = sugestoes;

        // Filter by experience level
        if (formData.experiencia === 'iniciante') {
            filteredSugestoes = filteredSugestoes.filter(s => s.nivel === 'Iniciante');
        } else if (formData.experiencia === 'intermediario') {
            filteredSugestoes = filteredSugestoes.filter(s => s.nivel === 'Intermediário');
        } else if (formData.experiencia === 'avancado') {
            filteredSugestoes = filteredSugestoes.filter(s => s.nivel === 'Avançado');
        }

        // Filter by preferences (learning types)
        if (formData.preferencias.length > 0) {
            const preferenceMap: { [key: string]: string } = {
                'Vídeos': 'video',
                'Artigos': 'artigo',
                'Cursos Online': 'curso',
                'Projetos Práticos': 'projeto'
            };

            const tiposPreferidos = formData.preferencias
                .map(pref => preferenceMap[pref])
                .filter(Boolean);

            if (tiposPreferidos.length > 0) {
                filteredSugestoes = filteredSugestoes.filter(s => tiposPreferidos.includes(s.tipo));
            }
        }

        // Select modules based on objective and limit to 3-5 modules
        let selectedModules: Sugestao[] = [];
        const maxModules = formData.tempoDisponivel === '5-10' ? 3 : formData.tempoDisponivel === '10-20' ? 4 : 5;

        if (formData.objetivo === 'frontend') {
            selectedModules = filteredSugestoes
                .filter(s => s.titulo.toLowerCase().includes('react') ||
                           s.titulo.toLowerCase().includes('javascript') ||
                           s.titulo.toLowerCase().includes('html') ||
                           s.titulo.toLowerCase().includes('css') ||
                           s.titulo.toLowerCase().includes('frontend'))
                .slice(0, maxModules);
        } else if (formData.objetivo === 'backend') {
            selectedModules = filteredSugestoes
                .filter(s => s.titulo.toLowerCase().includes('python') ||
                           s.titulo.toLowerCase().includes('django') ||
                           s.titulo.toLowerCase().includes('api') ||
                           s.titulo.toLowerCase().includes('backend') ||
                           s.titulo.toLowerCase().includes('node'))
                .slice(0, maxModules);
        } else if (formData.objetivo === 'fullstack') {
            selectedModules = filteredSugestoes
                .filter(s => s.titulo.toLowerCase().includes('full') ||
                           s.titulo.toLowerCase().includes('stack') ||
                           s.titulo.toLowerCase().includes('javascript') ||
                           s.titulo.toLowerCase().includes('react') ||
                           s.titulo.toLowerCase().includes('node'))
                .slice(0, maxModules);
        } else if (formData.objetivo === 'dados') {
            selectedModules = filteredSugestoes
                .filter(s => s.titulo.toLowerCase().includes('machine') ||
                           s.titulo.toLowerCase().includes('python') ||
                           s.titulo.toLowerCase().includes('data') ||
                           s.titulo.toLowerCase().includes('ciência'))
                .slice(0, maxModules);
        } else if (formData.objetivo === 'mobile') {
            selectedModules = filteredSugestoes
                .filter(s => s.titulo.toLowerCase().includes('react native') ||
                           s.titulo.toLowerCase().includes('mobile') ||
                           s.titulo.toLowerCase().includes('app'))
                .slice(0, maxModules);
        }

        // If not enough modules found, fill with general programming suggestions
        if (selectedModules.length < maxModules) {
            const generalModules = filteredSugestoes
                .filter(s => !selectedModules.includes(s))
                .slice(0, maxModules - selectedModules.length);
            selectedModules = [...selectedModules, ...generalModules];
        }

        // Convert to module format
        const modulos = selectedModules.map((sugestao, index) => ({
            id: index + 1,
            titulo: sugestao.titulo,
            descricao: sugestao.descricao,
            duracao: sugestao.duracao,
            videoUrl: sugestao.link
        }));

        // Prepare assessment data
        const assessmentData = {
            interesse: formData.objetivo,
            experiencia: formData.experiencia,
            disponibilidade: formData.tempoDisponivel,
            preferenciasAprendizado: formData.preferencias,
            respostaIA: `Baseado no seu perfil, recomendo focar em ${formData.objetivo} para se destacar no mercado. Selecionamos ${modulos.length} recursos personalizados para você.`,
            modulos
        };

        // Save to JSON-server
        const savedAssessment = await fetchApi('/trilhasPersonalizadas', {
            method: 'POST',
            body: JSON.stringify(assessmentData)
        });

        return savedAssessment;
    }, [fetchApi]);

    const getTrilhasPersonalizadas = useCallback(async (userEmail?: string) => {
        const query = userEmail ? `/trilhasPersonalizadas?email=${encodeURIComponent(userEmail)}` : '/trilhasPersonalizadas';
        return await fetchApi(query);
    }, [fetchApi]);

    const getTrilhaPersonalizadaById = useCallback(async (id: string) => {
        return await fetchApi(`/trilhasPersonalizadas/${id}`);
    }, [fetchApi]);

    const deleteTrilhaPersonalizada = useCallback(async (id: string) => {
        return await fetchApi(`/trilhasPersonalizadas/${id}`, {
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
