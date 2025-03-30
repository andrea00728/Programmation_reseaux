import axios, {  AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
interface ImportMetaEnv{
    readonly VITE_API_BASE_URL:string;
}

interface ImportMeta{
    readonly env:ImportMetaEnv;
}

const axiosCLient=axios.create({
    baseURL:`${(import.meta as unknown as ImportMeta).env.VITE_API_BASE_URL}`,
});

axiosCLient.interceptors.request.use((config:InternalAxiosRequestConfig): InternalAxiosRequestConfig =>{
    const token=sessionStorage.getItem("ACCESS_TOKEN");
    if(token){
        config.headers=config.headers ??   {};
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
},
    (error:AxiosError)=>Promise.reject(error)
);

axiosCLient.interceptors.response.use(
    (response:AxiosResponse):AxiosResponse=>{
        return response;
    },
   (error:AxiosError):Promise<never>=>{
    const {response}=error;
    if(response?.status===401){
       sessionStorage.removeItem("ACCESS_TOKEN");
    }
    return Promise.reject(error);
   }
);

export default axiosCLient;