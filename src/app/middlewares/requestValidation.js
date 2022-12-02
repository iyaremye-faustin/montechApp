import Joi from 'joi';
import { handleErrorResponse } from "../../core/helpers/responseHelper";

export const movieValidator=(req,res,next)=>{
  const movieSchema= Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().required(),
  });

  const {error}= movieSchema.validate(req.body);
  if (error) {
    return handleErrorResponse(res,400,error.details[0].message.replace(/[/"]+/g, ''),[],false);
  }
  next();
}

export const categoryValidator=(req,res,next)=>{
  const categorySchema= Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  const {error}= categorySchema.validate(req.body);
  if (error) {
    return handleErrorResponse(res,400,error.details[0].message.replace(/[/"]+/g, ''),[],false);
  }
  next();
}