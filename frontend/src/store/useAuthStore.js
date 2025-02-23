import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      // const res = await axiosInstance.get("/auth/check");
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false }); //loading state
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data, {
        withCredentials: true,
      });

      // const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      // console.log("Signup Error:", error.response?.data || error.message);
      toast.error(error.response.data.message);

      // Improved error handling
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please check your connection.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({  isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login",data,{
        withCredentials: true,})
        set({ authUser: res.data })
        toast.success("Login successfully");
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      set({  isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", {
        withCredentials: true,
      });
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  },

}));
