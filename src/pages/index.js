import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

function HomePage(props) {

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name="descritpion"
                    content="Browse huge list of highly React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    )
}

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://nicholas:nf9A4yjDCH7VSZ88@cluster0.qzbgkdd.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    };
}

// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;
//     return{
//         props: {
//             meetups: DUMMY_MEETUPS,
//         }
//     };
// }

export default HomePage;