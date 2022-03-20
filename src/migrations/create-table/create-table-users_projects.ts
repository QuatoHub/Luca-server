import { Users_Projects } from '../../models/users_projects';

const create_table_users_projects = async() => {
    await Users_Projects.sync({force : true})
    .then(() => {
        console.log("Success Create User Table");
    })
    .catch((err) => {
        console.log("Error in Create User Table : ", err);
    })
}

create_table_users_projects();