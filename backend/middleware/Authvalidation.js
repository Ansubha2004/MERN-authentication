import joi from "joi";
//for validation of mail nam and password

export const authsignupValidation = (req, res, next) => {

    const schema=joi.object(
        {
            name:joi.string().min(3).max(100).required(),
            email:joi.string().email().required(),
            password:joi.string().min(8).max(30).required(),
        }
    )
    const {error}=schema.validate(req.body);//validating the data
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message});
    }
    next();
}
export const authloginValidation = (req, res, next) => {

    const schema=joi.object(
        {
            
            email:joi.string().email().required(),
            password:joi.string().min(8).max(30).required(),
        }
    )
    const {error}=schema.validate(req.body);//validating the data
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message});
    }
    next();
}