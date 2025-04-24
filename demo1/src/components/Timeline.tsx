import React, { useState, useEffect, useMemo } from 'react';
import { TimelineEvent } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { FaGraduationCap, FaBriefcase, FaTrophy, FaCertificate, FaPlus, FaTrash, FaSave, FaEdit } from 'react-icons/fa';
import { Spinner } from './Spinner';
import { XIcon } from 'lucide-react';

// FIXME: 以后可能需要添加删除确认功能
// TODO(liming): 重构这个组件，分离视图模式和编辑模式为单独的组件

// 定义事件类型
type EventType = 'education' | 'work' | 'achievement' | 'certification';

interface TimelineProps {
    events: TimelineEvent[];
    editMode: boolean;
    onSave: (updatedEvents: TimelineEvent[]) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ events, editMode, onSave }) => {
    const [editedEvents, setEditedEvents] = useState<TimelineEvent[]>(events);
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
    // 这里初始化新事件对象 - 使用当前日期的简化方式
    const [newEvent, setNewEvent] = useState<TimelineEvent>({
        id: '',
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0], // 简单处理，可能在某些浏览器有问题
        type: 'work',
        highlights: []
    });
    const [editingHighlight, setEditingHighlight] = useState<string>('');
    // 这个状态用来处理保存状态 - 暂时未使用
    const [isSaving, /*setIsSaving*/] = useState<boolean>(false);
    const [editModeState, setEditMode] = useState<boolean>(editMode);

    // 按日期排序事件（最新的排在前面）- 使用useMemo优化性能
    const sortedEvents = useMemo(() => {
        return [...(editMode ? editedEvents : events)].sort((a, b) => {
            // IE不支持这种日期处理方式，但我们不关心IE了 :)
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [editMode, editedEvents, events]);

    /**
     * 根据事件类型获取对应的图标
     * @param {TimelineEvent['type']} type - 事件类型 
     */
    const getIcon = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'education':
                return <FaGraduationCap className="text-blue-500" />;
            case 'work':
                return <FaBriefcase className="text-green-500" />;
            case 'achievement':
                return <FaTrophy className="text-yellow-500" />;
            case 'certification':
                return <FaCertificate className="text-purple-500" />;
            default:
                return null;
        }
    };

    /**
     * 格式化日期显示
     * @param {string} dateString - ISO格式的日期字符串
     * @returns {string} 格式化后的日期
     */
    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'yyyy年MM月dd日');
        } catch (error) {
            console.error('日期格式化错误:', error);
            return dateString; // 返回原始字符串作为后备
        }
    };

    /**
     * 根据事件类型获取对应的CSS类名
     * @param {TimelineEvent['type']} type - 事件类型
     * @returns {string} 对应的CSS类名
     */
    const getEventTypeClass = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'education':
                return 'bg-blue-100 text-blue-800';
            case 'work':
                return 'bg-green-100 text-green-800';
            case 'achievement':
                return 'bg-yellow-100 text-yellow-800';
            case 'certification':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    /**
     * 获取事件类型的显示标签
     * @param {TimelineEvent['type']} type - 事件类型
     * @returns {string} 显示用的标签文本
     */
    const getEventTypeLabel = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'education':
                return '教育';
            case 'work':
                return '工作';
            case 'achievement':
                return '成就';
            case 'certification':
                return '认证';
            default:
                return '其他';
        }
    };

    const handleEventChange = (id: string, field: keyof TimelineEvent, value: string) => {
        setEditedEvents(prev => prev.map(event =>
            event.id === id ? { ...event, [field]: value } : event
        ));
    };

    const handleToggleExpand = (id: string) => {
        setExpandedEvent(prev => prev === id ? null : id);
    };

    const handleAddEvent = () => {
        // 简单验证 - 之后可能改为更全面的表单验证
        if (newEvent.title.trim() === '') return;

        // 创建新事件对象 - 使用时间戳作为临时ID (不是UUID但够用了)
        const createdEvent: TimelineEvent = {
            ...newEvent,
            id: `event-${Date.now()}`,
            highlights: newEvent.highlights || []
        };

        setEditedEvents([...editedEvents, createdEvent]);
        // 重置表单
        setNewEvent({
            id: '',
            title: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            type: 'work',
            highlights: []
        });
    };

    const handleRemoveEvent = (id: string) => {
        // 直接删除 - 未来可能添加确认对话框
        setEditedEvents(prev => prev.filter(event => event.id !== id));
    };

    /* 处理亮点相关的功能 */
    // HACK: 这个函数有点长，后面应该拆分一下
    const handleAddHighlight = (eventId: string) => {
        if (editingHighlight.trim() === '') return; // 空值检查

        // 先尝试查找此事件
        const eventToUpdate = editedEvents.find(e => e.id === eventId);

        if (!eventToUpdate) {
            console.error('找不到要添加亮点的事件！'); // 中文错误信息
            return;
        }

        // 克隆一下防止直接修改状态
        const updatedEvent = {
            ...eventToUpdate,
            highlights: [...(eventToUpdate.highlights || []), editingHighlight]
        };

        // 更新状态 (有点啰嗦，但这样更安全)
        setEditedEvents(prev =>
            prev.map(event => event.id === eventId ? updatedEvent : event)
        );

        // 清空输入
        setEditingHighlight('');
    };

    // TODO: 添加编辑亮点的功能，而不只是添加和删除
    const handleRemoveHighlight = (eventId: string, highlightIndex: number) => {
        // 找到对应的事件
        const targetEvent = editedEvents.find(e => e.id === eventId);
        if (!targetEvent || !targetEvent.highlights) {
            return; // 防御性编程
        }

        // 复制亮点数组并移除指定项
        const updatedHighlights = [...targetEvent.highlights];
        updatedHighlights.splice(highlightIndex, 1);

        // 使用map更新状态 - 这种方式虽然啰嗦但可读性好
        setEditedEvents(
            editedEvents.map(event =>
                event.id === eventId
                    ? { ...event, highlights: updatedHighlights }
                    : event
            )
        );
    };

    // 保存时间线变更
    const handleSave = () => {
        // Chrome需要这个超时，Firefox不需要，奇怪的浏览器兼容性问题
        // FIXME: 找个更好的方法解决这个问题
        setTimeout(() => {
            onSave(editedEvents);
            // 暂时注释掉保存中状态的处理
            // setIsSaving(true);
            // setTimeout(() => setIsSaving(false), 1000);
        }, 0);
    };

    // Reset edited events when original events change or edit mode toggles
    React.useEffect(() => {
        setEditedEvents(events);
    }, [events, editMode]);

    if (editMode) {
        return (
            <div className="timeline-container my-6">
                {/* 顶部操作区域 */}
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">时间线</h3>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => {
                                // 取消所有更改
                                setEditedEvents([...(events || [])]);
                                setEditMode(false);
                            }}
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 btn btn-primary"
                        >
                            {isSaving ? '保存中...' : '保存更改'}
                            {isSaving && <Spinner size="sm" />}
                        </button>
                    </div>
                </div>

                {/* 编辑模式下显示添加新事件表单 */}
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-md font-medium mb-3">添加新事件</h4>
                    {/* TODO: 重构为单独的表单组件 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">
                                日期 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                类型 <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={newEvent.type}
                                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as EventType })}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="" disabled>选择事件类型</option>
                                <option value="promotion">晋升</option>
                                <option value="role-change">角色变更</option>
                                <option value="project">项目</option>
                                <option value="award">奖励</option>
                                <option value="certification">认证</option>
                                <option value="other">其他</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">
                                标题 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                className="input input-bordered w-full"
                                placeholder="事件标题"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">描述</label>
                            <textarea
                                value={newEvent.description || ''}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                className="textarea textarea-bordered w-full"
                                placeholder="事件的详细描述..."
                                rows={3}
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="button"
                                onClick={handleAddEvent}
                                className="btn btn-primary"
                                disabled={!newEvent.title || !newEvent.date || !newEvent.type}
                            >
                                添加事件
                            </button>
                        </div>
                    </div>
                </div>

                {/* 事件列表渲染 - 使用备忘的排序函数 */}
                <div className="timeline-events space-y-6">
                    {sortedEvents.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            {/* 空状态提示 */}
                            <p>暂无时间线事件</p>
                            {editMode && <p className="text-sm mt-2">使用上方表单添加第一个事件</p>}
                        </div>
                    )}

                    {/* FIXME: key应该使用更稳定的ID而不是索引 */}
                    {sortedEvents.map((event, index) => (
                        <div key={event.id || index} className="timeline-event p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`event-icon p-2 rounded-full ${getEventTypeClass(event.type)}`}>
                                        {getIcon(event.type)}
                                    </span>
                                    <div>
                                        <h4 className="font-medium">{event.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(event.date)} • {getEventTypeLabel(event.type)}
                                        </p>
                                    </div>
                                </div>

                                {/* 编辑模式下显示删除按钮 */}
                                {editMode && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEvent(event.id)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="删除事件"
                                    >
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* 事件详情 */}
                            {event.description && (
                                <p className="mb-3 text-gray-700">{event.description}</p>
                            )}

                            {/* 重点列表 */}
                            {(event.highlights && event.highlights.length > 0) && (
                                <div className="mt-3">
                                    <h5 className="text-sm font-medium mb-2">重点</h5>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {event.highlights.map((highlight, idx) => (
                                            <li key={idx} className="text-sm flex justify-between items-center group">
                                                <span>{highlight}</span>
                                                {editMode && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveHighlight(event.id, idx)}
                                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <XIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 编辑模式下显示添加重点表单 */}
                            {editMode && (
                                <div className="mt-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input input-sm input-bordered flex-grow"
                                            placeholder="添加新的重点..."
                                            value={
                                                /* 防止警告：使用受控组件 */
                                                editingHighlight
                                            }
                                            onChange={(e) => setEditingHighlight(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddHighlight(event.id);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleAddHighlight(event.id)}
                                        >
                                            添加
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // View mode
    return (
        <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:left-[9px] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
            {sortedEvents.map((event, index) => (
                <div key={event.id} className="relative flex gap-4">
                    <div className="absolute -left-6 mt-1 h-5 w-5 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        {getIcon(event.type)}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {event.title}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {format(parseISO(event.date), 'MMM yyyy')}
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {event.description}
                        </p>

                        {event.highlights && event.highlights.length > 0 && (
                            <ul className="mt-3 space-y-1 text-sm">
                                {event.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-baseline gap-2">
                                        <span className="text-gray-400 dark:text-gray-500">•</span>
                                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline; 