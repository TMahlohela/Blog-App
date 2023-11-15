import React, { useEffect, useState } from 'react';
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Badge from "../component/Badge";
import { toast } from 'react-toastify';

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedPostData = await axios.get(`http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`);
    setRelatedPost(relatedPostData.data);

    if(response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Oops! Something went wrong. Please try again.");
    }      
  };

  const elipsis = (str) => {
    if(str.length > 50) {
      str = str.substring(0, 25) + "...";
    }
    return str;
  };

  const styleInfo = {
    display: "inline",
    marginRight: "20px",
    float: "right",
    marginTop: "5px",
  };

  return (
    <MDBContainer style={{
        border: "1px solid #d1ebe8", 
        borderRadius: "4px",
        marginTop: "15px",
        paddingBottom: "15px",
        maxWidth: "70%",}}>
      <Link to="/">
        <strong
          className='mt-3'
          style={{ float: "right", 
            color: "black"}}>
          Go Back
        </strong>
      </Link>
      <MDBTypography 
        className='text-muted mt-2'
        tag="h2"
        style={{ display:"inline-block" }}>
        {blog && blog.title} 
      </MDBTypography>
      <img
        className='img-fluid round'
        src={blog && blog.imageUrl}
        alt={blog && blog.title}
        style={{width:"100%", 
          maxHeight:"600px"}}
      />
      <div style={{marginTop:"20px"}}>
        <div style={{height: "43px", background: "#f6f6f6"}}>
          <MDBIcon
            className='mt-3'
            style={{float:"left"}}
            far
            icon='calendar-alt'
            size='lg' />
            <strong 
              style={{float:"left",
                marginTop: "6px",
                marginLeft: "4px"
              }}>
              {blog && blog.date} 
            </strong>
            <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className='lead md-0'>
          {blog && blog.description}
        </MDBTypography>
      </div>
      {relatedPost && relatedPost.length > 0 && (
        <>          
          {relatedPost.length > 1 && <h1>Related Post</h1> }
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedPost
              .filter((item) => item.id != id)
              .map((item, index) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/blog/${item.id}`}>
                      <MDBCardImage
                        src={item.imageUrl}
                        alt={item.title}
                        position='top'
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{elipsis(item.description)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
            ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
};

export default Blog
  


//   const getSingleBlog = async () => {
//     const response = await axios.get(`http://localhost:5000/blogs/${id}`);
//     if(response.status === 200) {
//       setBlog(response.data);
//     } 
//     else {
//       toast.error("Oops! Something went wrong. Please try again.");
//     }
//   };

  

//   return (
    
      
//     </MDBContainer>
//   )
// };

// export default Blog
