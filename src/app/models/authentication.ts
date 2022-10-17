export interface Authentication{
    jwt: string;
    message: string;
    token?: string;
    userName?: string;
    role?: string;
}