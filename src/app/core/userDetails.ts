export class User {
    id: number;
    username: string;
    password: string;
    role: string;
    freeDays: number;
    workFromHome: boolean;
    token?: string;
}