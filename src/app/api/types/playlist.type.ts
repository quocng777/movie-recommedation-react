import { UserMiniDto } from "./user.type";

export enum PlaylistAccessibility {
    'PUBLIC' = 'public',
    'PRIVATE' = 'private',
}

export type Playlist = {
    id: number,
    name: string,
    description?: string,
    accessibility: PlaylistAccessibility,
    createdAt: Date,
    updatedAt: Date,
};

export type PlaylistUser = {
    id: number;
    name: string;
    description: string;
    accessibility: PlaylistAccessibility;
    createdAt: Date;
    user: UserMiniDto;
    updatedAt: Date;
};

export type CreatePlaylistDto = {
    name: string;
    description: string;
    accessibility: PlaylistAccessibility;
};