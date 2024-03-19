const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '65c3ba96292730f8097fbf9f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, aliquam ad sit voluptatibus animi porro soluta beatae cum dolorum consequatur dolorem vel ipsam iure minima ducimus est magni. Molestias, provident.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images : [
                {
                    url: 'https://res.cloudinary.com/dtdhfvfcb/image/upload/v1707642865/yelpcamp/d7qgcwhczyxuy2co3rtg.png',
                    filename: 'yelpcamp/d7qgcwhczyxuy2co3rtg'
                    },
                    {
                    url: 'https://res.cloudinary.com/dtdhfvfcb/image/upload/v1707642876/yelpcamp/cpem5ninb0jlifkk9q3q.png',
                    filename: 'yelpcamp/cpem5ninb0jlifkk9q3q'
                    }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})