const client = require('./client');

const { createAlcohol, registerUser } = require('./index');

async function buildTables() {
    try {
        client.connect();

        // Drop tables
        console.log("Starting to DROP TABLES...");
        await client.query(`
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS alcohols;
        DROP TABLE IF EXISTS users;
        `);
        console.log("Successfully DROPPED TABLES!");

        // Build tables
        console.log("Attempting to CREATE TABLES...");
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isLoggedIn" BOOLEAN DEFAULT false,
            "isAdmin" BOOLEAN DEFAULT false
        );
        CREATE TABLE alcohols(
            id SERIAL PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            price NUMERIC NOT NULL,
            description VARCHAR(255),
            "inStock" BOOLEAN DEFAULT false,
            inventory INT DEFAULT 500 NOT NULL,
            image VARCHAR(255) NOT NULL
        );
        CREATE TABLE cart(
            id SERIAL PRIMARY KEY,
            "userId" INT REFERENCES users("id"),
            "alcoholId" INT REFERENCES alcohols("id"),
            "isPending" BOOLEAN DEFAULT true,
            quantity INT DEFAULT 1
        );
        `);
        console.log("Successfully CREATED TABLES!");
    } catch (error) {
        throw error;
    }
}

async function populateInitialUsers() {
    console.log("Trying to create users...");
    try {
        const usersToCreate = [
            {
              username: "Brian M",
              password: "BrianMwashere",
              isAdmin: true,
            },
            {
              username: "Jordan H",
              password: "JordanHwashere",
              isAdmin: true,
            },
            {
              username: "Chris W",
              password: "ChrisWwashere",
              isAdmin: true,
            },
            {
              username: "Maxwell M",
              password: "MaxwellMwashere",
              isAdmin: true,
            },
            {
              username: "admin",
              password: "admin",
              isAdmin: true
            }
          ];

          const users = await Promise.all(usersToCreate.map(user => registerUser(user.username, user.password, user.isAdmin)));

          console.log("Users Created: ", users);
          console.log("Finished creating users!")
    } catch (error) {
        throw error;
    }
}

async function populateInitialData() {
    console.log("Trying to create Alcohols...");

    try {
        const alcoholsToCreate = [
            {
              type: "Rum",
              name: "Malibu",
              price: 14.99,
              description: "This shit is so good, you will forget you are drinking until it is too late!",
              image: "https://www.thecocktaildb.com/images/ingredients/Malibu%20Rum.png"
            },
            {
              type: "Vodka",
              name: "Smirnoff",
              price: 22.99,
              description: "I can't explain how many nights I have forgotten while drinking this shit!",
              image: "https://www.thecocktaildb.com/images/ingredients/Vodka.png"
            },
            {
              type: "Whiskey",
              name: "Teacher's",
              price: 16.99,
              description: "You must be a pretty cool individual, you gotta have a sick ass mustache, like Sam fucking Elliott!",
              image: "https://www.thecocktaildb.com/images/ingredients/Blended%20Whiskey.png"
            },
            {
              type: "Cognac Fine Champagne",
              name: "Courvoisier",
              price: 49.99,
              description: "Buy me at a gas station and flex on instagram about it",
              image: "https://www.thecocktaildb.com/images/ingredients/Cognac.png"
            },
            {
              type: "English Gin",
              name: "Plymouth",
              price: 26.99,
              description: "For all the old angry men out there ",
              image: "https://www.thecocktaildb.com/images/ingredients/Gin.png"
            },
            {
              type: "Vodka",
              name: "Burnett's Pineapple",
              price: 6.99,
              description: "Only for the cultured few that may appreciate the deep complex flavors that come alongside a 7 dollar plastic bottle of vodka",
              image: "https://www.thecocktaildb.com/images/ingredients/Pineapple%20vodka.png"
            },
            {
              type: "Apple Brandy",
              name: "Santa Fe Spirits",
              price: 36.99,
              description: "Little baby need his appie juice?",
              image: "https://www.thecocktaildb.com/images/ingredients/Apple%20Brandy.png"
            },
            {
              type: "Jamaican Rum",
              name: "Captain Morgan: Black Label",
              price: 29.99,
              description: "Every Pirates of the Carribean film is an cinematic masterpiece.",
              image: "https://www.thecocktaildb.com/images/ingredients/Rum.png"
            },
            {
              type: "Tequila, Silver",
              name: "Sierra Tequila",
              price: 15.99,
              description: "This alcohol is only every bought in order to get the tiny red hat the comes with it.",
              image: "https://www.thecocktaildb.com/images/ingredients/Tequila.png"
            },
            {
              type: "Banana Liquer",
              name: "Collins Cordials",
              price: 23.99,
              description: "Minions love this shit",
              image: "https://www.thecocktaildb.com/images/ingredients/Banana%20Liqueur.png"
            },
            {
              type: "Bourbon, Whiskey",
              name: "Michter's Small Batch",
              price: 45.99,
              description: "Old Stinky Whiskey",
              image: "https://www.thecocktaildb.com/images/ingredients/Bourbon.png"
            },
            {
              type: "Banana Liquer",
              name: "BOLS",
              price: 14.99,
              description: "Cant get enough of the nana.",
              image: "https://www.thecocktaildb.com/images/ingredients/Creme%20De%20Banane.png"
            },
            {
              type: "Light Rum",
              name: "Bacardi: Superior",
              price: 14.99,
              description: "I have never not regretted drinking bacardi.",
              image: "https://www.thecocktaildb.com/images/ingredients/Light%20Rum.png"
            },
            {
              type: "Single-Malt Scotch",
              name: "Macallan Amber",
              price: 89.99,
              description: "I don't know enough about the Scottish people to describe this bottle.",
              image: "https://www.thecocktaildb.com/images/ingredients/Scotch.png"
            },
            {
              type: "Rye Whiskey",
              name: "Journeyman Distillery: Last Feather Rye",
              price: 45.99,
              description: "Distilled from the blood of dead crows.",
              image: "https://www.thecocktaildb.com/images/ingredients/Rye%20Whiskey.png"
            },
          ];

          const alcohols = await Promise.all(alcoholsToCreate.map(createAlcohol));

          console.log("Alcohols Created: ", alcohols);
          console.log("Finished creating Alcohols!");
    } catch (error) {
        throw error;
    }
}

buildTables()
    .then(populateInitialUsers)
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end());