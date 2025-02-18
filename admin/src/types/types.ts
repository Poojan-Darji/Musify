export interface IAlbum {
    _id: string;
    name: string;
    desc: string;
    image: string;
    bgColour: string;
}

export interface ISong {
    _id: string;
    name: string;
    desc: string;
    album: string;
    file: string;
    image: string;
    duration: string;
}
