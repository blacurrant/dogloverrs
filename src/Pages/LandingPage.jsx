import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { db } from "../Firebase/Firebase";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  setDoc,
} from "firebase/firestore";

const LandingPage = () => {
  const [dogData, setDogData] = useState([]);
  const [dogLikes, setDogLikes] = useState({});

  const input = useSelector((state) => state.inputSlice.inputValue);

  console.log(input, "inbrotherput");

  const handleApi = async () => {
    const response = await axios
      .get(
        ` https://api.thedogapi.com/v1/images/search?limit=20&breed_ids=${input || ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "live_fLqmFyb4mF1HAKOxtsG2T516wGUSoDqFgwIJkVGuaQfsgT88cpWEgbijy847thAV",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setDogData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLike = (dogId) => {
    console.log("handleLike", dogId);
    setDogLikes((prevLikes) => ({
      ...prevLikes,
      [dogId]: (dogLikes[dogId] || 0) + 1,
    }));
  };

  const fetchLikes = async () => {
    const likesDoc = await getDoc(doc(db, "dogs", "allDogs"));
    if (likesDoc.exists()) {
      setDogLikes(likesDoc.data().likes || {});
    }
  };

  const saveLikesToFirestore = async () => {
    console.log(dogLikes, "dogLikes");
    try {
      await setDoc(
        doc(db, "dogs", "allDogs"),
        { likes: dogLikes },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(dogLikes)?.length > 0) {
      console.log(dogLikes, "dogLikes");
      // const saveInterval = setInterval(saveLikesToFirestore, 60000);
      // return () => {
      //   clearInterval(saveInterval);
      //   saveLikesToFirestore();
      // };
      saveLikesToFirestore();
    }
  }, [dogLikes]);

  useEffect(() => {
    fetchLikes().then(() => console.log(dogLikes));
  }, []);

  useEffect(() => {
    handleApi();
  }, [input]);

  return (
    <div className="flex flex-col gap-10 items-center text-3xl font-bold h-[82.7vh] overflow-y-scroll ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {dogData.map((item, index) => {
          return (
            <div
              className="relative border border-black rounded-lg"
              key={item.id}
            >
              <img
                className="h-[40vh] w-[100%] object-cover rounded-lg"
                src={item.url}
              />
                <div
                  onClick={(e) => handleLike(item?.id)}
                  className="bg-yellow-100 bg-opacity-70 absolute bottom-0 w-full flex justify-evenly items-center rounded-b-md"
                >
                  <button className="text-2xl flex justify-center px-5 py-3 w-[50%] h-full font-light text-black hover:bg-red-600 hover:text-white rounded-bl-md">
                    <FaHeart />
                  </button>
                  <p className="text-2xl text-center w-[50%] text-black">{dogLikes[item.id] !== undefined ? dogLikes[item.id] : "0"}</p>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
