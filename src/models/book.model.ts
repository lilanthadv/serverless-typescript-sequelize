import { Table, Column, Model, DataType } from "sequelize-typescript";
import sequelize from "../config/sequelize";

@Table({ tableName: "books", timestamps: true })
export class Book extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  name!: string;

  @Column({ allowNull: false, type: DataType.STRING })
  author!: string;

  @Column({ allowNull: false, type: DataType.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') })
  createdAt!: Date;

  @Column({ allowNull: false, type: DataType.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') })
  updatedAt!: Date;
}

sequelize.addModels([Book]);
