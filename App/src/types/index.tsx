import { songsData } from "../assets/assets";

export type PlayerContextType = {
    audioRef: React.RefObject<HTMLAudioElement>;
    seekBg: React.RefObject<HTMLDivElement>;
    seekBar: React.RefObject<HTMLHRElement>;
    track: (typeof songsData)[0];
    setTrack: React.Dispatch<React.SetStateAction<(typeof songsData)[0]>>;
    playStatus: boolean;
    setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    time: TimeType;
    setTime: React.Dispatch<React.SetStateAction<TimeType>>;
    play: () => void;
    pause: () => void;
    playWithId: (id: number) => Promise<void>;
    previous: () => Promise<void>;
    next: () => Promise<void>;
    seekSong: (e: React.MouseEvent<HTMLDivElement>) => void;
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
