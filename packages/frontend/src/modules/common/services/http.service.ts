import axios, { AxiosRequestHeaders } from 'axios';
import { ITodoBody } from '../../todo/types/todoBody.type';

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
