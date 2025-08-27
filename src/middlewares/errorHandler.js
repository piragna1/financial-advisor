export default function errorHandler(err,req,res,next){
    if (err.status){
        return res.status(err.status).json({
            error:err.mesagge,
            code:err.code,
            details:err.details
        });
    }
    console.error(err);
    res.status(500).json({error:'Internal server error'});
}