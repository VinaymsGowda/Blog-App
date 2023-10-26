import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";

export default function PostPage(){
    const [postdata,setpostdata]=useState(null);
    const {userinfo}=useContext(UserContext);
    const {id}=useParams(); //to get post id
    const [confirmdelete, setconfirmdelete] = useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response=>{
            response.json().then(postinfo=>{
                setpostdata(postinfo);
            });
        });
    },[id]);

    const handleDeleteClick = () => {
        setconfirmdelete(true);
      };

      async function handleConfirmDelete(){
        // Perform the delete action here, and then close the confirmation dialog
        // You can make a DELETE request to your API endpoint to delete the post
        if(confirmdelete){
            const response=await fetch('http://localhost:4000/post/'+id,{
                method:'DELETE',
            });
            if(response.ok){
                setconfirmdelete(false);
                navigate("/");
            }
        }
        
        // After successful deletion, you may want to navigate the user to another page
      };

      const handleCancelDelete = () => {
        
        setconfirmdelete(false);
      };

    if(!postdata){
        return '';
    }
    if (!userinfo || !userinfo.id) {
        // If userinfo doesn't exist or doesn't have an 'id' property, render a loading state or handle the scenario accordingly
        return <div>Please Login/Create an Account to view Blog </div>; // You can replace this with an appropriate loading UI
    }
    return(
        <div className="post-page">
        <h1>{postdata.title}</h1>
        <time>{format(new Date(postdata.createdAt),'MMM d,yyyy HH:MM')}</time>
        <div className="author">by @{postdata.author.username}</div>
        {userinfo.id===postdata.author._id && (
            <div className="Operations">
            <div className="edit">
                <Link className="edit-btn" to={`/edit/${id}`}>
                Edit Post
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                </Link>
            </div>
            <div className="delete"> 
                <button className="delete-btn"  onClick={handleDeleteClick}>
                Delete Post
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                </button>
            </div>
            <DeleteConfirmationDialog
            isOpen={confirmdelete}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
        />
            </div>
        )}
        <div className="image">
            <img src={`http://localhost:4000/${postdata.file}`} alt=""/>
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:postdata.content}}/>
        </div>
        
    );
} 