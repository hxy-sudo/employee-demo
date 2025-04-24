import React, { useState, useEffect } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { SkillsRadar } from './components/SkillsRadar';
import { Timeline } from './components/Timeline';
import { ProjectsGrid } from './components/ProjectsGrid';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { mockEmployeeData } from './data/mockData';
import { FaUser, FaChartLine, FaHistory, FaLaptopCode } from 'react-icons/fa';

// 主应用组件
const App: React.FC = () => {
    // 状态管理
    const [employee, setEmployee] = useState(mockEmployeeData);
    const [darkMode, setDarkMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // 加载动画状态
    const [loading, setLoading] = useState(true);

    // 模拟数据加载
    useEffect(() => {
        // 通常我会在这里调用API，但为了演示先用setTimeout
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // 加载时间略短一些，让体验更流畅
        return () => clearTimeout(timer);
    }, []);

    // 切换暗黑模式
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    // 切换编辑模式
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // 保存编辑后的数据
    const saveChanges = (updatedData: typeof mockEmployeeData) => {
        setEmployee(updatedData);
        setEditMode(false);
        // TODO: 实际项目中需要调用API保存数据
        console.log('保存员工数据:', updatedData);
    };

    // 加载中的显示效果
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">加载中...</p>
                </div>
            </div>
        );
    }

    // 主界面渲染
    return (
        <div className={`min-h-screen pb-12 ${darkMode ? 'dark' : ''}`}>
            {/* 页面头部 */}
            <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg shadow-md">
                                <FaUser className="text-white text-xl" />
                            </div>
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">高级人才档案</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleEditMode}
                                className={`btn ${editMode ? 'btn-secondary' : 'btn-primary'} flex items-center space-x-2`}
                            >
                                <span>{editMode ? '取消编辑' : '编辑资料'}</span>
                            </button>
                            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
                        </div>
                    </div>
                </div>
            </header>

            {/* 主内容区域 */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* 侧边栏 - 放在左侧 */}
                    <div className="lg:col-span-1">
                        <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
                            <Sidebar
                                employee={employee}
                                editMode={editMode}
                                onSave={saveChanges}
                            />
                        </div>
                    </div>

                    {/* 主要内容区域 - 右侧占3列 */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* 个人资料头部 */}
                        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
                            <ProfileHeader
                                employee={employee}
                                editMode={editMode}
                                onSave={(updatedProfile) => {
                                    // 合并更新后的个人资料
                                    const updatedEmployee = { ...employee, ...updatedProfile };
                                    saveChanges(updatedEmployee);
                                }}
                            />
                        </div>

                        {/* 两列布局的卡片区域 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 技能雷达图 */}
                            <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
                                <div className="card p-6">
                                    <h2 className="section-title flex items-center">
                                        <FaChartLine className="mr-2 text-primary-500" />
                                        技能熟练度
                                    </h2>
                                    <SkillsRadar
                                        skills={employee.skills}
                                        editMode={editMode}
                                        onSave={(updatedSkills) => {
                                            const updatedEmployee = { ...employee, skills: updatedSkills };
                                            saveChanges(updatedEmployee);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 工作偏好 */}
                            <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
                                <div className="card p-6">
                                    <h2 className="section-title flex items-center">
                                        <FaUser className="mr-2 text-primary-500" />
                                        工作偏好
                                    </h2>
                                    <div className="space-y-4">
                                        {/* 使用对象映射以避免重复代码 */}
                                        {Object.entries(employee.workPreference).map(([key, value]) => {
                                            // 将键名映射为显示标签
                                            let label = "";
                                            switch (key) {
                                                case "style":
                                                    label = "工作方式";
                                                    break;
                                                case "communication":
                                                    label = "沟通方式";
                                                    break;
                                                case "environment":
                                                    label = "工作环境";
                                                    break;
                                                case "workingHours":
                                                    label = "工作时间";
                                                    break;
                                                default:
                                                    label = key;
                                            }

                                            return (
                                                <div
                                                    key={key}
                                                    className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                                                >
                                                    <span className="font-medium text-gray-600 dark:text-gray-300">{label}:</span>
                                                    <span className="font-medium text-primary-600 dark:text-primary-400">{value}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 职业时间线 */}
                        <div className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
                            <div className="card p-6">
                                <h2 className="section-title flex items-center">
                                    <FaHistory className="mr-2 text-primary-500" />
                                    职业经历
                                </h2>
                                <Timeline
                                    events={employee.timeline}
                                    editMode={editMode}
                                    onSave={(updatedTimeline) => {
                                        const updatedEmployee = {
                                            ...employee,
                                            timeline: updatedTimeline
                                        };
                                        saveChanges(updatedEmployee);
                                    }}
                                />
                            </div>
                        </div>

                        {/* 项目网格 */}
                        <div className="animate-slide-in" style={{ animationDelay: '0.6s' }}>
                            <div className="card p-6">
                                <h2 className="section-title flex items-center">
                                    <FaLaptopCode className="mr-2 text-primary-500" />
                                    项目与协作
                                </h2>
                                <ProjectsGrid
                                    projects={employee.projects}
                                    editMode={editMode}
                                    onSave={(updatedProjects) => {
                                        const updatedEmployee = {
                                            ...employee,
                                            projects: updatedProjects
                                        };
                                        saveChanges(updatedEmployee);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 页脚 */}
            <footer className="mt-12 py-6 bg-gray-100 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p>© {new Date().getFullYear()} 人才管理系统 - 为重要面试准备的高端简历展示</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App; 