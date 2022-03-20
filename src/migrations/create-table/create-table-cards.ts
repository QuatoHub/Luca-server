import { Cards } from '../../models/cards';

const create_table_cards = async() => {
    await Cards.sync({force : true})
    .then(() => {
        console.log("Success Create User Table");
    })
    .catch((err) => {
        console.log("Error in Create User Table : ", err);
    })
}

create_table_cards();