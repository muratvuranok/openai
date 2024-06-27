import http from "../../../common/utils/api";
import { IBaseEntity } from "../../models/core/IBaseEntity";
import { Result } from "../../models/core/Result";
import BaseResults from "./BaseResult";
import { IBaseService } from "./IBaseService";

export class BaseService<T extends IBaseEntity> implements IBaseService<T> {
  private _url: string;
  constructor(url: string) {
    this._url = url;
  }

  handels = new BaseResults<T>();

  async get(id: number): Promise<Result<T>> {
    try {
      const response = await http.get<T>(`${this._url}/${id}`);
      return this.handels.handleResponse(response.data);
    } catch (error: any) {
      return this.handels.handleError(error);
    }
  }

  async getAll(url:string): Promise<Result<T[]>> {
    try {
      const response = await http.get<T[]>(`${this._url}/${url}`); 
      return this.handels.handleResponse(response.data);
    } catch (error: any) {
      return this.handels.handleError(error);
    }
  }

  async add(entity: T): Promise<Result<T>> {
    try {
      const response = await http.post<T>(`${this._url}`, entity);
      return this.handels.handleResponse(response.data);
    } catch (error: any) {
      return this.handels.handleError(error);
    }
  }

  async update(id: number, entity: T): Promise<Result<T>> {
    try {
      const response = await http.patch<T>(`${id}`, entity);
      return this.handels.handleResponse(response.data);
    } catch (error: any) {
      return this.handels.handleError(error);
    }
  }

  async delete(id: number): Promise<Result<T>> { 
    try {
      const response = await http.delete<T>(`${this._url}/${id}`);
      return this.handels.handleResponse(response.data);
    } catch (error: any) {
      console.log(error);
      return this.handels.handleError(error);
    }
  }
}
