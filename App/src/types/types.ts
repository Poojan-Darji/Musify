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

export type PlayerContextType = {
    audioRef: React.RefObject<HTMLAudioElement>;
    seekBg: React.RefObject<HTMLDivElement>;
    seekBar: React.RefObject<HTMLHRElement>;
    track?: ISong;
    setTrack: React.Dispatch<React.SetStateAction<ISong | undefined>>;
    playStatus: boolean;
    setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    time: TimeType;
    setTime: React.Dispatch<React.SetStateAction<TimeType>>;
    play: () => void;
    pause: () => void;
    playWithId: (id: string) => Promise<void>;
    previous: () => Promise<void>;
    next: () => Promise<void>;
    seekSong: (e: React.MouseEvent<HTMLDivElement>) => void;
    songsData: ISong[];
    albumsData: IAlbum[];
};

export type TimeType = {
    currentTime: {
        second: number;
        minute: number;
    };
    totalTime: {
        second: number;
        minute: number;
    };
};
