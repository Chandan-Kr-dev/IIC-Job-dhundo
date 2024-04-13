import React, { useState,useEffect } from 'react'
import Banner from '../pages/Banner'
import Jobs from './MyJob'
import Card from '../components/Cards'


const Job= () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage=6;

  useEffect(() => {
    setIsLoading(true);
    fetch("").then(res => res.json()).then(data => {
      // console.log(data)
      setJobs(data)
      setIsLoading(false);
    })
  }, [])

  // console.log(jobs)
    const[query,setquery]=useState("");
    const handleInputChange=(event)=>{
      setquery(event.target.value)
    }
  

    //filter jobs by title
    const filteredItem=jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLocaleLowerCase())!==-1);
    
    //-------------Radio filtering-------
    const handlechange=(event)=>{
      setSelectedCategory(event.target.value)
    }

    //-----------button based filtering---------
    const handleClick=(event)=>{
      setSelectedCategory(event.target.value)
    }

    //calculate the index range
    const calculatePageRange=()=>{
      const startIndex=(currentPage - 1) * itemsPerPage;
      const endIndex=startIndex + itemsPerPage;
      return {startIndex,endIndex};
    }

    //function for the next page
    const nextPage=()=>{
      if(currentPage<Math.ceil(filteredItem.length/itemsPerPage)){
        setCurrentPage(currentPage+1);
      }
    }

    //function for the previous  page
const prevPage=()=>{
  if(currentPage>1){
    setCurrentPage(currentPage-1)
  }
}

    //main function
    const filteredData=(jobs,selected,query)=>{
        let filteredJobs=jobs;

        //filtering input items
        if(query){
          filteredJobs=filteredItem;
        }

        //category filtering
        if(selected){
          filteredJobs=filteredJobs.filter(({jobLocation,maxPrice,experienceLevel,salaryType,employmentType,
            postingDate})=>(
            jobLocation.toLowerCase()===selected.toLowerCase()||
            parseInt(maxPrice)<=parseInt(selected)||
            postingDate>=selected ||
            salaryType.toLowerCase()===selected.toLowerCase()||
            experienceLevel.toLowerCase()===selected.toLowerCase()||
            employmentType.toLowerCase()===selected.toLowerCase()
          ));
          console.log(filteredJobs);
        }
        //slice the data based on current page
        const {startIndex,endIndex}=calculatePageRange();
        filteredJobs=filteredJobs.slice(startIndex,endIndex)
        
        return filteredJobs.map((data,i)=><Card key={i} data={data}/>)
    }

    const result=filteredData(jobs,selectedCategory,query);
  return (
    <div>
        <Banner query={query} handleInputChange={handleInputChange}/>
    
    {/*main content*/}
   
      {/*left side*/}
     {/* <div className='bg-white p-4 rounded'>
      <Sidebar handleChange={handlechange} handleClick={handleClick}/>
      </div>
     {/*job cards*/}
      
      {/*right side*/}
      {/*<div className='bg-white p-4 rounded'><Newsletter/></div>*/}
    
    </div>
  )
}

export default Job