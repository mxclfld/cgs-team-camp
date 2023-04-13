import { AxiosStatic } from 'axios';

export interface IHttpService {
  baseUrl: string;
  fetchingService: AxiosStatic;
  apiVersion: string;
}
