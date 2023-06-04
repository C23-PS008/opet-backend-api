const requestResponse = {
    success: (message) => ({
        "error": false,
        "message": message,
    }),
    failed: (message) => ({
        "error": true,
        "message": message,
    }),
    successWithData: (message, data) => ({
        "error": false,
        "message": message,
        "data": data,
    }),
    serverError: (message) => ({
        "error": true,
        "message": message,
    })
}

export default requestResponse;