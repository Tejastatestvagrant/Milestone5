
export default class InputInValidError extends Error{

    constructor(message)
    {
        super(message);
        this.name='InputInValidError'
    }
}