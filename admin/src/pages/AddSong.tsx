import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { IAlbum } from "../types/types";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const AddSong = () => {
    const [image, setImage] = useState<File>();
    const [song, setSong] = useState<File>();
    const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [album, setAlbum] = useState<string>("none");
    const [loading, setLoading] = useState<boolean>(false);
    const [albumData, setAlbumData] = useState<IAlbum[]>([]);

    const onSubmitHandler = async (e: React.FormEvent) => {
        console.log("onSubmitHandler is called");
        console.log(import.meta.env);

        console.log("url : ", url);

        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("album", album);

            console.log(formData);

            if (song) formData.append("audio", song);
            if (image) formData.append("image", image);

            const response = await axios.post(`${url}/api/song/add`, formData);

            if (!response.data.success) throw new Error("somthing went wrong");

            toast.success(response.data.message);
            setName("");
            setDesc("");
            setAlbum("none");
            setSong(undefined);
            setImage(undefined);
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("An unknown error occured");
        }

        setLoading(false);
    };

    const loadAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (!response.data.success) throw new Error("something went wrong");
            setAlbumData(response.data.albums);
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("An unknown error occured");
        }
    };

    useEffect(() => {
        loadAlbumData();
    }, []);

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col gap-8 items-start text-gray-600"
        >
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload song</p>
                    <input
                        onChange={(e) => setSong(e.target.files?.[0])}
                        type="file"
                        id="song"
                        accept="audio/*"
                        hidden
                    />
                    <label htmlFor="song">
                        <img
                            src={
                                song ? assets.upload_added : assets.upload_area
                            }
                            className="w-24 cursor-pointer"
                            alt=""
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input
                        onChange={(e) => setImage(e.target.files?.[0])}
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                    />
                    <label htmlFor="image">
                        <img
                            src={
                                image ? assets.upload_added : assets.upload_area
                            }
                            className="w-24 cursor-pointer"
                            alt=""
                        />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Song name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                    placeholder="Type here"
                    type="text"
                    required
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Song Description</p>
                <input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                    placeholder="Type here"
                    type="text"
                    required
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Album</p>
                <select
                    onChange={(e) => setAlbum(e.target.value)}
                    value={album}
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
                >
                    <option value="none">None</option>
                    {albumData.map((item, idx) => (
                        <option key={idx} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
            >
                Add
            </button>
        </form>
    );
};

export default AddSong;
