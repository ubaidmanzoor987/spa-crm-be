export interface JwtPayload {
    email: string;
    role: string;
    iat?: Date;
}
