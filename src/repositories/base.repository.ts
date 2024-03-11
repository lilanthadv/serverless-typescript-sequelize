import { UpdateOptions, DestroyOptions } from 'sequelize';
import { Model, ModelCtor, IndexOptions } from 'sequelize-typescript';

export class BaseRepository<T extends Model> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  public async create(data: any): Promise<T> {
    return this.model.create(data);
  }

  public async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  public async findById(id: number): Promise<T | null> {
    const options: IndexOptions = { where: { id } };
    return this.model.findOne(options);
  }

  public async update(id: number, data: any): Promise<[affectedCount: number]> {
    const options: UpdateOptions = { where: { id } };
    return this.model.update(data, options);
  }

  public async delete(id: number): Promise<number> {
    const options: DestroyOptions = { where: { id } };
    return await this.model.destroy(options);
  }
}