export const  ApiResponder = (req, res, next) => {
    res.ApiResponse = {
        success(data = {}, statusCode = 200, message = 'Success') {
            try {
                res.json({ data, message, statusCode });
            } catch (error) {
                return this.error(error, error.message, 500);
            }
        },
        error(data = {}, message = "Error", statusCode = 500) {
            // .send({ data, message, statusCode })
            res.sendStatus(500).send("Error message");
        }

    };
    next();
}