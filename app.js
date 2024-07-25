import express from 'express';
import cors from "cors"
const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.get('/schema/insert', (req, res) => {
    

    // const schemas = req.body?.schemas


    // Assuming you want to generate 10 random lists
    const numberOfLists = 10;

    const randomLists = Array.from({ length: numberOfLists }, (_, index) => ({
        createdBy: faker.datatype.uuid(), // Replace with actual User ObjectId if available
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        coverImage: `https://placeimg.com/640/480/any`, // Placeholder for image
        theme: faker.random.arrayElement(['dark', 'light']),
        font: faker.random.arrayElement(['space-mono', 'sans-serif', 'serif']),
        collaborators: [faker.datatype.uuid()], // Replace with actual User ObjectIds if available
    }));

    console.log(randomLists);


})