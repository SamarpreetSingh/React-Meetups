import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  const addHandler = async (enteredMeetup) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>New Meetup Form</title>
        <meta name="description" content="Add new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addHandler} />
    </>
  );
}

export default NewMeetupPage;
