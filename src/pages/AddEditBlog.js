import React, { useEffect, useState } from 'react'
import { MDBValidation, 
  MDBInput, 
  MDBBtn,
  MDBTextArea
} from 'mdb-react-ui-kit'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["The Winning Team", "Group2", "Group3", "Group4", "Group5", "Group6" ];    

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryError, setCategoryError] = useState(null);
  const { title, description, category, imageUrl} = formValue;
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      setEditMode(true);
      getSingleBlog(id);
    }
    else {
      setEditMode(false);
      setFormValue({...initialState});
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if(singleBlog.status === 200) {
      setFormValue({...singleBlog.data});
    }
    else {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!category) {
      setCategoryError("Please submit with selected category. Danko!");
    }

    const imageValidation = !editMode ? imageUrl : true;
    if (title && description && imageUrl && category) {
      const currentDate = getDate();
      if(!editMode) {
        const updateBlogData = {...formValue, date: currentDate};
        const response = await axios.post("http://localhost:5000/blogs", 
        updateBlogData);
        if(response.status === 201) {
          toast.success("Blog created successfully.")
        }
        else {
          toast.error("Oops! Something went wrong. Please try again.");
        }
      } else {
        const response = await axios.put(`http://localhost:5000/blogs/${id}`, 
        formValue);
        if(response.status === 200) {
          toast.success("Blog updated successfully.")
        }
        else {
          toast.error("Oops! Something went wrong. Please try again.");
        }
      }
      
      setFormValue({title: "", description: "", category: "", imageUrl: ""})
      navigate("/")
    }
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  };

  const onUploadChange = (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "indiehela");
    axios
    .post("http://api.cloudinary.com/v1_1/dtqme1nzx/image/upload",formData)
    .then((response) => {
      console.log("Response", response);
      toast.info("Your image has been uploaded successully");
      setFormValue({...formValue, imageUrl: response.data.url})
    })
    .catch((err) => { toast.error("Oops! Something went wrong. Please try again.");
   });
  };

  const onCategoryChange = (e) => {
    setCategoryError(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation 
      className='row g-3' 
      style={{ 
        marginTop: "20px", 
        padding: "20px",
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className='fs-2 fw-bold'>{editMode ? "Update Blog" : "Add Blog"}</p>

      <div 
        style={{ 
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name='title'
          type='text'
          onChange={onInputChange}
          required
          label='Title'
          validation='Please provide a title'
          invalid="true"
        >
        </MDBInput>
        <br />
        <MDBTextArea 
          value={description || ""}
          name='description'
          type='text'
          onChange={onInputChange}
          required
          label='Description'
          validation='Please provide a description'
          textarea="true"
          rows={4}
          col={4}
          invalid="true"
        >
        </MDBTextArea >
        <br />   
        {!editMode && (
          <>
            <MDBInput
              type='file'
              onChange={(e) => onUploadChange(e.target.files[0])}
              required
              validation='Please provide an image'
              invalid="true"
            >
            </MDBInput>
            <br />
          </>
        )}     
        
        <select
          className='categoryDropdown'
          onChange={onCategoryChange}
          value={category}
        >
          <option>Please select a category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryError && (
          <div className='categoryError'>{categoryError}</div>
        )}
        <br/>
        <br/>
        <MDBBtn 
          type='submit' 
          style={{marginRight: "20px"}}>
            {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn 
          color="danger" 
          style={{marginRight: "20px"}} 
          onClick={() => navigate("/")}>
            Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  )
}

export default AddEditBlog
