import React, { useEffect, useState } from "react";

const Dishes = () => {
  const [dishes, setDishes] = useState();

  useEffect(() => {
    const getDishData = async () => {
      try {
        const response = await fetch("/api/dishes/", {
          method: "GET",
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDishData();
  }, []);

  return <div>{JSON.stringify(dishes)}</div>;
};

export default Dishes;
