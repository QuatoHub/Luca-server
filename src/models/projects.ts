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
import { Cards } from "./cards"

interface ProjectsAttributes {
  id: number;
  title : string;
  desc : string;
  isTeam : boolean;
  admin : number;
}

export class Projects extends Model<ProjectsAttributes>{
  public readonly id! : number;   //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
  public title! : string;
  public desc! : string | null;
  public isTeam! : boolean;
  public admin! : number;

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
      userHasManyCards: Association<Projects, Cards>;
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
      modelName : "Projects",
      tableName : "Projects",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

Projects.hasMany(Cards, {
  sourceKey : "id",
  foreignKey : "projectId",
  as : "projectHasManyCards"
});

/*
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "admin", targetKey: "id" });
      this.hasMany(models.users_projects, {
        foreignKey: "projectId",
        sourceKey: "id",
      });
      this.hasMany(models.cards, { foreignKey: "projectId", sourceKey: "id" });
    }
  }
  projects.init(
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
      sequelize,
      modelName: "projects",
    }
  );
  return projects;
};
*/