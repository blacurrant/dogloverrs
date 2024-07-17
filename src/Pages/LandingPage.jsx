import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import InfoModal from "../components/Modal";

const LandingPage = () => {
  const [dogData, setDogData] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(10);

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

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  useEffect(() => {
    handleApi();
  }, [input]);

  return (
    <div className="flex flex-col gap-10 items-center text-3xl font-bold h-[80vh] overflow-y-scroll">
      <div className="grid grid-cols-3 gap-2">
        {dogData.map((item, index) => {
          return (
            <div
              className="relative border border-black rounded-lg cursor-pointer"
              key={index}
            >
              <img
                className="h-[40vh] w-[100%] object-cover rounded-lg"
                src={item.url}
                onClick={() => setIsModalOpen(true)}
              />
              {isModalOpen && <InfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} item={item} />}
              <div className="bg-black bg-opacity-50 absolute bottom-0 w-full flex justify-evenly px-5 py-2">
                <button onClick={handleLike}>
                  <FaHeart />
                </button>
                {/* {likeCount} */}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div  className="w-full h-[10vh] flex justify-center items-center border border-gray-200 rounded-lg py-2 hover:bg-black cursor-pointer">
        <button className="text-2xl font-light text-gray-300">Load More</button>
      </div> */}
    </div>
  );
};

export default LandingPage;
