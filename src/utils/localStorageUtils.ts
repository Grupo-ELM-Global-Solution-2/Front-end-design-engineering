/*Utilitários para acesso ao localStorage do usuário*/

export const getUserId = (): number | null => {
    const idUserStr = localStorage.getItem('idUser');
    if (!idUserStr) return null;
    return parseInt(idUserStr, 10);
};

export const getUserName = (): string | null => {
    return localStorage.getItem('userName');
};

export const getUserEmail = (): string | null => {
    return localStorage.getItem('userEmail');
};

export const isUserLoggedIn = (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
};
