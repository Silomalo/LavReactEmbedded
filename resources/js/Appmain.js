
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Student =lazy(() => import ( './components/Student'))
const Addstudent =lazy(() => import ( './components/add_student'))
const Editstudent =lazy(() => import ( './components/edit_student'))
const ImageGallary =lazy(() => import ( './components/album'))
const Login =lazy(() => import ( './components/Login'))
const App =lazy(() => import ( './tester'))

function Appmain() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
        <Route exact path="/get-in" element={<Login/>} />
        <Route exact path="/get" element={<App/>} />
        <Route exact path="/" element={<Student/>} />
        <Route path="/add-student" element={<Addstudent/>} />
        <Route path="/edit-student/:id" element={<Editstudent/>} />
        <Route path="/myalbum" element={<ImageGallary/>} />
    </Routes>
    </Suspense>
    </BrowserRouter>
  );
}
export default Appmain;

