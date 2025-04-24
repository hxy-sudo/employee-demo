import React, { useState } from 'react';
import { Employee } from '../data/mockData';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

// 定义组件props接口
interface ProfileHeaderProps {
    employee: Employee;
    editMode: boolean;
    onSave: (updatedProfile: Partial<Employee>) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ employee, editMode, onSave }) => {
    // 表单状态 - 用于编辑模式下收集用户输入
    const [formData, setFormData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        position: employee.position,
        department: employee.department,
        bio: employee.bio,
        location: employee.location,
        avatarUrl: employee.avatarUrl,
        coverImageUrl: employee.coverImageUrl || ''  // 确保有默认值
    });

    // 处理表单字段变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 表单提交处理
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 阻止默认提交行为
        onSave(formData);
    };

    // 当编辑模式切换或员工数据变化时重置表单数据
    // FIXME: 这里可能需要考虑深度比较，避免不必要的状态更新
    React.useEffect(() => {
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            position: employee.position,
            department: employee.department,
            bio: employee.bio,
            location: employee.location,
            avatarUrl: employee.avatarUrl,
            coverImageUrl: employee.coverImageUrl || ''
        });
    }, [employee, editMode]);

    return (
        <div className="card overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md profile-card">
            {/* 封面图片区域 */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700 profile-cover">
                {employee.coverImageUrl && (
                    <img
                        src={employee.coverImageUrl}
                        alt="封面"
                        className="w-full h-full object-cover"
                    />
                )}
                {/* 编辑模式下的封面图片URL输入 */}
                {editMode && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <input
                            type="text"
                            name="coverImageUrl"
                            value={formData.coverImageUrl}
                            onChange={handleChange}
                            placeholder="封面图片URL"
                            className="w-4/5 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                )}
            </div>

            {/* 主内容区域 */}
            <div className="relative px-6 pt-16 pb-6">
                {/* 头像区域 - 固定在负边距位置 */}
                <div className="absolute -top-16 left-6">
                    <div className="relative profile-avatar">
                        <img
                            src={employee.avatarUrl}
                            alt={`${employee.firstName} ${employee.lastName}`}
                            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                        />
                        {/* 编辑模式下的头像URL输入 */}
                        {editMode && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                <input
                                    type="text"
                                    name="avatarUrl"
                                    value={formData.avatarUrl}
                                    onChange={handleChange}
                                    placeholder="头像URL"
                                    className="w-4/5 p-1 text-xs rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 有条件地渲染编辑表单或显示视图 */}
                {editMode ? (
                    // 编辑表单
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 姓名字段 - 两列布局 */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    名字
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    姓氏
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>

                        {/* 职位和部门字段 - 两列布局 */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    职位
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    部门
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>

                        {/* 地点字段 - 独占一行 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                地点
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {/* 简介文本域 - 可多行输入 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                简介
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {/* 提交按钮 - 右对齐 */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center gap-2 btn btn-primary"
                            >
                                <FaSave /> 保存资料
                            </button>
                        </div>
                    </form>
                ) : (
                    // 显示视图 - 只读模式
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {employee.firstName} {employee.lastName}
                        </h1>
                        <div className="mt-1 text-gray-600 dark:text-gray-400 flex flex-wrap items-center gap-2">
                            <span className="font-medium text-primary-600 dark:text-primary-400">{employee.position}</span>
                            <span>•</span>
                            <span>{employee.department}</span>
                            <span>•</span>
                            <span>{employee.location}</span>
                        </div>
                        <div className="mt-4 text-gray-700 dark:text-gray-300">
                            {employee.bio}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
