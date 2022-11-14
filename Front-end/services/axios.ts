import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { 'nextauth.access_token': access_token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 1000,
  })

  // Adiciona um interceptador na requisição
  api.interceptors.request.use(function (config) {
    // console.log(config);

    // Faz alguma coisa antes da requisição ser enviada
    return config;
  }, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
  });

  if (access_token) {
    api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return api;
}