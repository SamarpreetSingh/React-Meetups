import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <div className={classes.section}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
}

export default MeetupDetail;
