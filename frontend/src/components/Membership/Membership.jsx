import React, { useState } from "react";
import gymData from "../../Utils/data";
import "./Membership.css";
import { Link } from "react-router-dom";

const Membership = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedGym, setSelectedGym] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handlePay = () => {
    alert("As per now we are not accepting any payments. Your final amount is ₹" + finalPrice.toFixed(2));
  };

  const regions = gymData.regions.map((r) => r.name);
  const gyms =
    selectedRegion &&
    gymData.regions.find((r) => r.name === selectedRegion)?.gyms || [];

  const selectedGymData = gyms.find((g) => g.gymName === selectedGym);
  const exercises = selectedGymData?.exercises || [];

  const comboOffers = [
    { name: "Zumba + Yoga Combo", discount: 2999 },
    { name: "HIIT + Circuit Training Combo", discount: 3999 },
    { name: "Pilates + Kickboxing + Zumba", discount: 2599 },
  ];

  const handleExerciseToggle = (exerciseName) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseName)
        ? prev.filter((e) => e !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  const calculateDiscount = () => {
    let discount = 0;
    comboOffers.forEach((combo) => {
      const comboItems = combo.name.split(" + ");
      if (comboItems.every((ex) => selectedExercises.includes(ex))) {
        discount += combo.discount;
      }
    });
    return discount;
  };

  const totalPrice = selectedExercises.reduce((sum, ex) => {
    const exerciseObj = exercises.find((e) => e.name === ex);
    return sum + (exerciseObj?.rate || 0);
  }, 0);

  const fivePercentDiscount = totalPrice * 0.05;
  const amountAfter5Percent = totalPrice - fivePercentDiscount;
  const comboDiscount = calculateDiscount();
  const finalPrice = amountAfter5Percent - comboDiscount;

  return (
    <div className="membership-container">
      <h1>Welcome to GymHut Membership!</h1>

      <div className="link-section">
        <p>Not sure which course to go for? Don't worry, we’ll help you find the perfect fit for your goals.</p>
        <a href="/courses" className="course-link">View Our Courses</a>
      </div>

      <div className="suggestions">
        <h3>Our Popular Exercises:</h3>
        <p>Zumba, Yoga, Pilates, Kickboxing, Circuit Training</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedGym("");
              setSelectedExercises([]);
            }}
          >
            <option value="">-- Select Region --</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Gym:</label>
          <select
            value={selectedGym}
            onChange={(e) => {
              setSelectedGym(e.target.value);
              setSelectedExercises([]);
            }}
            disabled={!selectedRegion}
          >
            <option value="">-- Select Gym --</option>
            {gyms.map((gym, index) => (
              <option key={index} value={gym.gymName}>{gym.gymName}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Exercises:</label>
          <div className="exercise-buttons">
            {exercises.map((exercise, index) => (
              <button
                key={index}
                onClick={() => handleExerciseToggle(exercise.name)}
                className={selectedExercises.includes(exercise.name) ? "selected" : ""}
              >
                {exercise.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedExercises.length > 0 && (
        <div className="summary">
          <h3>Your Selected Exercises:</h3>
          <ul>
            {selectedExercises.map((ex, i) => {
              const rate = exercises.find((e) => e.name === ex)?.rate || 0;
              return <li key={i}>{ex} - ₹{rate}</li>;
            })}
          </ul>
        </div>
      )}

      <div className="offers">
        <h3>Combo Offers:</h3>
        <div className="offer-cards">
          {comboOffers.map((offer, i) => (
            <div key={i} className="offer-card">
              <h4>{offer.name}</h4>
              <p>Save ₹{offer.discount}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="payment">
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        <p><strong>GymHut is pleased to offer a 5% discount to our valued customers</strong></p>
        <p><strong>Discount Amount is: </strong> ₹{fivePercentDiscount.toFixed(2)}</p>
        <h3><strong>Final Amount to Pay:</strong> ₹{finalPrice.toFixed(2)}</h3>
        <button className="pay-btn" onClick={handlePay}>Pay Now</button>
      </div>
    </div>
  );
};

export default Membership;
