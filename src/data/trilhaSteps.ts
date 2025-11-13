export interface TrilhaStep {
    id: string;
    titulo: string;
    descricao: string;
    duracao: string;
    videoUrl?: string;
    resources?: string[];
}

export const getTrilhaSteps = (objetivo: string): TrilhaStep[] => {
    if (objetivo === 'frontend') {
        return [
            {
                id: '1',
                titulo: 'HTML5 e CSS3 Avançado',
                descricao: 'Aprenda os conceitos avançados de HTML e CSS',
                duracao: '2 semanas',
                resources: ['MDN Web Docs', 'CSS Tricks']
            },
            {
                id: '2',
                titulo: 'JavaScript ES6+',
                descricao: 'Domine JavaScript moderno',
                duracao: '4 semanas',
                resources: ['JavaScript.info', 'Eloquent JavaScript']
            },
            {
                id: '3',
                titulo: 'React.js e Ecossistema',
                descricao: 'Construa aplicações com React',
                duracao: '6 semanas',
                resources: ['React Docs', 'React Router']
            },
            {
                id: '4',
                titulo: 'TypeScript',
                descricao: 'Adicione tipagem ao seu JavaScript',
                duracao: '3 semanas',
                resources: ['TypeScript Handbook']
            },
            {
                id: '5',
                titulo: 'Ferramentas de Build',
                descricao: 'Aprenda Vite, Webpack e outras ferramentas',
                duracao: '2 semanas',
                resources: ['Vite Docs', 'Webpack Docs']
            },
            {
                id: '6',
                titulo: 'Testes e Qualidade',
                descricao: 'Escreva testes e garanta qualidade',
                duracao: '3 semanas',
                resources: ['Jest Docs', 'Testing Library']
            },
            {
                id: '7',
                titulo: 'Deploy e Otimização',
                descricao: 'Implante e otimize suas aplicações',
                duracao: '2 semanas',
                resources: ['Vercel Docs', 'Netlify Docs']
            }
        ];
    } else if (objetivo === 'backend') {
        return [
            {
                id: '1',
                titulo: 'Python Fundamentals',
                descricao: 'Aprenda Python do zero',
                duracao: '3 semanas',
                resources: ['Python Docs', 'Automate the Boring Stuff']
            },
            {
                id: '2',
                titulo: 'Django Framework',
                descricao: 'Crie aplicações web com Django',
                duracao: '5 semanas',
                resources: ['Django Docs', 'Django for Beginners']
            },
            {
                id: '3',
                titulo: 'APIs REST com Django REST',
                descricao: 'Construa APIs RESTful',
                duracao: '4 semanas',
                resources: ['DRF Docs']
            },
            {
                id: '4',
                titulo: 'Banco de Dados PostgreSQL',
                descricao: 'Trabalhe com bancos de dados relacionais',
                duracao: '3 semanas',
                resources: ['PostgreSQL Docs']
            },
            {
                id: '5',
                titulo: 'Autenticação e Segurança',
                descricao: 'Implemente autenticação segura',
                duracao: '2 semanas',
                resources: ['Django Auth Docs']
            },
            {
                id: '6',
                titulo: 'Docker e Containers',
                descricao: 'Containerize suas aplicações',
                duracao: '2 semanas',
                resources: ['Docker Docs']
            },
            {
                id: '7',
                titulo: 'Deploy na Nuvem',
                descricao: 'Implante na nuvem',
                duracao: '2 semanas',
                resources: ['Heroku Docs', 'AWS Docs']
            }
        ];
    } else if (objetivo === 'fullstack') {
        return [
            {
                id: '1',
                titulo: 'Fundamentos Web',
                descricao: 'HTML, CSS e JavaScript básico',
                duracao: '3 semanas',
                resources: ['MDN Web Docs', 'freeCodeCamp']
            },
            {
                id: '2',
                titulo: 'JavaScript Full Stack',
                descricao: 'JavaScript para frontend e backend',
                duracao: '4 semanas',
                resources: ['Node.js Docs', 'Express Docs']
            },
            {
                id: '3',
                titulo: 'React.js',
                descricao: 'Framework frontend moderno',
                duracao: '5 semanas',
                resources: ['React Docs']
            },
            {
                id: '4',
                titulo: 'Node.js e Express',
                descricao: 'Backend com Node.js',
                duracao: '4 semanas',
                resources: ['Node.js Docs', 'Express Docs']
            },
            {
                id: '5',
                titulo: 'Banco de Dados',
                descricao: 'SQL e NoSQL databases',
                duracao: '3 semanas',
                resources: ['SQLZoo', 'MongoDB Docs']
            },
            {
                id: '6',
                titulo: 'APIs e Integração',
                descricao: 'Conecte frontend e backend',
                duracao: '3 semanas',
                resources: ['REST API Docs']
            },
            {
                id: '7',
                titulo: 'Autenticação',
                descricao: 'Implemente login e segurança',
                duracao: '2 semanas',
                resources: ['JWT.io', 'Passport.js']
            },
            {
                id: '8',
                titulo: 'Deploy Full Stack',
                descricao: 'Implante aplicações completas',
                duracao: '2 semanas',
                resources: ['Vercel Docs', 'Railway Docs']
            }
        ];
    } else {
        return [
            {
                id: '1',
                titulo: 'Lógica de Programação',
                descricao: 'Fundamentos da programação',
                duracao: '2 semanas',
                resources: ['Khan Academy', 'Codecademy']
            },
            {
                id: '2',
                titulo: 'Estruturas de Dados',
                descricao: 'Organize e manipule dados',
                duracao: '4 semanas',
                resources: ['GeeksforGeeks', 'LeetCode']
            },
            {
                id: '3',
                titulo: 'Algoritmos',
                descricao: 'Resolva problemas eficientemente',
                duracao: '4 semanas',
                resources: ['CLRS Book', 'Algorithm Visualizer']
            },
            {
                id: '4',
                titulo: 'Banco de Dados',
                descricao: 'Armazene e consulte dados',
                duracao: '3 semanas',
                resources: ['SQLZoo', 'Database Design']
            },
            {
                id: '5',
                titulo: 'Desenvolvimento Web',
                descricao: 'Crie aplicações web',
                duracao: '5 semanas',
                resources: ['MDN Web Docs', 'freeCodeCamp']
            },
            {
                id: '6',
                titulo: 'Ferramentas e Versionamento',
                descricao: 'Git, GitHub e ferramentas de desenvolvimento',
                duracao: '2 semanas',
                resources: ['Git Docs', 'GitHub Guides']
            },
            {
                id: '7',
                titulo: 'Projetos Práticos',
                descricao: 'Aplique o conhecimento em projetos reais',
                duracao: '4 semanas',
                resources: ['Project Ideas', 'Portfolio Sites']
            }
        ];
    }
};
