'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import SidebarFull from '../components/SidebarFull/page';
import TaskDashboard from '../components/TaskDashboard/page';

interface TaskPage {
    id: string;
    title: string;
    isEditing?: boolean;
}

export default function Tasks() {
    const [pages, setPages] = useState<TaskPage[]>([]);
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

    const handleAddPage = () => {
        const newPage: TaskPage = {
            id: Date.now().toString(),
            title: 'Новая страница',
            isEditing: true
        };
        setPages([...pages, newPage]);
        setSelectedPageId(newPage.id);
    };

    const handlePageTitleChange = (id: string, newTitle: string) => {
        setPages(pages.map(page => 
            page.id === id 
                ? { ...page, title: newTitle } 
                : page
        ));
    };

    const handlePageTitleSubmit = (id: string) => {
        setPages(pages.map(page => 
            page.id === id 
                ? { ...page, isEditing: false } 
                : page
        ));
    };

    const handlePageSelect = (id: string) => {
        setSelectedPageId(id);
    };

    const handleDeletePage = (id: string) => {
        setPages(pages.filter(page => page.id !== id));
        if (selectedPageId === id) {
            setSelectedPageId(null);
        }
    };

    return (
        <>
            <SidebarFull />
            <div className={styles.tasksContainer}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h2>Страницы задач</h2>
                        <button 
                            className={styles.addPageButton}
                            onClick={handleAddPage}
                        >
                            +
                        </button>
                    </div>
                    <div className={styles.pagesList}>
                        {pages.map(page => (
                            <div 
                                key={page.id} 
                                className={`${styles.pageItem} ${selectedPageId === page.id ? styles.selected : ''}`}
                                onClick={() => handlePageSelect(page.id)}
                            >
                                {page.isEditing ? (
                                    <input
                                        type="text"
                                        value={page.title}
                                        onChange={(e) => handlePageTitleChange(page.id, e.target.value)}
                                        onBlur={() => handlePageTitleSubmit(page.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handlePageTitleSubmit(page.id);
                                            }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        <span 
                                            onDoubleClick={(e) => {
                                                e.stopPropagation();
                                                setPages(pages.map(p => 
                                                    p.id === page.id 
                                                        ? { ...p, isEditing: true } 
                                                        : p
                                                ));
                                            }}
                                        >
                                            {page.title}
                                        </span>
                                        <button
                                            className={styles.deletePageButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeletePage(page.id);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.content}>
                    {selectedPageId ? (
                        <div key={selectedPageId}>
                            <TaskDashboard />
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Выберите страницу или создайте новую</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}