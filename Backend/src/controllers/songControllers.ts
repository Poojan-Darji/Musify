import { Request, Response } from "express";
import { v2 as cloudiary } from "cloudinary";
import songModel, { ISong } from "../models/songModel";
import { CustomSongRequest } from "../types/types";

const addSong = async (
    req: CustomSongRequest,
    res: Response
): Promise<void> => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files?.audio[0];
        const imageFile = req.files?.image[0];

        const audioUpload = await cloudiary.uploader.upload(audioFile?.path, {
            resource_type: "video",
        });
        const imageUpload = await cloudiary.uploader.upload(imageFile?.path, {
            resource_type: "image",
        });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
            audioUpload.duration % 60
        )}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        };

        const song = await songModel.create<ISong>(songData);
        await song.save();

        res.status(200).json({
            success: true,
            message: "Song added successfully",
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
        return;
    }
};

const listSong = async (req: Request, res: Response) => {
    try {
        const songs = await songModel.find({});
        res.status(200).json({ success: true, songs });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
        return;
    }
};

const removeSong = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const song = await songModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "song removed" });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
        return;
    }
};

export { addSong, listSong, removeSong };
