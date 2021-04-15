namespace API.Errors
{
    public class ApiException
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
        public ApiException(int StatusCode, string Message = null, string details = null)
        {
            this.Details = details;
            this.Message = Message;
            this.StatusCode = StatusCode;
        }
    }
}