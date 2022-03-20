import {
  Sequelize, 
  DataTypes, 
  Model, 
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association
} from "sequelize";
import { sequelize } from "./index";		//방금 만들어주었던 sequelize객체 임포트
import { Cards } from "./cards";		

interface UsersAttributes {
  id: number;
  name : string;
  email : string;
  password : string;
  isGuest : boolean;
  isSocial: string | null;
}

export class Users extends Model<UsersAttributes>{
  public readonly id! : number;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public name! : string;
  public email! : string;
  public password! : string;
  public isGuest! : boolean;
  public isSocial! : string | null;

  // timestamps!
  public readonly createdAt!: Date;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public readonly updatedAt!: Date;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.

//여기는 안넣어줘도 일단 오류는 나지 않는다. 더 알아보고 나중에 업데이트 하겠다. 혹시 모르니깐-----
  // // Since TS cannot determine model association at compile time
  // // we have to declare them here purely virtually
  // // these will not exist until `Model.init` was called.
  public getCards!: HasManyGetAssociationsMixin<Cards>; // Note the null assertions!
  public addCards!: HasManyAddAssociationMixin<Cards, number>;
  public hasCards!: HasManyHasAssociationMixin<Cards, number>;
  public countCards!: HasManyCountAssociationsMixin;
  public createCards!: HasManyCreateAssociationMixin<Cards>;

  // // You can also pre-declare possible inclusions, these will only be populated if you
  // // actively include a relation.
  // public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
      userHasManyCards: Association<Users, Cards>;
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
      modelName : "Users",
      tableName : "Users",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

Users.hasMany(Cards, {
  sourceKey : "id",
  foreignKey : "userId",
  as : 'userHasManyCards'
});

/*
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.hasOne(models.projects, { foreignKey: "admin", sourceKey: "id" });
      this.hasMany(models.users_projects, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      this.hasMany(models.cards, { foreignKey: "userId", sourceKey: "id" });
    }
  }
  users.init(
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
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
*/