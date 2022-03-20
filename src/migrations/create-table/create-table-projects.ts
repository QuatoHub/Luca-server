import { Projects } from '../../models/projects';

const create_table_projects = async() => {
    await Projects.sync({force : true})
    .then(() => {
        console.log("Success Create User Table");
    })
    .catch((err) => {
        console.log("Error in Create User Table : ", err);
    })
}

create_table_projects();