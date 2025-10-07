import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth:", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success('Account created successfully')
        } catch (error) {
            console.log('Error creating account:', error)
            toast.error(error.response?.data?.message || 'Signup failed')
        } finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success('Logged in successfull')
        } catch (error) {
            console.log('Error Logging in:', error)
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success('Logged out successfully')
        } catch (error) {
            console.log('Error Logging out:', error)
            toast.error(error.response.data.message)
        } 
    },
    forgotPassword: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/forgot-password", data)
            return res.data
        } catch (error) {
            console.log('Error in forgot password:', error)
            toast.error(error.response?.data?.message || 'Failed to send reset code')
            throw error;
        } 
    },
    verivyResetPassword: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/verify-reset-password", data)
            return res.data
        } catch (error) {
            console.log('Error Verifying password:', error)
            toast.error(error.response?.data?.message || 'Invalid code');
            throw error;
        } 
    },
    resetPassword: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/reset-password", data)
            return res.data
        } catch (error) {
            console.log('Error reseting password:', error)
            toast.error(error.response?.data?.message || 'Password reset failed');
            throw error;
        } 
    },

}))