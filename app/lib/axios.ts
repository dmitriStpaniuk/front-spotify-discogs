import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next/types';

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.API_URL,
})

// Request
// axiosInterceptorInstance.interceptors.request.use(
//   (config)=>{

//   }
// )

