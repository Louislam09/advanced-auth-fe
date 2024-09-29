'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPassword } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { token } = params
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await resetPassword(token, newPassword);
            console.log(response)
            setSuccess('Password reset successfully. You can now log in with your new password.');
            setError('');
            setTimeout(() => router.push('/login'), 2000)
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'An error occurred while resetting your password.');
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-blue-500">{success}</p>}
            <p className="text-center text-gray-400">
                Enter your new password
            </p>
            <Input
                className='text-black'
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <Button type='submit' className="w-full bg-blue-500 hover:bg-blue-600">Set New Password</Button>
        </form>
    );
}