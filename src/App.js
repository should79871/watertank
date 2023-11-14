// MyComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.scss'
import Tank from './tank/tank';
import { CiWarning } from "react-icons/ci";

const baseURL = "https://sore-red-nightingale-tutu.cyclic.app/api/get";

function MyComponent() {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [waterlevel,setWaterlevel]= useState(0);

  
  useEffect(() => {
     

    const fetchData = async () => {
      try {
        // Your asynchronous logic goes here
        axios.get(baseURL).then((response) => {
          setData(response.data)
          response.data.map((e) => {
            if (e._id === "654de9edd47767a2a0b3c4cd") {
              setIsChecked(e.isMotorOn)
              setWaterlevel(e.waterLevel)
            }
          })
    
    
        })
       
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handleUpdate = async () => {
    try {
      // Make a PUT request to the server API
     

      // Handle the response as needed
    
    } catch (error) {
      console.error('Error updating boolean value:', error);
    }
    setData([{
      "_id": "654de9edd47767a2a0b3c4cd",
      "isMotorOn": false
    }])
  };


  const handleUpdate2 = async () => {
    try {
      // Make a PUT request to the server API
      const response = await axios.put(`https://sore-red-nightingale-tutu.cyclic.app/runFunction`, {});


      // Handle the response as needed
    
    } catch (error) {
      console.error('Error updating boolean value:', error);
    }
    setData([{
      "_id": "654de9edd47767a2a0b3c4cd",
      "isMotorOn": true
    }])

  };

  // const handleUpdate = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/get`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ newValue }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update boolean value');
  //     }

  //     // Handle the updated document if needed
  //     const updatedDocument = await response.json();
  //     console.log('Updated Document:', updatedDocument);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleCheckboxChange = () => {
    // Update the state when the checkbox is toggled
    if (isChecked === true) {
      setIsChecked(!isChecked);
      handleUpdate()
    } else if (isChecked === false) {
      setIsChecked(!isChecked);
      handleUpdate2()
    }
  };




  return (
    <div>
    <section  id="abcd" >

    <div className="checkbox">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={isChecked}
          id="checkbox"
          onChange={handleCheckboxChange}
        />
        <label className="checkbox__label" htmlFor="checkbox"></label>
      </div>
    </section>
      


      {/* <p>Checkbox is {isChecked ? 'checked' : 'unchecked'}</p>
      <button onClick={() => console.log(isChecked)}>ok</button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      /> */}
{/* 
      <h1>My Data</h1>
      <button onClick={() => console.log(waterlevel)}>Console</button>
      <button onClick={() => handleUpdate()}>MOTOR off</button>
      <button onClick={() => handleUpdate2()}>MOTOR on</button> */}



      <div>
        {data.map((element, index) => {
          if (element.isMotorOn === true) {
            return <h2 key={index} id="ab">Motor is Running<CiWarning size={60} color='red'/>
            </h2>;
          }

          return <h2 id="ab">Currently Motor is Off !!</h2>;
        })}</div>


      <Tank value={waterlevel}/>
    </div>
  );
}

export default MyComponent;