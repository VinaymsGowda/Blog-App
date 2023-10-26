import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import {useNavigate, useParams} from 'react-router-dom';

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



export default function EditPost(){
    const {id}=useParams();
    const [title,settitle]=useState("");
    const [summary,setsummary]=useState("");
    const [content,setcontent]=useState("");
    const [files,setfile]=useState("");
    const [redirect,setredirect]=useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://localhost:4000/post/'+id,{
            method:'GET',
        }).then(response=>{
            response.json().then(postdata=>{
                settitle(postdata.title)
                setcontent(postdata.content)
                setsummary(postdata.summary)
            })
        })
    },[id])

    function handletitle(event){
        settitle(event.target.value);
      }
      function handlesummary(event){
        setsummary(event.target.value);
      }
      function handlecontent(value){
        setcontent(value);
      }

    async function UpdatePost(event){
        event.preventDefault();
        const data=new FormData();
        data.set('title',title)
        data.set('summary',summary);
        data.set('content',content);
        if(files?.[0])
            data.set('file',files?.[0]);
        data.set('id',id);
        const response=await fetch('http://localhost:4000/post',{
            method:'PUT',
            body:data,
            credentials:'include',
        });
        if(response.ok){
            setredirect(true);
        }
    }
    if(redirect){
        navigate('/post/'+id);
      }

    
    return(
        <form onSubmit={UpdatePost}>
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
            <button style={{marginTop:'5px',width:'100%'}}>Edit Post</button>
        </form>
    )
}