import mongoose, { Model } from "mongoose";

export interface IAlbum {
    name: string;
    desc: string;
    image: string;
    bgColour: string;
}

const albumSchema = new mongoose.Schema<IAlbum>({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    bgColour: { type: String, required: true },
});

const albumModel: Model<IAlbum> =
    mongoose.models.album || mongoose.model<IAlbum>("album", albumSchema);

export default albumModel;
