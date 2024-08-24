import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const Booking = ({
  roles,
  getRoleMentors,
  mentorsList,
  changeShowPayment,
  changeSessionType,
  changeUser,
}) => {
  const [selectedRole, changeSelectedRole] = useState("");
  const [selectedMentorId, changeSelectedMentorId] = useState("");
  const [userMsg, changeUserMsg] = useState("");
  const [sessionDetails, changeSessionDetails] = useState([]);
  const [userSelectedSession, changeUserSelectedSession] = useState("");
  const [sessionSucess, changeSessionSuccess] = useState("");

  useEffect(() => {
    const setDefaultMentor = async () => {
      const response = await fetch(
        `https://careercarvebackend-t941.onrender.com/get-default-mentor/${selectedRole}`
      );
      const result = await response.json();

      changeSelectedMentorId(result[0].mentor_id);
      changeUserMsg(result[1].msg);
      console.log(result);
      changeSessionDetails(result);
    };
    if (selectedRole !== "") {
      setDefaultMentor();
    }
  }, [selectedRole]);

  const onRoleChange = (e) => {
    changeSelectedRole(e.target.value);
    getRoleMentors(e.target.value);
    changeSessionSuccess("");
    changeShowPayment("");
  };

  const onMentorChange = (e) => {
    console.log(e.target.value);
    changeSessionSuccess("");
    changeSelectedMentorId(e.target.value);
    changeShowPayment("");
    changeUserMsg(
      "additional charges are applied if you select premium mentor"
    );
  };

  const renderSessions = () => {
    if ((sessionDetails[2].available_sessions = 3)) {
      return (
        <>
          <option className="options" value="00:60:00">
            1Hr
          </option>
          <option className="options" value="00:45:00">
            45Min
          </option>
          <option className="options" value="00:30:00">
            30Min
          </option>
        </>
      );
    } else if ((sessionDetails[2].available_sessions = 2)) {
      <>
        <option className="options" value="00:45:00">
          45Min
        </option>
        <option className="options" value="00:30:00">
          30Min
        </option>
      </>;
    } else if ((sessionDetails[2].available_sessions = 1)) {
      <>
        <option className="options" value="00:30:00">
          30Min
        </option>
      </>;
    }
  };

  const onUserSessionChange = (e) => {
    changeUserSelectedSession(e.target.value);
    changeSessionSuccess("");
    changeShowPayment("");
  };

  /*const onAddClick = async () => {
    if (userSelectedSession !== "" && selectedMentorId !== "") {
      console.log(userSelectedSession, selectedMentorId);
      console.log("post request here");
      const data = { mentor: selectedMentorId, session: userSelectedSession };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert data to JSON string
      };
      const response = await fetch("http://localhost:3000/set-mentor", options);
      const result = await response.json();
      changeSessionSuccess(result.msg);
    }
  };*/

  const onAddClick = () => {
    if (userSelectedSession !== "" && selectedMentorId !== "") {
      changeShowPayment("show");
      changeSessionType(userSelectedSession);
      changeUser(selectedMentorId);
    }
  };

  return (
    <div className="bookingComponent">
      <h3 className="bookingTitle">Book 1x1 with an Expert</h3>

      <div className="bookings">
        <div className="inputs">
          <label className="formLabel" htmlFor="student_id">
            Student ID
          </label>
          <input
            id="student_id"
            className="form-control form-control-sm options"
            type="text"
            placeholder="Enter Your ID"
          ></input>
        </div>

        <div className="inputs roles">
          <label className="formLabel" htmlFor="role">
            Role
          </label>
          <select
            className="form-control form-control-sm options"
            id="role"
            value={selectedRole}
            onChange={onRoleChange}
          >
            <option value="">Select A Role</option>
            {roles.map((er) => (
              <option key={uuidv4()} value={er.role}>
                {er.role}
              </option>
            ))}
          </select>
        </div>

        <div className="inputs mentors">
          <label className="formLabel" htmlFor="mentor">
            Mentor ID
          </label>
          <select
            className="form-control form-control-sm options"
            id="mentor"
            value={selectedMentorId}
            onChange={onMentorChange}
          >
            {mentorsList.map((em) => (
              <option
                key={uuidv4()}
                value={em.mentor_id}
              >{`${em.mentor_name} (id: ${em.mentor_id})`}</option>
            ))}
          </select>
          <p className="mentorAlert">{userMsg}</p>
        </div>

        <div className="inputs">
          <label className="formLabel" htmlFor="sessions">
            Sessions
          </label>
          {sessionDetails.length != 0 ? (
            <select
              className="form-control form-control-sm options"
              id="sessions"
              value={userSelectedSession}
              onChange={onUserSessionChange}
            >
              <option className="options" value="">
                Session Starts at {sessionDetails[3].todays_endtime}
              </option>
              {renderSessions()}
            </select>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button type="button" className="addBtn" onClick={onAddClick}>
            Add to your Bag
          </button>
          <p className="mentorAlert">{sessionSucess}</p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
