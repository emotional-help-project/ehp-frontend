export interface History {
    testTitle: string;
    testTypeTitle: string;
    dateTime: string;
    result: number;
    adviceDescription: string;
    links: {
        id: number;
        title: string;
        link: string;
    }[];
    show?: boolean;    
}