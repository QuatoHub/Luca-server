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

interface Users_ProjectsAttributes {
  id: number;
  userId : number;
  projectId : number;
  isAccept : boolean;
}

export class Users_Projects extends Model<Users_ProjectsAttributes>{
  public readonly id! : number;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public userId! : number;
  public projectId! : number;
  public isAccept! : boolean;

  // timestamps!
  public readonly createdAt!: Date;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public readonly updatedAt!: Date;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.

//여기는 안넣어줘도 일단 오류는 나지 않는다. 더 알아보고 나중에 업데이트 하겠다. 혹시 모르니깐-----
  // // Since TS cannot determine model association at compile time
  // // we have to declare them here purely virtually
  // // these will not exist until `Model.init` was called.
  public getCards!: HasManyGetAssociationsMixin<Users>; // Note the null assertions!
  public addCards!: HasManyAddAssociationMixin<Users, number>;
  public hasCards!: HasManyHasAssociationMixin<Users, number>;
  public countCards!: HasManyCountAssociationsMixin;
  public createCards!: HasManyCreateAssociationMixin<Users>;

  // // You can also pre-declare possible inclusions, these will only be populated if you
  // // actively include a relation.
  // public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
      userHasManyCards: Association<Users_Projects, Users>;
  };
}

Users_Projects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
      modelName : "Users_Projects",
      tableName : "Users_Projects",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

// Projects.hasMany(Cards, {
//   sourceKey : "id",
//   foreignKey : "projectId",
//   as : "projectHasManyCards"
// });
/*
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_projects extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
      this.belongsTo(models.projects, { foreignKey: "projectId", targetKey: "id" });
    }
  }
  users_projects.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "users_projects",
    timestamps: false,
  });
  return users_projects;
};
*/