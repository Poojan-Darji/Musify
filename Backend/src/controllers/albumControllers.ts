import { v2 as cloudiary } from "cloudinary";
import { Request, Response } from "express";
import { CustomAlbumRequest } from "../types/types";
import albumModel, { IAlbum } from "../models/albumModel";

const addAlbum = async (
    req: CustomAlbumRequest,
    res: Response
): Promise<void> => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;

        const imageUpload = await cloudiary.uploader.upload(imageFile?.path, {
            resource_type: "image",
        });

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url,
        };
        const album = await albumModel.create<IAlbum>(albumData);
        await album.save();

        res.status(200).json({ success: true, message: "Album added" });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
        return;
    }
};

const listAlbum = async (req: Request, res: Response) => {
    try {
        const albums = await albumModel.find({});
        res.status(200).json({ success: true, albums });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
        return;
    }
};

const removeAlbum = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const album = await albumModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "album removed" });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
        return;
    }
};

export { addAlbum, listAlbum, removeAlbum };
