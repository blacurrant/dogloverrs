import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { setInputValue } from "../redux/slices/InputSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Select } from "antd";


const Navbar = () => {
  const [breeds, setBreeds] = useState([]);
  const [selected, setSelected] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBreed = async () => {
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
    const selectedBreed = breeds.find(breed => breed.id === parseInt(value));
    const breedName = selectedBreed ? selectedBreed.name : '';
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
    <div className="flex flex-col">
      <div className="h-fit w-full flex flex-col gap-5 md:flex-row justify-between py-5 border-b border-gray-200 drop-shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-300">
          doglovers.
        </h1>
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
      <div className=" text-xl py-5 font-light w-full text-left">
        search results for:{" "}
        <span className=" font-semibold text-gray-400">{selected}</span>
      </div>
    </div>
  );
};

export default Navbar;
