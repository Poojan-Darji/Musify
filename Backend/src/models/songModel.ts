import mongoose, { Model } from "mongoose";

export interface ISong {
    name: string;
    desc: string;
    album: string;
    file: string;
    image: string;
    duration: string;
}

const songSchema = new mongoose.Schema<ISong>({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    album: { type: String, required: true },
    image: { type: String, required: true },
    file: { type: String, required: true },
    duration: { type: String, required: true },
});

const songModel: Model<ISong> =
    mongoose.models.song || mongoose.model<ISong>("song", songSchema);

export default songModel;
