import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const loginUser = createAsyncThunk("auth/login",async(credentials : {email:string,password:string})=>{
    const response = await api.post("/auth/login",credentials);
    return response.data;
})
export const registerUser = createAsyncThunk("auth/register",async(userData : {username:string,email:string,password:string})=>{
   try {
    const response = await api.post("/auth/register",userData);
    return response.data;
   } catch (error : any) {
    return Promise.reject(error.response.data);
   }
})  
export const logoutUser = createAsyncThunk("auth/logout",async()=>{
    const response = await api.post("/auth/logout");
    return response.data;
})