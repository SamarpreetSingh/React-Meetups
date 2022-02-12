import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://samar:samar@cluster0.edtms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://samar:samar@cluster0.edtms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  // console.log(selectedMeetup);

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        id: meetupId,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
