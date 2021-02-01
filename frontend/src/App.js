import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const log = console.log;

function App() {
  useEffect(()=>{
    // 데이터베이스에 있는 값을 가져온다.
    axios.get('/api/values')
    .then(response => {
      log('response', response)
      setLists(response.data)
    })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const  submitHandler = (event) => {
    event.preventDefault();
    axios.post('/api/value', {value: value})
    .then(response => {
      if(response.data.success){
        log('response', response)
        setLists([...lists, response.data])
        setValue("")
      } else {
        alert('DB insert fail');
      }
    })
  }
  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">

          {lists && lists.map((list, index)=> (
            <li key={index}> {list.value} </li>
          ))}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">OK</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
