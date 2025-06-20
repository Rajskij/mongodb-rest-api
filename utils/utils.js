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

export function isEmpty(obj) {
    if (obj === undefined || obj === null) {
        return true;
    }
    if (Object.keys(obj).length === 0) {
        return true;
    }

    return false;
}

export default errorHandler;
