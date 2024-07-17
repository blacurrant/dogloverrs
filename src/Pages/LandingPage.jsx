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
      [dogId]: (prevLikes[dogId] || 0) + 1,
    }));
  };

  const fetchLikes = async () => {
    const likesDoc = await getDoc(doc(db, "dogs", "allDogs"));
    if (likesDoc.exists()) {
      setDogLikes(likesDoc.data().likes || {});
    }
  };

  const saveLikesToFirestore = async () => {
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
      const saveInterval = setInterval(saveLikesToFirestore, 60000);

      return () => {
        clearInterval(saveInterval);
        saveLikesToFirestore();
      };
    }
  }, [dogLikes]);

  useEffect(() => {
    fetchLikes();
  }, []);

  useEffect(() => {
    handleApi();
  }, [input]);

  return (
    <div className="flex flex-col gap-10 items-center text-3xl font-bold h-[80vh] overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {dogData.map((item, index) => {
          return (
            <div
              className="relative border border-black rounded-lg cursor-pointer"
              key={index}
            >
              <img
                className="h-[40vh] w-[100%] object-cover rounded-lg"
                src={item.url}
              />
              <div className="bg-black bg-opacity-50 absolute bottom-0 w-full flex justify-evenly px-5 py-2">
                <button
                  className="text-2xl font-light text-gray-100"
                  onClick={(e) => handleLike(item?.id)}
                >
                  <FaHeart />
                </button>
                {/* {likeCount} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
