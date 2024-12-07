import {Request,Response,NextFunction} from 'express'
import createErrors from 'http-errors'

function NotFoundRoute(req:Request,res:Response,next:NextFunction) {
    const error = createErrors(404,'Not found this route');

    res.status(error.status).json({
        status: 'Error!',
        message: error.message
    });
}

export default NotFoundRoute;