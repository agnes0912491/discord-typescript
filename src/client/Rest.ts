import axios, { AxiosRequestConfig } from "axios";
import { HttpMethod } from "../types";

class Rest {
  private baseUrl: string;
  private token: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.headers = {
      Authorization: `Bot ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    url: string,
    method: HttpMethod,
    data?: any
  ): Promise<T> {
    const requestOptions: AxiosRequestConfig = {
      method,
      headers: this.headers,
      data: JSON.stringify(data),
    };
 
    const response = await axios({ url, ...requestOptions });
    const responseData: any = response.data;
    return responseData;
  }

  public async getApplicationInfo(): Promise<object> {
    const response: any = await this.get(`/oauth2/applications/@me`);
    return {
      id: response.id,
      bot: response.bot
    };
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    const queryString = params ? new URLSearchParams(params).toString() : "";
    const fullUrl = `${this.baseUrl}${url}?${queryString}`;
    return await this.request<T>(fullUrl, "GET");
  }

  public async post<T>(url: string, data?: any): Promise<T> { 
    return await this.request<T>(`${this.baseUrl}${url}`, "POST", data);
  }

  public async patch<T>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, "PATCH", data);
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, "PUT", data);
  }

  public async delete<T>(url: string, params?: any): Promise<T> {
    const queryString = params ? new URLSearchParams(params).toString() : "";
    const fullUrl = `$${url}?${queryString}`;
    return this.request<T>(fullUrl, "DELETE");
  }
}

export default Rest;
