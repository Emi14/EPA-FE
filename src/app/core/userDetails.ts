export class User {
    id: number;
    username: string;
    password: string;
    role: string;
    daysOff: number;
    workFromHome: boolean;
    vacationRequests?: any[];
    token?: string;
}