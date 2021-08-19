import axios from "axios";
import { useEffect , useState } from "react";

export default function ReposLogic(pageNumber) {

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
           url: "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc",
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

           console.log(response)
       }).catch(error =>{
           console.log(error)
       })
    }, [pageNumber])
    
  return {loading , repos , hasMore }
}
