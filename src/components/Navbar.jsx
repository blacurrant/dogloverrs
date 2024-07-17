import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { setInputValue } from "../redux/slices/InputSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Select } from "antd";
import InfoModal from "./Modal";

const Navbar = () => {
  const [breeds, setBreeds] = useState([]);
  const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBreed = async () => {
    setIsLoading(true);
    const response = await axios
      .get("https://api.thedogapi.com/v1/breeds", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "live_fLqmFyb4mF1HAKOxtsG2T516wGUSoDqFgwIJkVGuaQfsgT88cpWEgbijy847thAV",
        },
      })
      .then((response) => {
        console.log(response);
        setBreeds(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = breeds?.map((breed) => ({
    label: `${breed?.name}`,
    value: `${breed?.id}`,
  }));

  const handleChange = (value) => {
    console.log(value);
    const selectedBreed = breeds.find((breed) => breed.id === parseInt(value));
    const breedName = selectedBreed ? selectedBreed.name : "";
    setSelected(breedName);
    dispatch(setInputValue(value));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBreed();
  }, [selected]);

  return (
    <div className="flex flex-col drop-shadow-sm">
      <div className="h-fit w-full flex flex-col gap-5 md:flex-row justify-between py-5 border-b border-gray-950">
        <h1 className="text-4xl font-bold text-center">doglovers.</h1>
        <div className="w-full flex items-center justify-center">
          <Select
            className="w-full md:w-[40%] text-black h-10"
            showSearch
            placeholder="Select a person"
            onChange={handleChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={options}
          />
        </div>
        <div className=" flex items-center justify-center text-3xl font-bold">
          <button onClick={handleLogout}>
            <IoMdLogOut />
          </button>
        </div>
      </div>
      <div className=" flex justify-between text-xl py-5 font-light w-full text-left">
        search results for:{" "}
        {isLoading ? (
          <span className=" font-semibold text-gray-950 animate-bounce border-{t,r,b} border-black">....</span>
        ) : (
          <span className=" font-semibold text-gray-950">{selected}</span>
        )}
        <button
          className="border border-gray-950 rounded-md px-2 bg-black text-yellow-200 hover:bg-yellow-200 hover:text-black"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          description.
        </button>
        {isModalOpen && selected && (
          <InfoModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            item={breeds.find((breed) => breed?.name === selected)}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
