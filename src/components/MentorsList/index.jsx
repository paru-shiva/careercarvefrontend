import { v4 as uuidv4 } from "uuid";
import "./index.css";
import MentorCard from "../MentorCard";

const MentorsList = ({ mentors }) => {
  return (
    <div className="mentorsListComponent">
      {mentors.map((em) => (
        <MentorCard key={uuidv4()} mentor={em} />
      ))}
    </div>
  );
};

export default MentorsList;
