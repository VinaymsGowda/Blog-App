import './App.css';
import {Routes,Route} from "react-router-dom";
import Layout from './components/Layout';
import IndexPage from './pages/Indexpage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { UserContextProvider } from './components/UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route path='/login' element={<Login/>}></Route>
      <Route path={'/register'} element={<Register/>}></Route>
      <Route path={'/create'} element={<CreatePost/>}></Route>
      <Route path="/post/:id" element={<PostPage/>}></Route>
      <Route path="/edit/:id" element={<EditPost/>}></Route>
      <Route path="/delete/:id" element={<EditPost/>}></Route>
      <Route index element={<IndexPage/>}/>
    </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
