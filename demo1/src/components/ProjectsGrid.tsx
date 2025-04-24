import React, { useState } from 'react';
import { Project } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { FaPlus, FaTrash, FaSave, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectsGridProps {
    projects: Project[];
    editMode: boolean;
    onSave: (updatedProjects: Project[]) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, editMode, onSave }) => {
    const [editedProjects, setEditedProjects] = useState<Project[]>(projects);
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [newCollaborator, setNewCollaborator] = useState({
        id: '',
        name: '',
        role: '',
        avatarUrl: ''
    });

    const defaultProject: Project = {
        id: '',
        name: '',
        description: '',
        technologies: [],
        startDate: new Date().toISOString().split('T')[0],
        collaborators: []
    };

    const [newProject, setNewProject] = useState<Project>({ ...defaultProject });
    const [newTechnology, setNewTechnology] = useState('');

    const handleProjectChange = (id: string, field: keyof Project, value: any) => {
        setEditedProjects(prev => prev.map(project =>
            project.id === id ? { ...project, [field]: value } : project
        ));
    };

    const handleAddProject = () => {
        if (newProject.name.trim() === '') return;

        const createdProject: Project = {
            ...newProject,
            id: `project-${Date.now()}`,
            technologies: [...newProject.technologies],
            collaborators: [...newProject.collaborators]
        };

        setEditedProjects([...editedProjects, createdProject]);
        setNewProject({ ...defaultProject });
    };

    const handleRemoveProject = (id: string) => {
        setEditedProjects(prev => prev.filter(project => project.id !== id));
    };

    const handleAddTechnology = (projectId: string | null) => {
        if (newTechnology.trim() === '') return;

        if (projectId) {
            // Add to existing project
            setEditedProjects(prev => prev.map(project => {
                if (project.id === projectId) {
                    return {
                        ...project,
                        technologies: [...project.technologies, newTechnology]
                    };
                }
                return project;
            }));
        } else {
            // Add to new project
            setNewProject({
                ...newProject,
                technologies: [...newProject.technologies, newTechnology]
            });
        }

        setNewTechnology('');
    };

    const handleRemoveTechnology = (projectId: string | null, index: number) => {
        if (projectId) {
            // Remove from existing project
            setEditedProjects(prev => prev.map(project => {
                if (project.id === projectId) {
                    const updatedTechnologies = [...project.technologies];
                    updatedTechnologies.splice(index, 1);
                    return { ...project, technologies: updatedTechnologies };
                }
                return project;
            }));
        } else {
            // Remove from new project
            const updatedTechnologies = [...newProject.technologies];
            updatedTechnologies.splice(index, 1);
            setNewProject({ ...newProject, technologies: updatedTechnologies });
        }
    };

    const handleAddCollaborator = (projectId: string | null) => {
        if (newCollaborator.name.trim() === '' || newCollaborator.role.trim() === '') return;

        const collaborator = {
            ...newCollaborator,
            id: `collab-${Date.now()}`
        };

        if (projectId) {
            // Add to existing project
            setEditedProjects(prev => prev.map(project => {
                if (project.id === projectId) {
                    return {
                        ...project,
                        collaborators: [...project.collaborators, collaborator]
                    };
                }
                return project;
            }));
        } else {
            // Add to new project
            setNewProject({
                ...newProject,
                collaborators: [...newProject.collaborators, collaborator]
            });
        }

        setNewCollaborator({
            id: '',
            name: '',
            role: '',
            avatarUrl: ''
        });
    };

    const handleRemoveCollaborator = (projectId: string | null, collaboratorId: string) => {
        if (projectId) {
            // Remove from existing project
            setEditedProjects(prev => prev.map(project => {
                if (project.id === projectId) {
                    return {
                        ...project,
                        collaborators: project.collaborators.filter(c => c.id !== collaboratorId)
                    };
                }
                return project;
            }));
        } else {
            // Remove from new project
            setNewProject({
                ...newProject,
                collaborators: newProject.collaborators.filter(c => c.id !== collaboratorId)
            });
        }
    };

    const handleSaveProjects = () => {
        onSave(editedProjects);
    };

    // Reset edited projects when original projects change or edit mode toggles
    React.useEffect(() => {
        setEditedProjects(projects);
    }, [projects, editMode]);

    const formatDateRange = (startDate: string, endDate?: string) => {
        const start = format(parseISO(startDate), 'MMM yyyy');
        return endDate
            ? `${start} - ${format(parseISO(endDate), 'MMM yyyy')}`
            : `${start} - 至今`;
    };

    if (editMode) {
        return (
            <div className="space-y-6">
                {/* Add new project form */}
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">添加新项目</h3>
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                placeholder="项目名称"
                                className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={newProject.startDate.split('T')[0]}
                                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                />
                                <input
                                    type="date"
                                    value={newProject.endDate?.split('T')[0] || ''}
                                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value || undefined })}
                                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                    placeholder="结束日期（如果仍在进行中请留空）"
                                />
                            </div>
                        </div>
                        <textarea
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="项目描述"
                            rows={2}
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        ></textarea>
                        <input
                            type="text"
                            value={newProject.imageUrl || ''}
                            onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                            placeholder="图片链接（可选）"
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        />
                        <input
                            type="text"
                            value={newProject.link || ''}
                            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            placeholder="项目链接（可选）"
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        />

                        {/* Technologies */}
                        <div>
                            <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">技术栈</h4>
                            <div className="flex flex-wrap gap-1 mb-2">
                                {newProject.technologies.map((tech, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600">
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTechnology(null, idx)}
                                            className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTechnology}
                                    onChange={(e) => setNewTechnology(e.target.value)}
                                    placeholder="添加技术"
                                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleAddTechnology(null)}
                                    className="p-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-xs"
                                >
                                    添加
                                </button>
                            </div>
                        </div>

                        {/* Collaborators */}
                        <div>
                            <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">团队成员</h4>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {newProject.collaborators.map((collab) => (
                                    <div key={collab.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600">
                                        {collab.name} ({collab.role})
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCollaborator(null, collab.id)}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    value={newCollaborator.name}
                                    onChange={(e) => setNewCollaborator({ ...newCollaborator, name: e.target.value })}
                                    placeholder="姓名"
                                    className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                />
                                <input
                                    type="text"
                                    value={newCollaborator.role}
                                    onChange={(e) => setNewCollaborator({ ...newCollaborator, role: e.target.value })}
                                    placeholder="角色"
                                    className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCollaborator.avatarUrl}
                                        onChange={(e) => setNewCollaborator({ ...newCollaborator, avatarUrl: e.target.value })}
                                        placeholder="头像链接"
                                        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleAddCollaborator(null)}
                                        className="p-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-xs"
                                    >
                                        添加
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddProject}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            <FaPlus size={14} /> 添加项目
                        </button>
                    </div>
                </div>

                {/* Project list */}
                <div className="space-y-4">
                    {editedProjects.map((project) => (
                        <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                                        className="w-full p-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            type="date"
                                            value={project.startDate.split('T')[0]}
                                            onChange={(e) => handleProjectChange(project.id, 'startDate', e.target.value)}
                                            className="p-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                        />
                                        <input
                                            type="date"
                                            value={project.endDate?.split('T')[0] || ''}
                                            onChange={(e) => handleProjectChange(project.id, 'endDate', e.target.value || undefined)}
                                            className="p-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setActiveProject(prev => prev === project.id ? null : project.id)}
                                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {activeProject === project.id ? '收起' : '展开'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(project.id)}
                                        className="p-1 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>

                            {activeProject === project.id && (
                                <div className="mt-3 space-y-3">
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                    ></textarea>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={project.imageUrl || ''}
                                            onChange={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)}
                                            placeholder="图片链接"
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                        />
                                        <input
                                            type="text"
                                            value={project.link || ''}
                                            onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                                            placeholder="项目链接"
                                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                        />
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">技术栈</h4>
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {project.technologies.map((tech, idx) => (
                                                <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600">
                                                    {tech}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTechnology(project.id, idx)}
                                                        className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                    >
                                                        &times;
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newTechnology}
                                                onChange={(e) => setNewTechnology(e.target.value)}
                                                placeholder="添加技术"
                                                className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleAddTechnology(project.id)}
                                                className="p-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-xs"
                                            >
                                                添加
                                            </button>
                                        </div>
                                    </div>

                                    {/* Collaborators */}
                                    <div>
                                        <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">团队成员</h4>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.collaborators.map((collab) => (
                                                <div key={collab.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600">
                                                    {collab.name} ({collab.role})
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveCollaborator(project.id, collab.id)}
                                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            <input
                                                type="text"
                                                value={newCollaborator.name}
                                                onChange={(e) => setNewCollaborator({ ...newCollaborator, name: e.target.value })}
                                                placeholder="姓名"
                                                className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                            />
                                            <input
                                                type="text"
                                                value={newCollaborator.role}
                                                onChange={(e) => setNewCollaborator({ ...newCollaborator, role: e.target.value })}
                                                placeholder="角色"
                                                className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newCollaborator.avatarUrl}
                                                    onChange={(e) => setNewCollaborator({ ...newCollaborator, avatarUrl: e.target.value })}
                                                    placeholder="头像链接"
                                                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddCollaborator(project.id)}
                                                    className="p-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-xs"
                                                >
                                                    添加
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleSaveProjects}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <FaSave size={14} /> 保存项目
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                    {project.imageUrl && (
                        <div className="h-40 overflow-hidden">
                            <img
                                src={project.imageUrl}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    )}

                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {project.name}
                            </h3>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-500 hover:text-primary-600"
                                >
                                    <FaExternalLinkAlt size={14} />
                                </a>
                            )}
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatDateRange(project.startDate, project.endDate)}
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {project.collaborators.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">团队</h4>
                                <div className="flex flex-wrap -space-x-2">
                                    {project.collaborators.map((collab) => (
                                        <div
                                            key={collab.id}
                                            className="relative group"
                                            title={`${collab.name} (${collab.role})`}
                                        >
                                            <img
                                                src={collab.avatarUrl || 'https://via.placeholder.com/40'}
                                                alt={collab.name}
                                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                                            />
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                                                {collab.name} ({collab.role})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}; 