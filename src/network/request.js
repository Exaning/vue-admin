import axios from "axios";

// function request() {}

export function request_2(config) {
  const instance = axios.create({
    baseURL: "https://ku.qingnian8.com/dataApi/vueadmin",
    timeout: 7000,
  });

  return instance(config);
}
