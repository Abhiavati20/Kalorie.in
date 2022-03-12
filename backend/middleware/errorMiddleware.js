// page not found error
const notFound = (req, res, next) => {                                              
    const error = new Error(`Not Found - ${req.originalUrl}`);                          // creating a error
    res.status(404);                                                                    // setting status as 404
    next(error);                                                                        // moving to next                                                  
};

// any error occured during request
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode                    // initializing the status code
    res.status(statusCode);                                                             // setting status as 500
    res.json({                                                                          // sending json response
      message: err.message,                                                            
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
};
module.exports = { notFound, errorHandler };