import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            toast.dismiss();
            toast.info('Please wait while we process your request.');
            const response = await axios.post('http://localhost:5000/user/forgotPassword', { email });
            console.log(response);

            if (response.data.success) {
                setShowOtpForm(true);
                setEmail('');
                toast.success(response.data.message);
            } else {
                toast.dismiss();
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Failed to send OTP: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/user/resetPassword', { otp, password });
            console.log(response);

            if (response.data.success) {
                toast.success(response.data.message);
                router.push('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Password reset failed:', error);
            toast.error('Password reset failed. Please try again.');
        }
    };

    if (showOtpForm) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-black">
                <form className="w-96" onSubmit={handleOtpSubmit}>
                    <input
                        className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                        className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                    Reset
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-black">
            <h1 className="text-3xl font-bold mb-6 text-white">Reset Password</h1>
            <form className="w-96" onSubmit={handleResetPassword}>
                <input
                    className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''
                        }`}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
