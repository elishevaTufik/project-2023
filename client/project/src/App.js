import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense, useState } from 'react';
import AppNavBar from './Components/AppNavbar';
import { Provider } from 'react-redux';
import { mystore } from './Store/Store';

const LazyHome = React.lazy(() => import("./Components/Home"))
const LazyUsers = React.lazy(() => import("./Components/Users/Users"))
const LazyTodos = React.lazy(() => import("./Components/Todos/Todos"))
const LazyPhotos = React.lazy(() => import("./Components/Photos/Photos"))
const LazyPosts = React.lazy(() => import("./Components/Posts/Posts"))


function App() {

  const[searchVal, setsearchVal]=useState("");

  return (
    <div className="App">
      <Provider store={mystore}>
      <AppNavBar setsearchVal={setsearchVal}/>
          <Routes>
            <Route path='/' element={<Suspense fallback="Loading..."><LazyHome searchVal={searchVal}/></Suspense> } />
            <Route path='/Users' element={<Suspense fallback="Loading..."><LazyUsers searchVal={searchVal}/></Suspense>} />
            <Route path='/Todos' element={<Suspense fallback="Loading..."><LazyTodos searchVal={searchVal}/></Suspense>} />
            <Route path='/Photos' element={<Suspense fallback="Loading..."><LazyPhotos searchVal={searchVal}/></Suspense>} />
            <Route path='/Posts' element={<Suspense fallback="Loading..." ><LazyPosts searchVal={searchVal} /></Suspense>} />
          </Routes> 
       </Provider>
    </div>
  );
}

export default App;
