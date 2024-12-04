export type UserRes = {
    id: number;
    username: string;
    email: string;
    fullname: string;
    disabled: boolean;
    activated: boolean;
    createdAt: Date;
    updatedAt: Date;
    picture: string,
}