import { useNavigate } from "react-router-dom";

interface AlbumItemProps {
    name: string;
    image: string;
    desc: string;
    id: string;
}

const AlbumItem = ({ image, name, desc, id }: AlbumItemProps) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/album/${id}`)}
            className="min-w-[180px] p-2 px-3 roudded cursor-pointer hover:bg-[#ffffff26]"
        >
            <img className="rounded-2xl" src={image} alt="" />
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    );
};

export default AlbumItem;
