"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from '@/components/Admin/admin.module.css';

export default function AdminLogin() {
    const router = useRouter();
    const [status, setStatus] = useState('idle');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
            setStatus('idle');
        } else {
            // Success! Supabase automatically handles the session in local storage
            router.push('/admin');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginCard} onSubmit={handleLogin}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>VTS Admin</h2>

                {errorMsg && (
                    <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {errorMsg}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="admin@vibestostardom.com"
                    className={styles.loginInput}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.loginInput}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.loginBtn} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Authenticating...' : 'Enter Dashboard'}
                </button>
            </form>
        </div>
    );
}
