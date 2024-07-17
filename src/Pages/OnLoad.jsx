import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
import axios from "axios";

const OnLoad = () => {
  const [dogsArray, setDogsArray] = useState([]);
  const [newDogArray, setNewDogArray] = useState([]);

  const handleApi = async (id) => {
    const response = await axios
      .get(` https://api.thedogapi.com/v1/images/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "live_fLqmFyb4mF1HAKOxtsG2T516wGUSoDqFgwIJkVGuaQfsgT88cpWEgbijy847thAV",
        },
      })
      .then((response) => {
        console.log(response.data);
        setNewDogArray((prevData) => [...prevData, response.data]);
        // setNewDogArray([...newDogArray, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLikes = async () => {
    const likesDoc = await getDoc(doc(db, "dogs", "allDogs"));
    if (likesDoc.exists()) {
      console.log(Object.keys(likesDoc.data().likes), likesDoc.data().likes);
      // Object.keys(likesDoc.data().likes).forEach((key) => {
      //   handleApi(key);
      // })
      setDogsArray([...dogsArray, ...Object.keys(likesDoc.data().likes)]);
    }
  };

  useEffect(() => {
    fetchLikes()
  }, []);

  useEffect(() => {
    dogsArray.forEach((dog) => {
      handleApi(dog);
    })
  }, [dogsArray]);



  return (
    <div className=" container mx-auto flex flex-col gap-10 items-center text-2xl font-bold h-[90vh]">
      <div className="h-[10vh] w-full flex justify-between py-5">
        <h1 className="text-3xl font-bold ">dogLovers.</h1>
        <Link
          className="flex gap-2 font-light
                 items-center justify-center py-2 appearance-none border border-gray-200 w-fit px-5 rounded-md"
          to="/login"
        >
          Login
        </Link>
      </div>
        
        <p className="">Top doggos of the day!! <span className="text-gray-500 font-light">(login to vote for your favourite)</span></p>
      <div className="h-full w-full grid grid-cols-5 border border-gray-200 overflow-y-scroll">
        {newDogArray.map((dog, index) => {
          return (
            <div key={index} className="rounded-lg">
              <img
                className="w-[300px] h-[300px] border border-gray-200 rounded-lg object-cover"
                src={dog?.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnLoad;
