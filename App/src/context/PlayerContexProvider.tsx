import { useEffect, useRef, useState } from "react";
import { IAlbum, ISong, TimeType } from "../types/types";
import { PlayerContext } from "./PlayerContext";
import axios from "axios";

const PlayerContextProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const audioRef = useRef<HTMLAudioElement>(null!);
    const seekBg = useRef<HTMLDivElement>(null!);
    const seekBar = useRef<HTMLHRElement>(null!);

    const url = import.meta.env.VITE_BACKEND_URL;

    const [songsData, setSongsData] = useState<ISong[]>([]);
    const [albumsData, setAlbumsData] = useState<IAlbum[]>([]);

    const [track, setTrack] = useState<ISong>();
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState<TimeType>({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            if (!response.data.success) throw new Error("something went wrong");
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
        } catch (error) {
            console.log("An unknown error occured");
        }
    };

    const getAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (!response.data.success) throw new Error("something went wrong");
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.log("An unknown error occured");
        }
    };

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playWithId = async (id: string) => {
        await songsData.map((item) => {
            if (item._id === id) {
                setTrack(item);
            }
        });

        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        songsData.map(async (item, idx) => {
            if (track?._id === item._id && idx > 0) {
                await setTrack(songsData[idx - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    };

    const next = async () => {
        songsData.map(async (item, idx) => {
            if (track?._id === item._id && idx < songsData.length) {
                await setTrack(songsData[idx + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    };

    const seekSong = (e: React.MouseEvent<HTMLDivElement>) => {
        audioRef.current.currentTime =
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
            audioRef.current.duration;
    };

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width =
                    Math.floor(
                        (audioRef.current.currentTime /
                            audioRef.current.duration) *
                            100
                    ) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }, 1000);
    }, [audioRef]);

    useEffect(() => {
        getSongsData();
        getAlbumData();
    }, []);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
