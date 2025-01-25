import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const {token}=req.headers;
  if (!token){
    return res.json({success:false,message:'Not authorized, Login Again'})
  }
  try{

  }catch(error){


  }
}