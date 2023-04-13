import axios, { AxiosRequestHeaders } from 'axios';
import { ITodoBody } from '../../todo/types/todoBody.type';
import { IChangePasswordBody, IUserBody } from '../../auth/types/auth.type';
import { APP_KEYS } from '../consts';

export class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_BASE_URL,
    public fetchingService = axios,
    public apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: `Bearer ${localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN)}`
    };
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...pureConfig
  }: {
    data?: ITodoBody | IUserBody | IChangePasswordBody;
    url: string;
    headers?: AxiosRequestHeaders;
  }) {
    return pureConfig;
  }

  async get(config: { url: string; headers?: AxiosRequestHeaders }) {
    config.headers = {
      ...config.headers,
      ...this.populateTokenToHeaderConfig()
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.get(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async post(config: { data: ITodoBody | IUserBody; url: string; headers?: AxiosRequestHeaders }) {
    config.headers = {
      ...config.headers,
      ...this.populateTokenToHeaderConfig()
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async put(config: {
    data: ITodoBody | IUserBody | IChangePasswordBody;
    url: string;
    headers?: AxiosRequestHeaders;
  }) {
    config.headers = {
      ...config.headers,
      ...this.populateTokenToHeaderConfig()
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.put(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async patch(config: { url: string; headers?: AxiosRequestHeaders }) {
    config.headers = {
      ...config.headers,
      ...this.populateTokenToHeaderConfig()
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.patch(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async delete(config: { url: string; headers?: AxiosRequestHeaders }) {
    config.headers = {
      ...config.headers,
      ...this.populateTokenToHeaderConfig()
    } as AxiosRequestHeaders;
    const response = await this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }
}
