import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from "sequelize";
import { sequelize } from "./index";
import { Users } from './users';
import { Cards } from "./cards";
import { Users_Projects } from "./users_projects";

interface ProjectsAttributes {
  id: number;
  title : string;
  desc : string;
  isTeam : boolean;
  admin : number;
}

export class Projects extends Model<ProjectsAttributes>{
  public readonly id! : number;
  public title! : string;
  public desc! : string | null;
  public isTeam! : boolean;
  public admin! : number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCards: HasManyGetAssociationsMixin<Cards>;
  public addCard: HasManyAddAssociationMixin<Cards, number>;
  public addCards: HasManyAddAssociationsMixin<Cards, number>;
  public setCards: HasManySetAssociationsMixin<Cards, number>;
  public removeCard: HasManyRemoveAssociationMixin<Cards, number>;
  public removeCards: HasManyRemoveAssociationsMixin<Cards, number>;
  public hasCard: HasManyHasAssociationMixin<Cards, number>;
  public hasCards: HasManyHasAssociationsMixin<Cards, number>;
  public countCards: HasManyCountAssociationsMixin;
  public createCard: HasManyCreateAssociationMixin<Cards, 'projectId'>;

  public getUsers_Projects: HasManyGetAssociationsMixin<Users_Projects>;
  public addUser_Project: HasManyAddAssociationMixin<Users_Projects, number>;
  public addUsers_Projects: HasManyAddAssociationsMixin<Users_Projects, number>;
  public setUsers_Projects: HasManySetAssociationsMixin<Users_Projects, number>;
  public removeUser_Project: HasManyRemoveAssociationMixin<Users_Projects, number>;
  public removeUsers_Projects: HasManyRemoveAssociationsMixin<Users_Projects, number>;
  public hasUser_Project: HasManyHasAssociationMixin<Users_Projects, number>;
  public hasUsers_Projects: HasManyHasAssociationsMixin<Users_Projects, number>;
  public countUsers_Projects: HasManyCountAssociationsMixin;
  public createUser_Project: HasManyCreateAssociationMixin<Users_Projects, 'projectId'>;

  public static associations: {
    projectHasManyCards: Association<Projects, Cards>;
    projectHasManyUsers_Projects: Association<Projects, Users_Projects>;
  };
}

Projects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isTeam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
      modelName : "projects",
      tableName : "projects",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

// Users.hasMany(Projects, {
//   sourceKey : "id",
//   foreignKey : "admin",
//   as : 'userHasManyProject'
// });

Projects.hasMany(Cards, {
  sourceKey : "id",
  foreignKey : "projectId",
  as : "projectHasManyCards"
});

Projects.hasMany(Users_Projects, {
  sourceKey : "id",
  foreignKey : "projectId",
  as : 'projectHasManyUsers_Projects'
});