import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/frontend-assets/assets";
import AlbumItem from "./Albumitem";
import SongItem from "./SongItem";

const DisplayHome = () => {
    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((item, idx) => (
                        <AlbumItem
                            key={idx}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">
                    Today's biggest hits
                </h1>
                <div className="flex overflow-auto">
                    {songsData.map((item, idx) => (
                        <SongItem
                            key={idx}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default DisplayHome;
