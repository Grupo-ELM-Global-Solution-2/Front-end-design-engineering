export interface Sugestao {
    id: string;
    titulo: string;
    tipo: 'video' | 'artigo' | 'curso' | 'projeto';
    descricao: string;
    duracao: string;
    nivel: string;
    thumbnail: string;
    link: string;
}

export const tipos = [
    { value: 'todos', label: 'Todos os tipos' },
    { value: 'video', label: 'Vídeos' },
    { value: 'artigo', label: 'Artigos' },
    { value: 'curso', label: 'Cursos' },
    { value: 'projeto', label: 'Projetos' }
];

export const niveis = [
    { value: 'todos', label: 'Todos os níveis' },
    { value: 'Iniciante', label: 'Iniciante' },
    { value: 'Intermediário', label: 'Intermediário' },
    { value: 'Avançado', label: 'Avançado' }
];

export const sugestoes: Sugestao[] = [
    {
        id: '1',
        titulo: 'React do Zero ao Avançado',
        tipo: 'video',
        descricao: 'Tutorial completo de React em português do canal Programador a Bordo.',
        duracao: '4 horas',
        nivel: 'Iniciante',
        thumbnail: '🎥',
        link: 'https://www.youtube.com/watch?v=0mYq5LrQN1s'
    },
    {
        id: '2',
        titulo: 'Algoritmos e Estruturas de Dados em JavaScript',
        tipo: 'artigo',
        descricao: 'Guia completo sobre algoritmos essenciais para desenvolvedores.',
        duracao: '25 min leitura',
        nivel: 'Intermediário',
        thumbnail: '📄',
        link: 'https://www.devmedia.com.br/algoritmos-e-estruturas-de-dados-em-javascript/40739'
    },
    {
        id: '3',
        titulo: 'Python do Zero ao Avançado',
        tipo: 'curso',
        descricao: 'Curso gratuito de Python completo na plataforma Alura.',
        duracao: '40 horas',
        nivel: 'Iniciante',
        thumbnail: '🎓',
        link: 'https://www.alura.com.br/curso-online-python-3-introducao-a-nova-versao-da-linguagem'
    },
    {
        id: '4',
        titulo: 'Construindo API REST com Node.js',
        tipo: 'projeto',
        descricao: 'Tutorial prático para criar uma API REST completa com Node.js.',
        duracao: '2.5 horas',
        nivel: 'Intermediário',
        thumbnail: '⚙️',
        link: 'https://www.youtube.com/watch?v=K5QaTfE5ylk'
    },
    {
        id: '5',
        titulo: 'CSS Grid vs Flexbox - Qual usar?',
        tipo: 'video',
        descricao: 'Entenda quando usar Grid ou Flexbox com exemplos práticos.',
        duracao: '18 min',
        nivel: 'Intermediário',
        thumbnail: '🎥',
        link: 'https://www.youtube.com/watch?v=x-4z_u8LcGc'
    },
    {
        id: '6',
        titulo: 'Código Limpo: Princípios e Práticas',
        tipo: 'artigo',
        descricao: 'Resumo dos conceitos de Clean Code aplicados ao desenvolvimento.',
        duracao: '15 min leitura',
        nivel: 'Avançado',
        thumbnail: '📄',
        link: 'https://www.devmedia.com.br/clean-code-principios-e-praticas/28793'
    },
    {
        id: '7',
        titulo: 'Machine Learning com Python',
        tipo: 'curso',
        descricao: 'Curso completo de Machine Learning na Udemy em português.',
        duracao: '42 horas',
        nivel: 'Avançado',
        thumbnail: '🎓',
        link: 'https://www.udemy.com/course/machine-learning-com-python-pt/'
    },
    {
        id: '8',
        titulo: 'React Native: App Mobile Completo',
        tipo: 'projeto',
        descricao: 'Crie seu primeiro aplicativo mobile com React Native.',
        duracao: '3.5 horas',
        nivel: 'Intermediário',
        thumbnail: '📱',
        link: 'https://www.youtube.com/watch?v=1-0W3-8Y5s'
    },
    {
        id: '9',
        titulo: 'Formação Full Stack JavaScript',
        tipo: 'curso',
        descricao: 'Currículo completo para se tornar desenvolvedor full-stack.',
        duracao: '200 horas',
        nivel: 'Iniciante',
        thumbnail: '🎓',
        link: 'https://www.alura.com.br/formacao-js-fullstack'
    },
    {
        id: '10',
        titulo: 'Como Contribuir para Open Source',
        tipo: 'artigo',
        descricao: 'Guia prático para começar a contribuir com projetos open source.',
        duracao: '12 min leitura',
        nivel: 'Intermediário',
        thumbnail: '📄',
        link: 'https://www.alura.com.br/artigos/como-contribuir-com-projetos-open-source'
    },
    {
        id: '11',
        titulo: 'Criando Portfólio Responsivo',
        tipo: 'projeto',
        descricao: 'Desenvolva um portfólio pessoal moderno com HTML, CSS e JS.',
        duracao: '5 horas',
        nivel: 'Iniciante',
        thumbnail: '💼',
        link: 'https://www.youtube.com/watch?v=KErtfknVy0I'
    },
    {
        id: '12',
        titulo: 'Conceitos Avançados de JavaScript',
        tipo: 'video',
        descricao: 'Closures, prototypes, async/await explicados em português.',
        duracao: '50 min',
        nivel: 'Avançado',
        thumbnail: '🎥',
        link: 'https://www.youtube.com/watch?v=i6Oi-YtXnAU'
    }
];

export const getTipoIcon = (tipo: string) => {
    switch (tipo) {
        case 'video': return '🎥';
        case 'artigo': return '📄';
        case 'curso': return '🎓';
        case 'projeto': return '⚙️';
        default: return '📚';
    }
};

export const getTipoLabel = (tipo: string) => {
    switch (tipo) {
        case 'video': return 'Vídeo';
        case 'artigo': return 'Artigo';
        case 'curso': return 'Curso';
        case 'projeto': return 'Projeto';
        default: return tipo;
    }
};

export const filtrarSugestoes = (sugestoes: Sugestao[], filtroTipo: string, filtroNivel: string): Sugestao[] => {
    return sugestoes.filter(sugestao => {
        const tipoMatch = filtroTipo === 'todos' || sugestao.tipo === filtroTipo;
        const nivelMatch = filtroNivel === 'todos' || sugestao.nivel === filtroNivel;
        return tipoMatch && nivelMatch;
    });
};
