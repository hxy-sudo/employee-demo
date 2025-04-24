import React, { useState } from 'react';
import { Skill } from '../data/mockData';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';

// 注册Chart.js组件
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface SkillsRadarProps {
    skills: Skill[];
    editMode: boolean;
    onSave: (updatedSkills: Skill[]) => void;
}

export const SkillsRadar: React.FC<SkillsRadarProps> = ({ skills, editMode, onSave }) => {
    // 用于编辑模式的状态
    const [editedSkills, setEditedSkills] = useState<Skill[]>(skills);

    // 新技能状态初始值
    const [newSkill, setNewSkill] = useState<Skill>({
        name: '',
        level: 50, // 默认值为中等水平
        category: 'technical'
    });

    // 按类别分组技能
    // TODO: 考虑将这段逻辑移动到useEffect或useMemo中以优化性能
    const technicalSkills = skills.filter(skill => skill.category === 'technical');
    const softSkills = skills.filter(skill => skill.category === 'soft');
    const languageSkills = skills.filter(skill => skill.category === 'language');

    // 技术技能雷达图数据准备
    const chartData = {
        labels: technicalSkills.map(skill => skill.name),
        datasets: [
            {
                label: '技术技能',
                data: technicalSkills.map(skill => skill.level),
                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                borderColor: 'rgba(14, 165, 233, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(14, 165, 233, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(14, 165, 233, 1)'
            }
        ]
    };

    // 软技能雷达图数据
    const softSkillsChartData = {
        labels: softSkills.map(skill => skill.name),
        datasets: [
            {
                label: '软技能',
                data: softSkills.map(skill => skill.level),
                backgroundColor: 'rgba(236, 72, 153, 0.2)',
                borderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(236, 72, 153, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(236, 72, 153, 1)'
            }
        ]
    };

    // 图表选项配置
    const chartOptions = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    };

    // 处理技能变更
    const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
        const updatedSkills = [...editedSkills];

        // 根据字段类型进行不同处理
        if (field === 'level') {
            updatedSkills[index][field] = Number(value);
        } else if (field === 'category') {
            updatedSkills[index][field] = value as 'technical' | 'soft' | 'language' | 'other';
        } else {
            updatedSkills[index][field as 'name'] = value as string;
        }

        setEditedSkills(updatedSkills);
    };

    // 添加新技能
    const handleAddSkill = () => {
        if (newSkill.name.trim() === '') return; // 名称为空时不添加

        setEditedSkills([...editedSkills, { ...newSkill }]);

        // 重置表单
        setNewSkill({
            name: '',
            level: 50,
            category: 'technical'
        });
    };

    // 移除技能
    const handleRemoveSkill = (index: number) => {
        // 浅复制确保我们不直接修改原数组
        const updatedSkills = [...editedSkills];
        updatedSkills.splice(index, 1);
        setEditedSkills(updatedSkills);
    };

    // 提交保存
    const handleSubmit = () => {
        // FIXME: 在真实场景中应该添加数据验证
        onSave(editedSkills);
    };

    // 当原始技能数据或编辑模式变更时，重置编辑状态
    React.useEffect(() => {
        setEditedSkills(skills);
        // 这里有时候会看到一个警告，可能需要深比较
    }, [skills, editMode]);

    // 编辑模式UI
    if (editMode) {
        return (
            <div className="space-y-6">
                {/* 添加新技能表单 */}
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">添加新技能</h3>
                    <div className="flex flex-wrap gap-2">
                        <input
                            type="text"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            placeholder="技能名称"
                            className="flex-1 min-w-[150px] p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        />
                        <select
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                            className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        >
                            <option value="technical">技术类</option>
                            <option value="soft">软技能</option>
                            <option value="language">语言</option>
                            <option value="other">其他</option>
                        </select>
                        <div className="flex-1 min-w-[150px] flex items-center">
                            <span className="text-xs mr-2">{newSkill.level}</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={newSkill.level}
                                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                                className="flex-1"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center"
                        >
                            <FaPlus size={14} />
                        </button>
                    </div>
                </div>

                {/* 编辑现有技能 */}
                <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="text-left p-2">技能</th>
                                <th className="text-left p-2">类别</th>
                                <th className="text-left p-2">熟练度</th>
                                <th className="p-2 w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {editedSkills.map((skill, index) => (
                                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-2">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                            className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <select
                                            value={skill.category}
                                            onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                            className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                                        >
                                            <option value="technical">技术类</option>
                                            <option value="soft">软技能</option>
                                            <option value="language">语言</option>
                                            <option value="other">其他</option>
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <span className="text-xs mr-2 w-6">{skill.level}</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={skill.level}
                                                onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                                                className="flex-1"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(index)}
                                            className="p-1 text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <FaSave size={14} /> 保存技能
                    </button>
                </div>
            </div>
        );
    }

    // 查看模式UI - 暂时简化显示所有技能图表
    // TODO: 考虑添加切换标签以更好地显示不同类别的技能
    return (
        <div className="space-y-6">
            {technicalSkills.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">技术技能</h3>
                    <div className="h-64">
                        <Radar data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}

            {softSkills.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">软技能</h3>
                    <div className="h-64">
                        <Radar data={softSkillsChartData} options={chartOptions} />
                    </div>
                </div>
            )}

            {languageSkills.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">语言技能</h3>
                    <div className="space-y-1">
                        {languageSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-sm font-medium w-24">{skill.name}</span>
                                <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                                    <div
                                        className="h-full bg-primary-500"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                    {skill.level}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 