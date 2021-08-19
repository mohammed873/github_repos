import axios from "axios";
import { useEffect , useState } from "react";
import {getCurrentDate} from '../../utils/getCurentDate'


export default function ReposLogic(pageNumber) {

    //get the current date - 1 month
    const date = getCurrentDate()

    //createa a state for loading it's by default true because the page will be loading first time waiting the data to be fetched 
    const [loading , setLoading] = useState(true);
    
    //create a state to store all fetched repos
    const [repos , setRepos] = useState([]);

    //create a state to check if we still has more festched repost to display or not
    const [hasMore , setHasMore] = useState(false);


    useEffect(() => {

        //set loading to true 
        setLoading(true);

       axios({
           method: "GET",
           url: `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`,
           params: {page : pageNumber}
       }).then(response =>{

           //set books to the fetched data , compaining the old and new fetched data in case we moved to the next page
           setRepos(previousRepos => {
               return [...previousRepos , ...response.data.items]
           })

           //set hasMore to check if there is no data to fetch
           setHasMore(response.data.items.length > 0)

           //set loading to false because there is no data to fetch
           setLoading(false)

       }).catch(error =>{
           console.log(error)
       })
    }, [pageNumber , date])
    
  return {loading , repos , hasMore }
}
