'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { forgotPassword } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ForgotPasswordProps = object

export default function ForgotPassword({ }: ForgotPasswordProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await forgotPassword(email);
            console.log(response)
            setSuccess('Password reset email sent successfully. Please check your inbox.');
            setError('');
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'An error occurred while processing your request.');
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-blue-500">{success}</p>}
            <p className="text-center text-gray-400">
                Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
            <Input
                className='text-black'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type='submit' className="w-full bg-blue-500 hover:bg-blue-600">Send Reset Link</Button>
            <button type="button" onClick={() => router.push('/login')} className="text-blue-400 hover:underline block w-full text-center">
                Back to Login
            </button>
        </form>
    )
}