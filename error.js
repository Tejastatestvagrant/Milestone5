
 class InputInValidError extends Error{

    constructor(message)
    {
        super(message);
        this.name='InputInValidError'
    }
}

class FileAccessError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileAccessError';
    }
}
class InvalidJsonError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidJsonError';
    }
}

export {InputInValidError,FileAccessError ,InvalidJsonError}