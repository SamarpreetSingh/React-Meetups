import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    image: "https://cdn3.dpmag.com/2021/07/Landscape-Tips-Mike-Mezeul-II.jpg",
    title: "First meetup",
    address: "india",
    description: "Very nice meetup",
  },
  {
    id: "m2",
    image: "https://cdn3.dpmag.com/2021/07/Landscape-Tips-Mike-Mezeul-II.jpg",
    title: "Second meetup",
    address: "india",
    description: "Very nice meetup",
  },
];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="A collection of amazing meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://samar:samar@cluster0.edtms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}).toArray();

  client.close();

  // console.log(meetups);

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
