import Image from "next/image";
import React from "react";
import { BiSolidNavigation } from "react-icons/bi";
import { FaRegStar, FaStar } from "react-icons/fa6";

export default function Card(props) {
  const renderStars = (rating) => {
    console.log("rating::: ", rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };
  console.log("props:::======================== ", props.tour);
  return (
    <div
      key={props.tour._id}
      className="card my-4 w-96 h-[400px] mx-5 bg-white shadow-lg carousel-item  rounded-xl shrink-0"
    >
      <div>
        <Image
          className="w-full h-60 object-cover rounded-tl-xl rounded-tr-xl"
          src={`http://localhost:8084/img/tours/${props.tour.imageCover}`}
          alt="image"
          width={200}
          height={200}
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between pl-3 font-bold mt-6 mr-3 text-xl">
          <h1>{props.tour.name}</h1>
          <br />
          <p className="font-bold text-orange-600 text-xl	">
            {props.tour.price} €
          </p>
        </div>
        <div>
          <h1 className="pl-3 mt-3 mb-3 text-gray-500">
            {props.tour.startLocation.description}
          </h1>
        </div>
        <div className="flex justify-between pl-3 ">
          <p className="text-sm">
            <span className="flex align-middle">
              <BiSolidNavigation className="mr-1 w-5 h-5" />
              {props.tour.duration}
              &nbsp; Days Trip
            </span>
          </p>
          <div className=" flex text-gray-500 text-lg ">
            {renderStars(props.tour.ratingsQuantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
