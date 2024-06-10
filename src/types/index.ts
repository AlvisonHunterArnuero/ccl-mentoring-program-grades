export interface Data {
    id: string;
    name: string;
    email: string;
    phone: string;
    profiles: {
        github: string;
        codepen: string;
        codewars: string;
    };
    grades: {
        w0102: number;
        w0304: number;
        week0506: number;
        week0708: number;
        week0910: number;
        week1112: number;
    };
    certificates: {
        english: string;
        cyberSecurity: string;
        scrum: string;
    };
    batch: number;
    stack: string;
}


export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}


export type customTagBgColorProps = {
    english?: string;
    scrum?: string;
    cyberSecurity?: string
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
