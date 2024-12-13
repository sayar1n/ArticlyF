import { AxiosError } from 'axios';

export const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return 'Неверный email или пароль';
      case 400:
        return 'Неверные данные';
      case 500:
        return 'Ошибка сервера';
      default:
        return 'Что-то пошло не так';
    }
  }
  return 'Ошибка соединения с сервером';
};