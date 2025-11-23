import { useCallback } from 'react';
import { useApiBase } from './useApiBase';

interface ProgressoData {
    idProgresso: number;
    idUser: number;
    idModulo: number;
    status: number;
}

// Hook específico para progresso
export function useProgresso() {
    const { loading, error, fetchApi } = useApiBase();

    // Busca o progresso de um usuário
    const getProgress = useCallback(async (idUser: number) => {
        const allProgress = await fetchApi('/progresso');
        if (Array.isArray(allProgress)) {
            console.log('📋 Total de progressos encontrados no banco:', allProgress.length);

            if (!idUser) {
                console.error('⚠️ ID de usuário inválido:', idUser);
                return [];
            }
            // Filter by user ID
            const filtered = allProgress.filter((p: ProgressoData) => p.idUser === idUser);

            console.log(`🔍 Filtrando por User ID ${idUser}: encontrou ${filtered.length} registros`);
            if (filtered.length > 0) {
                console.log('Exemplo de registro encontrado:', filtered[0]);
            }

            return filtered;
        }
        return [];
    }, [fetchApi]);

    // Atualiza o progresso de um módulo
    const updateProgress = useCallback(async (progressData: {
        idUser: number;
        idModulo: number;
        status: number;
    }) => {
        const userIdNum = progressData.idUser;
        if (!userIdNum) {
            console.error('⚠️ ID de usuário inválido:', progressData.idUser);
            return null;
        }

        const payload = {
            idUser: userIdNum,
            idModulo: progressData.idModulo,
            status: progressData.status
        };

        return await fetchApi('/progresso', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }, [fetchApi]);

    // Cria ou atualiza o progresso (upsert)
    const upsertProgress = useCallback(async (progressData: {
        idProgresso?: number;
        idUser: number;
        idModulo: number;
        status: number;
    }) => {
        if (!progressData.idUser) {
            console.error('⚠️ ID de usuário inválido:', progressData.idUser);
            return null;
        }

        const payload = {
            idUser: progressData.idUser,
            idModulo: progressData.idModulo,
            status: progressData.status
        };

        let result;

        // Se tem idProgresso, faz UPDATE (PUT)
        if (progressData.idProgresso) {
            console.log('🔄 Atualizando progresso existente:', progressData.idProgresso);
            result = await fetchApi(`/progresso/${progressData.idProgresso}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
        } else {
            // Se não tem idProgresso, primeiro verifica se já existe um registro
            console.log('🔍 Verificando se já existe progresso para User:', progressData.idUser, 'Módulo:', progressData.idModulo);

            const allProgress = await fetchApi('/progresso');
            const existingProgress = Array.isArray(allProgress)
                ? allProgress.find((p: ProgressoData) =>
                    p.idUser === progressData.idUser && p.idModulo === progressData.idModulo
                )
                : null;

            if (existingProgress) {
                // Já existe - faz UPDATE
                console.log('✏️ Registro já existe (ID:', existingProgress.idProgresso, ') - UPDATE');
                result = await fetchApi(`/progresso/${existingProgress.idProgresso}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
            } else {
                // Não existe - faz INSERT
                console.log('Criando novo progresso para módulo:', progressData.idModulo);
                result = await fetchApi('/progresso', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            }
        }

        if (result) {
            console.log('✅ Operação concluída. Resposta do backend:', result);
            if (!result.idProgresso) {
                console.warn('⚠️ Backend retornou objeto sem idProgresso:', result);
            }
        }

        return result;
    }, [fetchApi]);

    // Deleta um progresso
    const deleteProgress = useCallback(async (idProgresso: number) => {
        return await fetchApi(`/progresso/${idProgresso}`, {
            method: 'DELETE'
        });
    }, [fetchApi]);

    return {
        loading,
        error,
        getProgress,
        updateProgress,
        upsertProgress,
        deleteProgress
    };
}
