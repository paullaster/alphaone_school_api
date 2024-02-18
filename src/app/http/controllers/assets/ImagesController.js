import { Image } from "../../../models/Image";

class ImageController {
    async getImages(req, res) {
        try {
            const images = await Image.findAndCountAll({});
            res.ApiResponse.success(images, 200);
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
}

export default new ImageController();