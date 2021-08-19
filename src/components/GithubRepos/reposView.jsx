import React , { useState , useEffect } from 'react';
import styles from '../../styles/reposView.module.css'
import GetStarsReposInlast30Days from './reposLogic.jsx'

function ReposView() {
  //the page number state 
  const [pageNumber , setPageNumber] = useState(1)

  //call back the custum hook for fetching all stars repos in last 30 days
  const {loading , repos , hasMore} = GetStarsReposInlast30Days(pageNumber)


  useEffect(() => {
   setPageNumber(1)
  }, [])
  return (
    <>
         {repos.map(repo=>{
           return (
              <div key={repo.id} className={styles.repoContainer}>
                 <div className={styles.ownerAvatarContainer}>
                      <img src={repo.owner.avatar_url} alt="owner avatar" />
                  </div>
                  <div className={styles.repoDetailsContainer}>
                      <h1>{repo.name}</h1>
                      <p>{repo.description}</p>
                      <span className={styles.starsSpan}>Stars {repo.stargazers_count}</span>
                      <span className={styles.issuesSpan}>Issues {repo.open_issues_count}</span>
                      <span className={styles.submissionDateSpan}> 
                         created on {repo.created_at} by 
                         <span className={styles.ownerName}>
                           {repo.owner.login}
                         </span>
                      </span>
                  </div>
                </div>
           )})}
    </>
  );
}

export default ReposView;
