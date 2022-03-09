class HttpResponse {

    sendSuccess(response, message, data) {
        response.status(200).send({
            status: "Success",
            message,
            data
        })
    }

    sendFailure(response, error) {
        response.status(400).send({
            status: "Failure",
            error
        })
    }

}

module.exports = new HttpResponse;