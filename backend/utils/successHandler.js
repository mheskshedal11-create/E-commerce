class SuccessHandler {
    constructor(data = null, message = "Success", statusCode = 200) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }

    // Send success response
    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data || null,
        });
    }
}

export default SuccessHandler;
