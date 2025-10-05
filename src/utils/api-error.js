

class ApiError extends Error{
    constructor(message,statusCode,data,error,stack="")
    {
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.data = data
        this.error = error
        this.success = false

        if(stack)
        {
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export default ApiError;