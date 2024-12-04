import axios from 'axios';
import { API_URL } from '../config/constants';
import { Establishment, EstablishmentResponse } from '../types/establishment';

interface UpdateEstablishmentData {
  name?: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
}

class EstablishmentService {
  private readonly baseURL = `${API_URL}/auth`;

  async getEstablishmentProfile(): Promise<EstablishmentResponse> {
    try {
      const response = await axios.post<EstablishmentResponse>(`${this.baseURL}/me`, {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateEstablishment(data: UpdateEstablishmentData): Promise<EstablishmentResponse> {
    try {
      const formData = new FormData();
      
      // Append text fields
      if (data.name) formData.append('name', data.name);
      if (data.description) formData.append('description', data.description);
      
      // Append files if they exist
      if (data.logo_url) formData.append('logo_url', data.logo_url);
      if (data.banner_url) formData.append('banner_url', data.banner_url);

      const response = await axios.patch<EstablishmentResponse>(`${this.baseURL}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteEstablishment(): Promise<void> {
    try {
      const response = await axios.delete(`${this.baseURL}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(email: string, googleOauthKey: string): Promise<EstablishmentResponse> {
    try {
      const response = await axios.post<EstablishmentResponse>(
        `${this.baseURL}/login`,
        {
          email,
          google_oauth_key: googleOauthKey,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(establishmentData: Establishment): Promise<EstablishmentResponse> {
    try {
      const response = await axios.post<EstablishmentResponse>(
        `${this.baseURL}/register`,
        establishmentData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      const response = await axios.get(`${this.baseURL}/logout`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data?.message || 'An error occurred',
        status: error.response?.status,
      };
    }
    return {
      error: true,
      message: 'An unexpected error occurred',
      status: 500,
    };
  }
}

export const establishmentService = new EstablishmentService(); 