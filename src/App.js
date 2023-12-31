// MyComponent.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';
import "./App.scss";
import Card from 'react-bootstrap/Card';
import Tank from "./tank/tank";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiWarning } from "react-icons/ci";
import CollapsibleExample from "./Navbar/Nav";

const baseURL = "https://sore-red-nightingale-tutu.cyclic.app/api/get";

function MyComponent() {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [waterlevel, setWaterlevel] = useState(0);
  const [ipAddress, setIPAddress] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your asynchronous logic goes here
        axios.get(baseURL).then((response) => {
          setData(response.data);
          response.data.map((e) => {
            if (e._id === "654de9edd47767a2a0b3c4cd") {
              setIsChecked(e.isMotorOn);
              setWaterlevel(e.waterLevel);
            }
          });
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const getData = async () => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      console.log(res.data);
      setIPAddress(res.data.ip);
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
      getData();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const SentMail=(e)=>{
    emailjs.send("service_i4duh87","template_qhggu62",{
      to_name: "Abhishek",
      from_name: "Raspberry Pi",
      message:`Motor is ${e} at ${new Date().toLocaleString() } using device having IP Address ${ipAddress} and WaterLevel is ${Math.round(waterlevel)}% `,
      //message:`Waterlevel is: `,
      
      },"pyroi0Ev5pTjgp826");
  }

  const handleUpdate = async () => {
    try {
      // Make a PUT request to the server API
      const response = await axios.put(
        `https://sore-red-nightingale-tutu.cyclic.app/runFunction2`,
        {}
      );

      // Handle the response as needed
    } catch (error) {
      console.error("Error updating boolean value:", error);
    }
    setData([
      {
        _id: "654de9edd47767a2a0b3c4cd",
        isMotorOn: true,
      },
    ]);
  };

  const handleUpdate2 = async () => {
    try {
      // Make a PUT request to the server API
      const response = await axios.put(
        `https://sore-red-nightingale-tutu.cyclic.app/runFunction`,
        {}
      );

      // Handle the response as needed
    } catch (error) {
      console.error("Error updating boolean value:", error);
    }
    setData([
      {
        _id: "654de9edd47767a2a0b3c4cd",
        isMotorOn: true,
      },
    ]);
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
      handleUpdate();
      SentMail("Switched Off");
    } else if (isChecked === false) {
      setIsChecked(!isChecked);
      handleUpdate2();
      SentMail("Started");
    }
  };

  return (
    <>
    <CollapsibleExample/>

    <Card className="text-center">
      <Card.Header>WATER LEVEL DETECTION AND MONITORING SYSTEM</Card.Header>
    </Card>


    <div>
     
      <section id="abcd">
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
            return (
              <h2 key={index} id="ab">
                Motor is Running
                <CiWarning size={60} color="red" />
              </h2>
            );
          }

          return <h2 id="ab">Currently Motor is Off !!</h2>;
        })}
      </div>
      

      <Tank value={waterlevel} />
    </div>
    </>
  );
}

export default MyComponent;
