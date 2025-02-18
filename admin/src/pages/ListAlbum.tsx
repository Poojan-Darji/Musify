import { useEffect, useState } from "react";
import { IAlbum } from "../types/types";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const ListAlbum = () => {
    const [data, setData] = useState<IAlbum[]>([]);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (!response.data.success) throw new Error("something went wrong");
            setData(response.data.albums);
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("An unknown error occurred");
        }
    };

    const removeAlbum = async (id: string) => {
        try {
            const response = await axios.delete(
                `${url}/api/album/remove/${id}`
            );
            if (!response.data.success) throw new Error("something went wrong");
            toast.success(response.data.message);
            await fetchAlbums();
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("An unknown error occurred");
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    return (
        <div>
            <p>All Albums List</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 ">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Description</p>
                    <p>Album Colour</p>
                    <p>Action</p>
                </div>
                {data.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className="grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 "
                        >
                            <img className="w-12" src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <p>{item.bgColour}</p>
                            <p
                                onClick={() => removeAlbum(item._id)}
                                className="cursor-pointer"
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

export default ListAlbum;
