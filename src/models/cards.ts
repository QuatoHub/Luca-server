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
import { Users } from "./users";		

// These are all the attributes in the User model
interface CardsAttributes {
  id: number;
  projectId : number;
  userId : number;
  content : string;
  parent : number;
  color : string;
  storage : string;
}


export class Cards extends Model<CardsAttributes>{
  public readonly id! : number;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public projectId! : number;
  public userId! : number;
  public content! : string;
  public parent! : number;
  public color! : string;
  public storage! : string;

  // timestamps!
  public readonly createdAt!: Date;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public readonly updatedAt!: Date;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.

//여기는 안넣어줘도 일단 오류는 나지 않는다. 더 알아보고 나중에 업데이트 하겠다. 혹시 모르니깐-----
  // // Since TS cannot determine model association at compile time
  // // we have to declare them here purely virtually
  // // these will not exist until `Model.init` was called.
  public getScores!: HasManyGetAssociationsMixin<Users>; // Note the null assertions!
  public addScores!: HasManyAddAssociationMixin<Users, number>;
  public hasScores!: HasManyHasAssociationMixin<Users, number>;
  public countScores!: HasManyCountAssociationsMixin;
  public createScores!: HasManyCreateAssociationMixin<Users>;

  // // You can also pre-declare possible inclusions, these will only be populated if you
  // // actively include a relation.
  // public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    CardHasOneUsers: Association<Cards, Users>;
  };
}
//----------------------------
Cards.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storage: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
      modelName : "Cards",
      tableName : "Cards",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

// Cards.hasOne(Users, {
//   foreignKey : "userId",
//   as : 'CardHasOneUsers'
// });
/*
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cards extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
      this.belongsTo(models.projects, { foreignKey: "projectId", targetKey: "id" });
    }
  }
  cards.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storage: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "cards",
  });
  return cards;
};
*/