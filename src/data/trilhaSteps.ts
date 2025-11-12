export interface TrilhaStep {
    id: string;
    title: string;
    description: string;
    duration: string;
    resources: string[];
}

export const getTrilhaSteps = (objetivo: string): TrilhaStep[] => {
    if (objetivo === 'frontend') {
        return [
            {
                id: '1',
                title: 'HTML5 e CSS3 Avançado',
                description: 'Aprenda os conceitos avançados de HTML e CSS',
                duration: '2 semanas',
                resources: ['MDN Web Docs', 'CSS Tricks']
            },
            {
                id: '2',
                title: 'JavaScript ES6+',
                description: 'Domine JavaScript moderno',
                duration: '4 semanas',
                resources: ['JavaScript.info', 'Eloquent JavaScript']
            },
            {
                id: '3',
                title: 'React.js e Ecossistema',
                description: 'Construa aplicações com React',
                duration: '6 semanas',
                resources: ['React Docs', 'React Router']
            },
            {
                id: '4',
                title: 'TypeScript',
                description: 'Adicione tipagem ao seu JavaScript',
                duration: '3 semanas',
                resources: ['TypeScript Handbook']
            },
            {
                id: '5',
                title: 'Ferramentas de Build',
                description: 'Aprenda Vite, Webpack e outras ferramentas',
                duration: '2 semanas',
                resources: ['Vite Docs', 'Webpack Docs']
            },
            {
                id: '6',
                title: 'Testes e Qualidade',
                description: 'Escreva testes e garanta qualidade',
                duration: '3 semanas',
                resources: ['Jest Docs', 'Testing Library']
            },
            {
                id: '7',
                title: 'Deploy e Otimização',
                description: 'Implante e otimize suas aplicações',
                duration: '2 semanas',
                resources: ['Vercel Docs', 'Netlify Docs']
            }
        ];
    } else if (objetivo === 'backend') {
        return [
            {
                id: '1',
                title: 'Python Fundamentals',
                description: 'Aprenda Python do zero',
                duration: '3 semanas',
                resources: ['Python Docs', 'Automate the Boring Stuff']
            },
            {
                id: '2',
                title: 'Django Framework',
                description: 'Crie aplicações web com Django',
                duration: '5 semanas',
                resources: ['Django Docs', 'Django for Beginners']
            },
            {
                id: '3',
                title: 'APIs REST com Django REST',
                description: 'Construa APIs RESTful',
                duration: '4 semanas',
                resources: ['DRF Docs']
            },
            {
                id: '4',
                title: 'Banco de Dados PostgreSQL',
                description: 'Trabalhe com bancos de dados relacionais',
                duration: '3 semanas',
                resources: ['PostgreSQL Docs']
            },
            {
                id: '5',
                title: 'Autenticação e Segurança',
                description: 'Implemente autenticação segura',
                duration: '2 semanas',
                resources: ['Django Auth Docs']
            },
            {
                id: '6',
                title: 'Docker e Containers',
                description: 'Containerize suas aplicações',
                duration: '2 semanas',
                resources: ['Docker Docs']
            },
            {
                id: '7',
                title: 'Deploy na Nuvem',
                description: 'Implante na nuvem',
                duration: '2 semanas',
                resources: ['Heroku Docs', 'AWS Docs']
            }
        ];
    } else if (objetivo === 'fullstack') {
        return [
            {
                id: '1',
                title: 'Fundamentos Web',
                description: 'HTML, CSS e JavaScript básico',
                duration: '3 semanas',
                resources: ['MDN Web Docs', 'freeCodeCamp']
            },
            {
                id: '2',
                title: 'JavaScript Full Stack',
                description: 'JavaScript para frontend e backend',
                duration: '4 semanas',
                resources: ['Node.js Docs', 'Express Docs']
            },
            {
                id: '3',
                title: 'React.js',
                description: 'Framework frontend moderno',
                duration: '5 semanas',
                resources: ['React Docs']
            },
            {
                id: '4',
                title: 'Node.js e Express',
                description: 'Backend com Node.js',
                duration: '4 semanas',
                resources: ['Node.js Docs', 'Express Docs']
            },
            {
                id: '5',
                title: 'Banco de Dados',
                description: 'SQL e NoSQL databases',
                duration: '3 semanas',
                resources: ['SQLZoo', 'MongoDB Docs']
            },
            {
                id: '6',
                title: 'APIs e Integração',
                description: 'Conecte frontend e backend',
                duration: '3 semanas',
                resources: ['REST API Docs']
            },
            {
                id: '7',
                title: 'Autenticação',
                description: 'Implemente login e segurança',
                duration: '2 semanas',
                resources: ['JWT.io', 'Passport.js']
            },
            {
                id: '8',
                title: 'Deploy Full Stack',
                description: 'Implante aplicações completas',
                duration: '2 semanas',
                resources: ['Vercel Docs', 'Railway Docs']
            }
        ];
    } else {
        return [
            {
                id: '1',
                title: 'Lógica de Programação',
                description: 'Fundamentos da programação',
                duration: '2 semanas',
                resources: ['Khan Academy', 'Codecademy']
            },
            {
                id: '2',
                title: 'Estruturas de Dados',
                description: 'Organize e manipule dados',
                duration: '4 semanas',
                resources: ['GeeksforGeeks', 'LeetCode']
            },
            {
                id: '3',
                title: 'Algoritmos',
                description: 'Resolva problemas eficientemente',
                duration: '4 semanas',
                resources: ['CLRS Book', 'Algorithm Visualizer']
            },
            {
                id: '4',
                title: 'Banco de Dados',
                description: 'Armazene e consulte dados',
                duration: '3 semanas',
                resources: ['SQLZoo', 'Database Design']
            },
            {
                id: '5',
                title: 'Desenvolvimento Web',
                description: 'Crie aplicações web',
                duration: '5 semanas',
                resources: ['MDN Web Docs', 'freeCodeCamp']
            },
            {
                id: '6',
                title: 'Ferramentas e Versionamento',
                description: 'Git, GitHub e ferramentas de desenvolvimento',
                duration: '2 semanas',
                resources: ['Git Docs', 'GitHub Guides']
            },
            {
                id: '7',
                title: 'Projetos Práticos',
                description: 'Aplique o conhecimento em projetos reais',
                duration: '4 semanas',
                resources: ['Project Ideas', 'Portfolio Sites']
            }
        ];
    }
};
