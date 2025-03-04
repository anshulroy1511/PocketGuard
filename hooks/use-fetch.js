//   hooks are the normal functions but with super powers in the react , and they are returned by the use keyword in the beginning
import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {

    const [data,setData] = useState(undefined);
    const [loading,setLoading] = useState(null);
    const[error,setError] = useState(null);

    const fn =async(...args) => {
        setLoading(true);
        setError(null);

        try{
            const response = await cb(...args);
            setData(response);
            setError(null);

        }catch(error){
            setError(error);
            toast.error(error.message);
        }finally{
          setLoading(false);  
        }
    }

    return {data,loading,error,fn,setData};
};

export default useFetch;