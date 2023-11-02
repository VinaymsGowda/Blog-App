import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css'; // Add this line
import {useNavigate} from 'react-router-dom';

const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'color': [] }],
    ],
  };
  

  const formats=[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
  ];


export default function CreatePost(){
    const [title,settitle]=useState("");
    const [summary,setsummary]=useState("");
    const [content,setcontent]=useState("");
    const [files,setfile]=useState("");
    const [redirect,setredirect]=useState(false);
    const navigate = useNavigate();
    
      function handletitle(event){
        settitle(event.target.value);
      }
      function handlesummary(event){
        setsummary(event.target.value);
      }
      function handlecontent(value){
        setcontent(value);
      }
      async function createNewPost(event){
        const data=new FormData();
        data.set('title',title)
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]); 
        event.preventDefault();
        // console.log(files);
        const response=await fetch('https://blog-app-q68u.onrender.com/post',{
          method:'POST',
          body:data,
          credentials:'include',
        })
        if(response.ok){
          setredirect(true);
        }
      }
      if(redirect){
        navigate('/');
      }
    return(
        <form onSubmit={createNewPost}>
            <input type="title" placeholder="Title" value={title} onChange={handletitle}/>
            <input type="summary" placeholder="summary" value={summary} onChange={handlesummary}/>
            <input type="file" onChange={event=>setfile(event.target.files)}/>
            <ReactQuill
                theme="snow"
                value={content}
                modules={modules}
                formats={formats}
                onChange={handlecontent}
/>

            <button style={{marginTop:'5px',width:'100%'}}>Create Post</button>
        </form>
    )
}