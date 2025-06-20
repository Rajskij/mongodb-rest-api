async function errorHandler(dbRequest) {
    try {
        await dbRequest();
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            err.status = 400;
        }

        console.error('DB request error: ', err.message);
        throw err;
    }
}

export default errorHandler;
