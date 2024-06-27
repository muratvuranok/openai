import { IBaseEntity } from "../../models/core/IBaseEntity";
import { Result } from "../../models/core/Result";

export interface IBaseService<T extends IBaseEntity> {
  /**
   * get all items
   */
  getAll(url: string): Promise<Result<T[]>>;

  /**
   * get item by id
   * @param id
   */
  get(id: number): Promise<Result<T>>;

  /**
   * Create new item
   * @param entity
   */
  add(entity: T): Promise<Result<T>>;

  /**
   * delete item by id
   * @param id
   */
  delete(id: number): Promise<Result<T>>;

  /**
   * update item by id
   * @param id
   * @param entity
   */
  update(id: number, entity: T): Promise<Result<T>>;
}
