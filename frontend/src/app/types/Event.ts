export interface Event {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    date: string;
    tagColor: string;
    emoji?: string;
    showInCalendar: boolean;
    description?: string;
    location?: string;
    isTask?: boolean;
    isImportant?: boolean;
} 