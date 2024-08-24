import "./index.css";
import Booking from "../Booking";
import ShoppingBag from "../ShoppingBag";
import MentorsList from "../MentorsList";
import { useState, useEffect } from "react";

const Body = () => {
  const [listOfMentors, changeListOfMentors] = useState([]);
  const [listOfRoles, changeListOfRoles] = useState([]);
  const [showPayment, changeShowPayment] = useState("");
  const [sessionType, changeSessionType] = useState("");
  const [user, changeUser] = useState("");

  useEffect(() => {
    const getAllMentors = async () => {
      const response = await fetch(
        "https://careercarvebackend-t941.onrender.com/get-allmentors"
      );
      const result = await response.json();
      changeListOfMentors(result);
    };
    getAllMentors();

    const getRoles = async () => {
      const response = await fetch(
        "https://careercarvebackend-t941.onrender.com/get-roles"
      );
      const result = await response.json();
      changeListOfRoles(result);
    };
    getRoles();
  }, []);

  const getRoleMentors = async (role) => {
    const response = await fetch(
      `https://careercarvebackend-t941.onrender.com/get-rolementors/${role}`
    );
    const result = await response.json();
    changeListOfMentors(result);
  };

  return (
    <div className="bodyComponent">
      <div className="bookingsSection">
        <Booking
          roles={listOfRoles}
          getRoleMentors={getRoleMentors}
          mentorsList={listOfMentors}
          changeShowPayment={changeShowPayment}
          changeSessionType={changeSessionType}
          changeUser={changeUser}
        />
        {showPayment == "" ? (
          <div className="shoppingBagComponent">No Payment Data</div>
        ) : (
          <ShoppingBag sessionType={sessionType} user={user} />
        )}
      </div>
      <MentorsList mentors={listOfMentors} />
    </div>
  );
};

export default Body;
