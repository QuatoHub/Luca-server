import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from "sequelize";
import { sequelize } from "./index";
import { Cards } from "./cards";		
import { Projects } from "./projects"
import { Users_Projects } from "./users_projects"

interface UsersAttributes {
  id: number;
  name : string;
  email : string;
  password : string;
  isGuest : boolean;
  isSocial: string | null;
}

export class Users extends Model<UsersAttributes>{
  public readonly id! : number;
  public name! : string;
  public email! : string;
  public password! : string;
  public isGuest! : boolean;
  public isSocial! : string | null;

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
  public createCard: HasManyCreateAssociationMixin<Cards, 'userId'>;

  public getUsers_Projects: HasManyGetAssociationsMixin<Users_Projects>;
  public addUser_Project: HasManyAddAssociationMixin<Users_Projects, number>;
  public addUsers_Projects: HasManyAddAssociationsMixin<Users_Projects, number>;
  public setUsers_Projects: HasManySetAssociationsMixin<Users_Projects, number>;
  public removeUser_Project: HasManyRemoveAssociationMixin<Users_Projects, number>;
  public removeUsers_Projects: HasManyRemoveAssociationsMixin<Users_Projects, number>;
  public hasUser_Project: HasManyHasAssociationMixin<Users_Projects, number>;
  public hasUsers_Projects: HasManyHasAssociationsMixin<Users_Projects, number>;
  public countUsers_Projects: HasManyCountAssociationsMixin;
  public createUser_Project: HasManyCreateAssociationMixin<Users_Projects, 'userId'>;

  public static associations: {
    userHasManyProject: Association<Users, Projects>;
    userHasManyCards: Association<Users, Cards>;
    userHasManyUsers_Projects: Association<Users, Users_Projects>;
  };
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isGuest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isSocial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
      modelName : "users",
      tableName : "users",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

Users.hasMany(Projects, {
  sourceKey : "id",
  foreignKey : "admin",
  as : 'userHasManyProject'
});

Users.hasMany(Cards, {
  sourceKey : "id",
  foreignKey : "userId",
  as : 'userHasManyCards'
});

Users.hasMany(Users_Projects, {
  sourceKey : "id",
  foreignKey : "userId",
  as : 'userHasManyUsers_Projects'
});
