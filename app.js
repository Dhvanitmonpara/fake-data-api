import express from 'express';
import cors from "cors"
import { faker } from '@faker-js/faker';
const app = express()
import { asyncHandler } from './utils/asyncHandler.js';
import { ApiResponse } from './utils/apiResponse.js';

import run from './gemini/gemini.js';

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



// schema imports
import { User } from './models/user.model.js';

app.get("/", (req, res) => {
    res.send("Welcome to the Fake Data API!")
})

app.get('/schema/insert', asyncHandler(async (req, res) => {


    // console.log(process.env.MONGODB_URI)

    // const schemas = req.body?.schemas


    // Assuming you want to generate 10 random lists
    // const numberOfLists = 10;

    // const randomLists = Array.from({ length: numberOfLists }, (_, index) => ({
    //     createdBy: faker.string.uuid(), // Replace with actual User keyId if available
    //     title: faker.lorem.words(3),
    //     description: faker.lorem.sentences(2),
    //     coverImage: `https://placeimg.com/640/480/any`, // Placeholder for image
    //     theme: faker.random.arrayElement(['dark', 'light']),
    //     font: faker.random.arrayElement(['space-mono', 'sans-serif', 'serif']),
    //     collaborators: [faker.string.uuid()], // Replace with actual User keyIds if available
    // }));

    // console.log(randomLists);

    const schemaArray = {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        avatarImage: {
            type: String,
            default: ""
        },
        refreshToken: {
            type: String
        }
    }

    let dataArray = []

    let insertDocs


    let numberOfDocs = 10;
    let error = null
    for (let i = 0; i < numberOfDocs; i++) {
        try {
            let data = {};
            for (const key in schemaArray) {
                const fieldType = schemaArray[key].type;
                if (fieldType === String) {
                    data[key] = faker.person.firstName();
                } else if (fieldType === Number) {
                    data[key] = faker.datatype.int();
                } else if (fieldType === Boolean) {
                    data[key] = faker.datatype.boolean();
                } else if (fieldType === Date) {
                    data[key] = faker.date.past();
                }
                // Add more type checks as needed
            }
            dataArray.push(data)
        } catch (error) {
            error = error
            console.log("object creation failed: ", error)
            break;
        }
    }

    if (!error) {
        try {
            insertDocs = await User.insertMany(dataArray)
        } catch (error) {
            console.log("Error inserting users: ", error)
            return res.status(500).json(new ApiResponse(500, insertDocs, "Error inserting"))
        }
    }

    return res
        .status(201)
        .json(new ApiResponse(201, insertDocs, "Data inserted successfully"));

})
)

export { app }