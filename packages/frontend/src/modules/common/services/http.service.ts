import axios, { AxiosRequestHeaders, AxiosStatic } from 'axios';
import { IHttpService } from '../types/httpService.types';
import { ITodoBody } from '../../todo/types/todoBody.type';

export class HttpService implements IHttpService {
  constructor(
    baseUrl = process.env.REACT_APP_BASE_URL || 'https://localhost:4200',
    fetchingService = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  baseUrl: string;

  fetchingService: AxiosStatic;

  apiVersion: string;

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: localStorage.getItem('token')
    };
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...pureConfig
  }: {
    data?: ITodoBody;
    url: string;
    headers?: AxiosRequestHeaders;
  }) {
    return pureConfig;
  }

  async get(config: { url: string }) {
    const response = await this.fetchingService.get(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async post(config: { data: ITodoBody; url: string }) {
    const response = await this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async put(config: { data: ITodoBody; url: string }) {
    const response = await this.fetchingService.put(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async patch(config: { url: string }) {
    const response = await this.fetchingService.patch(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async delete(config: { url: string; headers?: AxiosRequestHeaders }) {
    const response = await this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }
}
