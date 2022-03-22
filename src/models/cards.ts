import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from "sequelize";
import { sequelize } from "./index";	
import { Users } from './users';
import { Projects } from "./projects"

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
  public readonly id! : number;
  public projectId! : number;
  public userId! : number;
  public content! : string;
  public parent! : number;
  public color! : string;
  public storage! : string;

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
  public createCards: HasManyCreateAssociationMixin<Cards, 'projectId'>;

  // public static associations: {
  //   userHasManyCards: Association<Users, Cards>;
  //   projectHasManyCards: Association<Projects, Cards>;
  // };
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
      modelName : "cards",
      tableName : "cards",
      sequelize,
      freezeTableName : true,
      timestamps : true,
      updatedAt : "updatedAt"
  }
)

// Users.hasMany(Cards, {
//   sourceKey : "id",
//   foreignKey : "userId",
//   as : 'userHasManyCards'
// });

// Projects.hasMany(Cards, {
//   sourceKey : "id",
//   foreignKey : "projectId",
//   as : "projectHasManyCards"
// });

// Users.belongsTo(Cards, { targetKey: 'id' });
// Cards.hasOne(Users, { sourceKey: 'id' });

// Projects.belongsTo(Cards, { targetKey: 'id' });
// Cards.hasOne(Projects, { sourceKey: 'id' });