import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 5, 12345 some city',
        description: 'This is a first meetup'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 2312315, 12345 some city',
        description: 'This is a Second meetup'
    }
]

function HomePage(props) {


    return (
        <MeetupList meetups={props.meetups}/>
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