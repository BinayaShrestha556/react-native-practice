import {useEffect, useState} from "react";

const useFetch=<T>(fetchFunction:()=>Promise<T>,autoFetch=true)=>{
   const [data, setData]=useState<T|null>(null);
   const [loading,setLoading]=useState<boolean>(true);
   const [error,setError]=useState<Error|null>(null);
   const fetchData=async()=>{
      try {
         setLoading(true);
         setError(null);
         const result = await fetchFunction();
         setData(result);

      }catch (err){
         setError(err instanceof Error?err:new Error("Error has occoured"));
      }finally {
         setLoading(false);
      }
   }
   const reset=()=>{
      setLoading(false);
      setError(null);
      setData(null);
   }
   useEffect(() => {
      if(autoFetch){
         fetchData()
      }
   }, []);
return { data, error, loading, reset, refetch:fetchData }
}
export default useFetch