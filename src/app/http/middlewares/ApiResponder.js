class ApiResponder {
    res = null;
    constructor(res) {
        this.res = res;
    }
    success(data = {}, statusCode = 200, message = 'Success') {
try {
    this.res.sendStatus(statusCode).json({data, message});
} catch (error) {
        return this.error(error, error.message, 500);
}    }
    error(data = {}, message = "Error", statusCode = 500 ) {
        this.res.sendStatus(statusCode).json({data, message});
    }
}

export default new ApiResponder();