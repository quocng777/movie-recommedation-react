export type UserRes = {
    id: number;
    username: string;
    email: string;
    fullName: string;
    disabled: boolean;
    activated: boolean;
    createdAt: Date;
    updatedAt: Date;
}