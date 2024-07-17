import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const OnLoad = () => {
  const [dogsArray, setDogsArray] = useState([]);
  const [newDogArray, setNewDogArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleApi = async (id) => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLikes = async () => {
    const likesDoc = await getDoc(doc(db, "dogs", "allDogs"));
    if (likesDoc.exists()) {
      console.log(
        Object.entries(likesDoc.data().likes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
      );
      setDogsArray([
        ...dogsArray,
        ...Object.entries(likesDoc.data().likes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5),
      ]);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  useEffect(() => {
    dogsArray
      .map((entry) => entry[0])
      .forEach((dog) => {
        console.log(dog);
        handleApi(dog);
      });
  }, [dogsArray]);

  return (
    <div className=" px-16 flex flex-col gap-10 items-center text-2xl font-bold h-[100vh] bg-yellow-200">
      <div className="h-[10vh] w-full flex justify-between py-5">
        <h1 className="text-3xl font-bold ">dogLovers.</h1>
        <Link
          className="flex gap-2 font-light
                 items-center justify-center py-2 appearance-none border border-gray-900 w-fit px-5 rounded-md bg-black text-yellow-200 hover:bg-yellow-200 hover:text-black"
          to="/login"
        >
          Login
        </Link>
      </div>
      <div className="flex flex-col gap-20">        
        <p className="text-5xl flex flex-col items-center justify-center gap-5">
          Top dogs of the day!!{" "}
          <span className="text-gray-500 font-light">
            (login to vote for your favourite)
          </span>
        </p>
        {isLoading ?
        <span className=" font-semibold text-gray-950 animate-bounce border-{t,r,b} border-black">....</span>
      :
        
          <div className="h-[70vh] w-[90vw] flex gap-5 overflow-auto ">
            {newDogArray.map((dog, index) => {
              return (
                <div key={index} className="w-[350px] h-[30vh] relative rounded-lg">
                  <img
                    className="w-[350px] h-[30vh] border border-gray-900 rounded-lg object-cover"
                    src={dog?.url}
                  />
                  <div className="absolute bottom-0 w-full flex text-light justify-between px-5 py-2 bg-yellow-100 bg-opacity-70 rounded-b-md">
                    <p className="flex gap-2 justify-center items-center">
                      <FaHeart />
                      {
                        (dogsArray.find((entry) => entry[0] === dog.id) || [
                          "ID not found",
                        ])[1]
                      }
                    </p>
                    <p>{dog?.breeds[0]?.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
      }
      </div>
    </div>
  );
};

export default OnLoad;
