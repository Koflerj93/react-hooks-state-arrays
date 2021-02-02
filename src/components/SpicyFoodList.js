
//Add: use the spread operator ([...])
// Remove: use .filter
// Update: use .map



import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All"); 





  //This will give us a new variable, foodsToDisplay, that will be an array of:
// All foods from foods array if filterBy is set to "All"
// Only foods that match the cuisine in filterBy if filterBy is not set to "All"
// Now, we just need to use foodsToDisplay instead of foods when we're generating the <li> elements:
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  }); 

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  )); 



  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood] // Whenever we are updating state, it's important not to mutate objects and arrays, and instead, to create copies of them.
    setFoods(newFoodArray)
    console.log(newFood);
  }

  //Calling .filter will return a new array based on which elements match our criteria in the callback function. 
  //So if we write our callback function in .filter to look for all foods except the number we're trying to remove, we'll get back a new, shortened list of foods:
  // function handleLiClick(id) {
  //   const newFoodArray = foods.filter((food) => food.id !== id);
  //   setFoods(newFoodArray)
  // }



  //One approach we can take to updating items in arrays without mutating state involves using the .map method. 
  // Calling .map will return a new array with the same length as our original array (which is what we want), with some transformations applied to the elements in the array.
  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  } 


  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }



  // const foodList = foods.map((food) => (
  //   <li key={food.id} onClick={() => handleLiClick(food.id)}>
  //     {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  //   </li>
  // ));


  // With this state variable in place, we can update the <select> element to set the filterBy variable when its value is changed, like so:
  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select> 
        <button onClick={handleAddFood}>Add New Food</button>
        <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;

//Add: use the spread operator ([...])
// Remove: use .filter
// Update: use .map
