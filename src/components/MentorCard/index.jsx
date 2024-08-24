import "./index.css";

const MentorCard = ({ mentor }) => {
  const { mentor_id, mentor_name, description, premium, start_time, end_time } =
    mentor;

  const startTime = start_time.slice(0, 5);
  const endTime = end_time.slice(0, 5);

  return (
    <div className="mentorCard">
      <div className="profile">
        <img className="profileImg" src="profile.png" />
        {premium == 1 ? <img className="premiumImg" src="premium.jpg" /> : null}
      </div>
      <div>
        <p className="id">{`#id: ${mentor_id}`}</p>
        <p className="detailsPara">
          Mentor Name : <span className="details">{mentor_name}</span>
        </p>
        <p className="detailsPara">
          Availability : <span className="details">{startTime}</span>
          <span className="details"> - {endTime}</span>
        </p>
      </div>
      <p className="detailsPara">About Mentor :</p>
      <p className="detailsPara details">{description}</p>
    </div>
  );
};

export default MentorCard;
