import {
  DataTypes, 
  Model, 
  Association
} from "sequelize";
import { sequelize } from "./index";
import { Users } from './users';
import { Projects } from "./projects"

interface Users_ProjectsAttributes {
  id: number;
  userId : number;
  projectId : number;
  isAccept : boolean;
}

export class Users_Projects extends Model<Users_ProjectsAttributes>{
  public readonly id! : number;
  public userId! : number;
  public projectId! : number;
  public isAccept! : boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
      modelName : "users_projects",
      tableName : "users_projects",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)