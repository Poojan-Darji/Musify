import { Request } from "express";

export interface SongRequestBody {
    name: string;
    desc: string;
    album: string;
    image: string;
    file: string;
    duration: string;
}

export interface CustomSongRequest extends Request {
    files?: {
        audio?: Express.Multer.File[];
        image?: Express.Multer.File[];
    };
    body: SongRequestBody;
}

export interface AlbumRequestBody {
    name: string;
    desc: string;
    bgColour: string;
}

export interface CustomAlbumRequest extends Request {
    file?: Express.Multer.File;
    body: AlbumRequestBody;
}
