import { Image } from "../../../models/Image.js";

class ImageController {
    async getImages(req, res) {
        try {
            const images = await Image.findAndCountAll({});
            res.ApiResponse.success(images, 200);
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
    async getImage (req, res) {
        try {
            const image = await Image.findOne({
                wehere: {
                    sourceID: req.body.recordID,
                },
            });
            if (!image) {
                res.ApiResponse.error(image, 'resource not found!', 404)
            }
            res.ApiResponse.success(image, 200);
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
}

export default new ImageController();