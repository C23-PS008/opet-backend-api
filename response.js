const requestResponse = {
    success: (message) => ({
        "error": false,
        "message": message,
    }),
    failed: (message) => ({
        "error": true,
        "message": message,
    }),
    successWithData: (message, result) => ({
        "error": false,
        "message": message,
        "result": result,
    }),
    serverError: (message) => ({
        "error": true,
        "message": message,
    })
}

export default requestResponse;