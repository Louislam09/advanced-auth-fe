'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signup } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SignUpProps = object


export default function SignUp({ }: SignUpProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter()

    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        // uppercase: false,
        // lowercase: false,
        // number: false,
        // special: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signup(name, email, password);
            console.log(response)
            setSuccess('Signup successful! Please check your email to verify your account.');
            setError('');
            setTimeout(() => router.push('/verify-email'), 2000)
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'An error occurred during signup.');
            setSuccess('');
        }
    };

    const checkPasswordStrength = (password: string) => {
        setPassword(password)
        setPasswordStrength({
            length: password.length >= 4,
            // uppercase: /[A-Z]/.test(password),
            // lowercase: /[a-z]/.test(password),
            // number: /[0-9]/.test(password),
            // special: /[^A-Za-z0-9]/.test(password),
        })
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-blue-500">{success}</p>}
            <Input
                className='text-black'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                className='text-black'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                className='text-black'
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                required
            />
            <div className="text-sm">
                <p>Password strength:</p>
                <ul>
                    <li className={passwordStrength.length ? 'text-blue-500' : 'text-red-500'}>At least 4 characters</li>
                    {/* <li className={passwordStrength.uppercase ? 'text-blue-500' : 'text-red-500'}>Contains uppercase letter</li>
                    <li className={passwordStrength.lowercase ? 'text-blue-500' : 'text-red-500'}>Contains lowercase letter</li>
                    <li className={passwordStrength.number ? 'text-blue-500' : 'text-red-500'}>Contains a number</li>
                    <li className={passwordStrength.special ? 'text-blue-500' : 'text-red-500'}>Contains special character</li> */}
                </ul>
            </div>
            <Button type='submit' className="w-full bg-blue-500 hover:bg-blue-600">Sign Up</Button>
            <p className="text-center">
                Already have an account?{' '}
                <button type="button" onClick={() => router.push('/login')} className="text-blue-400 hover:underline">
                    Log in
                </button>
            </p>
        </form>
    )
}