'use client';

import React from 'react';
import styles from './page.module.scss';
import TextBlock from '../TextBlock/page';

interface TextWidgetData {
    text: string;
    format?: {
        bold?: boolean;
        italic?: boolean;
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
    };
}

interface WidgetTextProps {
    data: TextWidgetData;
    onUpdate: (data: TextWidgetData) => void;
}

const WidgetText: React.FC<WidgetTextProps> = ({ data, onUpdate }) => {
    const handleTextChange = (id: string, text: string) => {
        onUpdate({
            ...data,
            text
        });
    };

    const handleFormatText = (id: string, formatType: string, value: any) => {
        onUpdate({
            ...data,
            format: {
                ...data.format,
                [formatType]: value
            }
        });
    };

    return (
        <div className={styles.widgetText}>
            <TextBlock
                id="text"
                text={data.text}
                format={data.format}
                onChange={handleTextChange}
                onKeyDown={() => {}}
                onFormatText={handleFormatText}
            />
        </div>
    );
};

export default WidgetText; 