class ApiResponse{
    constructor(data,message="success",status=200)
    {
          this.data = data
          this.message = message
          this.status = status
    }
    }

export default ApiResponse;