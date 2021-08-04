import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './scss/index.scss';
import App from './App';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

const initialState = [{}]
//подключение екшин к стейт редакса
function poetryList(state = initialState, action) {
  console.log(action)
  if(action.type === 'ADD__POETRY') {
    //оператор ... spread 
    return [
      ...state,
      action.payload
    ]
  }
  return state
}
//createStore(тут переменную называют reducer)
// const store = createStore(poetryList);
//подключаем девтулз
const store = createStore(poetryList, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const addPoetryBtn = document.querySelectorAll(".addBtn")[0];
// const poetryInput = document.querySelectorAll('.addInputPoetry')[0]
// const list = document.querySelectorAll('.list')[0];

// store.subscribe(()=>{
//   //чтоб не дублировался вывод будем очищать 
//   list.innerHTML='';

//   //очищение инпута
//   poetryInput.value = '';

//   store.getState().forEach(element => {
//     const div = document.createElement('div')
//     div.textContent = element;
//     list.appendChild(div)
//   });
// })

// if(addPoetryBtn){addPoetryBtn.addEventListener('click', ()=> {
//   const poetryTitle = poetryInput.value;
//   //функция которая выстреливает action ежинственное чем можно поменять стор
//   store.dispatch({type: 'ADD__POETRY', payload: poetryTitle});
// })
// }

console.log(store.getState());
ReactDOM.render( <React.StrictMode >
    <Router >
      <Provider store={store }>
      <App />
      </Provider>
    </Router>  
    </React.StrictMode > ,
    document.getElementById('root')
);