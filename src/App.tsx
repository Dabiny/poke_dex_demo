import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import './App.css';
import HomepageHeader from './Header/Header';
import PokeCardList from './List/PokeCardList';
import PageNavigator from './PageNavigator';

// PageNavigator로 경로 설정해주기 
// header는 그대로 고정하기 
function App() {
  return (
    <BrowserRouter>
      <HomepageHeader />
      <PageNavigator />
    </BrowserRouter>
  );
}

export default App;
