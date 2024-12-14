export interface Event {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    isFullDay: boolean;
    tagColor: string;
    emoji: string;
    showInCalendar: boolean;
    description?: string;
    location?: string;
    isTask: boolean;
    isImportant: boolean;
    theme: string;
} 