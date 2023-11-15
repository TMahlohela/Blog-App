import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from './Badge';

const Blogs = ({ title, category, description, id, imageUrl, elipsis, handleDelete}) => {
  return (
    <MDBCol size="4"
      style={{
        padding:"25px 10px ",
        justifyItems: "center",
      }}
    >
      <MDBCard className='h-100 nt-2'
        style={{maxWidth:"22rem"}}>
        <MDBCardImage
          src={imageUrl}
          alt={title}
          position="top"
          style={{
            maxWidth:"100%",
            height:"280px",
            textJustify:"center",
          }}/>
        <MDBCardBody alignment='center'>
          <MDBCardTitle
           style={{
            margin: "auto",
            padding: "5px",
            textAlign: "center",
            }}>{title}</MDBCardTitle>
          <MDBCardText>
            {elipsis(description)}            
            <br />
            <Link to={`blog/${id}`}>Read More</Link>
          </MDBCardText>
          <br/>
          <div style={{marginBottom: "0px"}}>
            <Badge>{category}</Badge>
            <span 
              style={{
                margin:"0 0 0 40%",
              }}>
              <Link to={`/editBlog/${id}`}>
                <MDBIcon
                  fas
                  icon="edit"
                  placeholder="Edit"
                  style={{color: "#55acee", margin: "auto 10px" }}
                  size="lg"
                />
              </Link>
              <MDBBtn className="nt-1"
                tag="a" 
                color="none"
                onClick={() => handleDelete(id)}>
                <MDBIcon
                  fas
                  icon="trash"
                  placeholder="Delete"
                  style={{color: "#dd4b39"}}
                  size="lg"
                />
              </MDBBtn>              
            </span>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Blogs
