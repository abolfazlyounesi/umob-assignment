import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.200.252:1337/api/",
});

export const ApiService = {
  async login(data: any) {
    const res = await axiosInstance.post("auth/local", data);
    return res.data;
  },
  async register(data: any) {
    const res = await axiosInstance.post("auth/local/register", data);
    return res.data;
  },
  async getGameData() {
    const res = await axiosInstance.get("game");
    return res.data;
  },
  // async refreshToken(data: { token: string }) {},
};
