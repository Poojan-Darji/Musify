import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ISong } from "../types/types";

const url = import.meta.env.VITE_BACKEND_URL;

const ListSong = () => {
    const [data, setData] = useState<ISong[]>([]);

    const fetchSongs = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            console.log(response.data);
            if (!response.data.success) throw new Error("something went wrong");
            setData(response.data.songs);
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("An unknown error occurred");
        }
    };

    const removeSong = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/api/song/remove/${id}`);
            if (!response.data.success) throw new Error("something went wrong");
            toast.success(response.data.message);
            await fetchSongs();
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("An unknown error occurred");
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div>
            <p>All songs list</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {data.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
                        >
                            <img className="w-12" src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <p
                                className="cursor-pointer"
                                onClick={() => removeSong(item._id)}
                            >
                                X
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListSong;
