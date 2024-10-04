const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '66e769a62dd02b8a29fd73bb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/db9tbx5bb/image/upload/v1727216924/YelpCamp/ifqkfslazsta4yvhwtwp.jpg',
                    filename: 'YelpCamp/a6za6oljanxrkpcaqmlx',
                },
                {
                    url: 'https://res.cloudinary.com/db9tbx5bb/image/upload/v1727216923/YelpCamp/a6za6oljanxrkpcaqmlx.jpg',
                    filename: 'YelpCamp/ffm7tz6bk3fz4dthy5gk',
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nesciunt qui sint aspernatur tenetur sapiente quos officiis, veritatis accusantium eligendi hic quam? Consequuntur quas porro, culpa ratione voluptates et aliquam. Minus a modi eaque, quod nam excepturi corporis est quo. Veritatis libero dolorem exercitationem architecto laudantium ullam unde repellat error soluta, aperiam illo itaque eaque a impedit dolorum accusamus deserunt. Eligendi veniam aliquid recusandae dignissimos molestiae distinctio, magnam quam odio nulla suscipit ducimus, voluptas soluta saepe ipsa quis! Consequuntur quaerat deleniti sequi? Cumque necessitatibus placeat explicabo iusto omnis incidunt eius.Libero non doloribus officia sed nam eaque laudantium animi aperiam error officiis! Quia at eveniet nisi, saepe possimus eum facere minus placeat accusamus temporibus error, veritatis non. Consequatur, quae omnis.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

