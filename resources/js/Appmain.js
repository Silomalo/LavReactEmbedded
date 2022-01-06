
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Student from './components/Student';
import Addstudent from './components/add_student';
import Editstudent from './components/edit_student';
import ImageGallary from './components/album';


function Appmain() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Student/>} />
        <Route path="/add-student" element={<Addstudent/>} />
        <Route path="/edit-student/:id" element={<Editstudent/>} />
        <Route path="/myalbum" element={<ImageGallary/>} />
    </Routes>
    </BrowserRouter>
  );
}
export default Appmain;

