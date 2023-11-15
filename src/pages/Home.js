import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTypography
 } from "mdb-react-ui-kit";
import Blogs from '../component/Blogs';
import Search from '../component/Search';
import Category from '../component/Category';
import LatestBlog from '../component/LatestBlog';
import Pagination from '../component/Pagination';

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");  
  const [currentPage, setCurrentPage] = useState(0);  
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(5);

  const options = ["The Winning Team", "Group2", "Group3", "Group4", "Group5", "Group6" ]; 

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fecthLatestBlog();
  }, [])

  const loadBlogsData = async (start, end, increase) => {
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    if(response.status === 200) {
      setData(response.data);
      setCurrentPage(currentPage + increase);
    } 
    else {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };
  console.log("data", data);
 
  const fecthLatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:5000/blogs");
    setTotalBlog(totalBlog.data.length);
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    
    if(response.status === 200) {
      setLatestBlog(response.data)
    } 
    else {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("This blog post WILL be deleted: Are you sure?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if(response.status === 200) {
        toast.success("Blog was deleted successfully");
        loadBlogsData();
      } 
      else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    }
  };
  
  const elipsis = (str) => {
    if(str.length > 50) {
      str = str.substring(0, 25) + "...";
    }
    return str;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData();
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
    if(response.status === 200) {
      setData(response.data);
    } else {
        toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const handleCategory = async (category) => {
    const response = await axios.get(`http://localhost:5000/blogs?category=${category}`);
    if(response.status === 200) {
      setData(response.data);
    } else {
        toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Search 
        searchValue={searchValue} 
        onInputChange={onInputChange} 
        handleSearch={handleSearch}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h3">
            No Blog Found
          </MDBTypography>          
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && 
                data.map(
                  (item, index) => (
                  <Blogs 
                    key={index}
                    {...item}
                    elipsis={elipsis}
                    handleDelete={handleDelete}
                  />
                  )
                )
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className='text-start'>Latest Post</h4>
          {latestBlog && latestBlog.map((item, index) => (
            <LatestBlog key={index} {...item} />
          ))}
          <Category options={options} handleCategory={handleCategory}/>
        </MDBCol>
      </MDBRow>
      <div className='mt-3'>
        <Pagination 
          currentPage={currentPage}
          loadBlogsData={loadBlogsData}
          pageLimit={pageLimit}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
};

export default Home
