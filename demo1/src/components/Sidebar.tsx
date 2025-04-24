import React, { useState } from 'react';
import { Employee } from '../data/mockData';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaEnvelope, FaPhone, FaMedal } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

interface SidebarProps {
    employee: Employee;
    editMode: boolean;
    onSave: (updatedEmployee: Employee) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ employee, editMode, onSave }) => {
    const [editedLinks, setEditedLinks] = useState({
        email: employee.email,
        phone: employee.phone || '',
        linkedin: employee.socialLinks.linkedin || '',
        github: employee.socialLinks.github || '',
        twitter: employee.socialLinks.twitter || '',
        portfolio: employee.socialLinks.portfolio || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedLinks(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedEmployee = {
            ...employee,
            email: editedLinks.email,
            phone: editedLinks.phone || undefined,
            socialLinks: {
                linkedin: editedLinks.linkedin || undefined,
                github: editedLinks.github || undefined,
                twitter: editedLinks.twitter || undefined,
                portfolio: editedLinks.portfolio || undefined,
            }
        };
        onSave(updatedEmployee);
    };

    // Reset form data when edit mode changes or employee data changes
    React.useEffect(() => {
        setEditedLinks({
            email: employee.email,
            phone: employee.phone || '',
            linkedin: employee.socialLinks.linkedin || '',
            github: employee.socialLinks.github || '',
            twitter: employee.socialLinks.twitter || '',
            portfolio: employee.socialLinks.portfolio || '',
        });
    }, [employee, editMode]);

    return (
        <div className="space-y-6">
            {/* Contact information */}
            <div className="card p-4">
                <h2 className="section-title">联系方式</h2>

                {editMode ? (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                邮箱
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={editedLinks.email}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                电话
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={editedLinks.phone}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                name="linkedin"
                                value={editedLinks.linkedin}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                GitHub
                            </label>
                            <input
                                type="url"
                                name="github"
                                value={editedLinks.github}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Twitter
                            </label>
                            <input
                                type="url"
                                name="twitter"
                                value={editedLinks.twitter}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                个人网站
                            </label>
                            <input
                                type="url"
                                name="portfolio"
                                value={editedLinks.portfolio}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            保存联系方式
                        </button>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <a href={`mailto:${employee.email}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                            <FaEnvelope className="text-gray-400" />
                            <span>{employee.email}</span>
                        </a>

                        {employee.phone && (
                            <a href={`tel:${employee.phone}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                                <FaPhone className="text-gray-400" />
                                <span>{employee.phone}</span>
                            </a>
                        )}

                        <div className="flex gap-3 mt-2">
                            {employee.socialLinks.linkedin && (
                                <a
                                    href={employee.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                            )}

                            {employee.socialLinks.github && (
                                <a
                                    href={employee.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    <FaGithub size={20} />
                                </a>
                            )}

                            {employee.socialLinks.twitter && (
                                <a
                                    href={employee.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    <FaTwitter size={20} />
                                </a>
                            )}

                            {employee.socialLinks.portfolio && (
                                <a
                                    href={employee.socialLinks.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    <FaGlobe size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Employment Info */}
            <div className="card p-4">
                <h2 className="section-title">就业信息</h2>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">入职日期</span>
                        <span className="font-medium">{format(parseISO(employee.joinDate), 'MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">部门</span>
                        <span className="font-medium">{employee.department}</span>
                    </div>
                </div>
            </div>

            {/* Badges & Achievements */}
            {employee.badges.length > 0 && (
                <div className="card p-4">
                    <h2 className="section-title">徽章与成就</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {employee.badges.map(badge => (
                            <div key={badge.id} className="text-center">
                                <div className="flex justify-center mb-2">
                                    <img
                                        src={badge.imageUrl}
                                        alt={badge.name}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                                <h3 className="text-sm font-medium">{badge.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {format(parseISO(badge.earnedDate), 'MMM yyyy')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 