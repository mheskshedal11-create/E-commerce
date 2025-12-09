class ErrorHandler extends Error {
    constructor(message, statusCode = 500, errors = [], stack) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Send error response
    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            errors: this.errors || null,
        });
    }
}

export default ErrorHandler;
