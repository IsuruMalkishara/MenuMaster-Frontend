import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import BranchPage from './pages/BranchPage';
import NavBarComponent from './components/NavBarComponent';
import MenuPage from './pages/MenuPage';
import SubCategoryPage from './pages/SubCategoryPage';
import ItemsPage from './pages/ItemsPage';
import ItemPage from './pages/ItemPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <div>
    <Router>
    <div>
            
            <Routes>
            
            <Route path="/" exact element={<WelcomePage/>}></Route>
            <Route path="/login" exact element={<LoginPage/>}></Route>
            <Route path="/signup" exact element={<SignupPage/>}></Route>
            <Route path="/home" exact element={<><NavBarComponent/><HomePage/></>}></Route>
            <Route path="/branch/:id" exact element={<><NavBarComponent/><BranchPage/></>}></Route>
            <Route path="/branch/:id/menu/:mid" exact element={<><NavBarComponent/><MenuPage/></>}></Route>
            <Route path="/branch/:id/menu/:mid/category/:cid/sub" exact element={<><NavBarComponent/><SubCategoryPage/></>}></Route>
            <Route path="/branch/:id/menu/:mid/category/:cid/sub/:sid" exact element={<><NavBarComponent/><ItemsPage/></>}></Route>
            <Route path="/branch/:id/menu/:mid/category/:cid/item" exact element={<><NavBarComponent/><ItemPage/></>}></Route>
            <Route path="/profile" exact element={<><NavBarComponent/><ProfilePage/></>}></Route>
            <Route path="/profile/edit" exact element={<><NavBarComponent/><EditProfilePage/></>}></Route>

            </Routes>
    </div>
    </Router>
    </div>
  );
}

export default App;
