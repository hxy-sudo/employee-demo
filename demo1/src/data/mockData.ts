export interface Skill {
    name: string;
    level: number; // 0-100
    category: 'technical' | 'soft' | 'language' | 'other';
}

export interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    date: string; // ISO date string
    type: 'education' | 'work' | 'achievement' | 'certification';
    icon?: string;
    highlights?: string[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    link?: string;
    startDate: string; // ISO date string
    endDate?: string; // ISO date string if completed, undefined if ongoing
    collaborators: Array<{
        id: string;
        name: string;
        role: string;
        avatarUrl?: string;
    }>;
}

export interface WorkPreference {
    style: string;
    communication: string;
    environment: string;
    workingHours: string;
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    avatarUrl: string;
    coverImageUrl?: string;
    email: string;
    phone?: string;
    location: string;
    bio: string;
    joinDate: string; // ISO date string
    skills: Skill[];
    timeline: TimelineEvent[];
    projects: Project[];
    workPreference: WorkPreference;
    badges: Array<{
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        earnedDate: string; // ISO date string
    }>;
    socialLinks: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        portfolio?: string;
    };
}

export const mockEmployeeData: Employee = {
    id: "emp001",
    firstName: "李",
    lastName: "明",
    position: "高级前端开发工程师",
    department: "技术研发部",
    avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    coverImageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
    email: "liming@example.com",
    phone: "+86 138 8888 8888",
    location: "上海市",
    bio: "拥有6年以上现代Web应用开发经验的前端开发工程师。热衷于用户体验、可访问性和简洁代码。同时担任初级开发人员的导师，经常为开源项目做贡献。",
    joinDate: "2019-04-15",
    skills: [
        { name: "React", level: 90, category: "technical" },
        { name: "TypeScript", level: 85, category: "technical" },
        { name: "CSS/Tailwind", level: 80, category: "technical" },
        { name: "Node.js", level: 65, category: "technical" },
        { name: "GraphQL", level: 75, category: "technical" },
        { name: "UI/UX设计", level: 70, category: "technical" },
        { name: "沟通能力", level: 85, category: "soft" },
        { name: "团队领导力", level: 80, category: "soft" },
        { name: "问题解决能力", level: 90, category: "soft" },
        { name: "英语", level: 80, category: "language" },
        { name: "普通话", level: 100, category: "language" },
    ],
    timeline: [
        {
            id: "timeline1",
            title: "高级前端开发工程师",
            description: "负责公司主要产品的前端团队领导工作。实施了新的设计系统，使开发人员生产力提高了30%。",
            date: "2019-04-15",
            type: "work",
            highlights: [
                "主导从Angular迁移到React的项目",
                "实施全面的单元测试策略",
                "指导5位初级开发人员"
            ]
        },
        {
            id: "timeline2",
            title: "前端开发工程师",
            description: "使用React和Redux构建响应式Web应用程序。",
            date: "2016-03-01",
            type: "work",
            highlights: [
                "为电商平台开发核心功能",
                "将网站性能提升40%",
                "实施A/B测试框架"
            ]
        },
        {
            id: "timeline3",
            title: "React高级认证",
            description: "完成React开发和模式的高级认证。",
            date: "2018-05-20",
            type: "certification",
        },
        {
            id: "timeline4",
            title: "计算机科学学士学位",
            description: "上海交通大学",
            date: "2012-05-15",
            type: "education",
        }
    ],
    projects: [
        {
            id: "proj1",
            name: "电商平台重设计",
            description: "使用React、TypeScript和GraphQL对公司电商平台进行全面重设计。",
            imageUrl: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3",
            technologies: ["React", "TypeScript", "GraphQL", "Tailwind CSS"],
            startDate: "2020-06-01",
            endDate: "2021-02-15",
            collaborators: [
                { id: "c1", name: "张伟", role: "UX设计师", avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg" },
                { id: "c2", name: "王芳", role: "后端开发", avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg" },
                { id: "c3", name: "刘洋", role: "产品经理", avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg" }
            ]
        },
        {
            id: "proj2",
            name: "数据分析仪表盘",
            description: "具有可自定义小组件和数据可视化功能的实时分析仪表板。",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
            technologies: ["React", "D3.js", "Node.js", "WebSockets"],
            startDate: "2021-04-10",
            collaborators: [
                { id: "c4", name: "陈静", role: "数据科学家", avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
                { id: "c5", name: "赵强", role: "后端开发", avatarUrl: "https://randomuser.me/api/portraits/men/59.jpg" }
            ]
        },
        {
            id: "proj3",
            name: "移动应用集成",
            description: "通过REST API将Web服务与iOS和Android移动应用程序集成。",
            imageUrl: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3",
            technologies: ["React Native", "RESTful APIs", "OAuth"],
            startDate: "2019-08-15",
            endDate: "2020-01-30",
            collaborators: [
                { id: "c6", name: "孙宇", role: "iOS开发", avatarUrl: "https://randomuser.me/api/portraits/men/36.jpg" },
                { id: "c7", name: "林小红", role: "Android开发", avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" }
            ]
        }
    ],
    workPreference: {
        style: "团队协作与专注独立工作相结合",
        communication: "直接和频繁沟通，但适应异步工作方式",
        environment: "远程办公，偶尔到办公室",
        workingHours: "灵活工作时间，核心工作时间10点至15点"
    },
    badges: [
        {
            id: "badge1",
            name: "创新之星",
            description: "因为开发复杂问题的创新解决方案而获奖",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1378/1378640.png",
            earnedDate: "2021-05-10"
        },
        {
            id: "badge2",
            name: "团队合作者",
            description: "因出色的协作和支持而获得认可",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/3176/3176272.png",
            earnedDate: "2020-12-15"
        },
        {
            id: "badge3",
            name: "代码质量保障",
            description: "始终提供干净、经过良好测试且可维护的代码",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png",
            earnedDate: "2022-01-20"
        }
    ],
    socialLinks: {
        linkedin: "https://linkedin.com/in/liming",
        github: "https://github.com/liming",
        twitter: "https://twitter.com/liming",
        portfolio: "https://liming.dev"
    }
}; 