const houses = require("./db.json")
let globalId = houses[houses.length - 1].id + 1;

module.exports = {
    getHouses:(req, res) => {
        res.status(200).send(houses);
    },

    deleteHouse: (req, res) => {
        const existingId = +req.params.id;

        let index = houses.findIndex(house => house.id === existingId);
        houses.splice(index, 1);
        res.status(200).send(houses);
    },

    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body;

        let newHouse = {
            address,
            price,
            imageURL,
            id: globalId
        }
        
        houses.push(newHouse);
        res.status(200).send(houses);
        globalId++
    },

    updateHouse: (req, res) => {
        const existingId = +req.params.id;
        let adjustType = req.body.type;
        let index = houses.findIndex(house => house.id === existingId);

        if(adjustType === "plus") {
            houses[index].price += 10000;
            res.status(200).send(houses);
        } else if(adjustType === "minus") {
          if(houses[index].price >= 10000) {
            houses[index].price -= 10000;
            res.status(200).send(houses);
          } else if(houses[index].price < 10000 && houses[index].price > 0) {
                houses[index].price = 0;
                res.status(200).send(houses);
          } else {
                res.status(400).send("Cannot list a house below 0.");
          }
        }
    }
};