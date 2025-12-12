"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [posts, setPosts] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [view, setView] = useState<'dashboard' | 'create' | 'messages'>('dashboard');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check Session & Fetch data on load
    useEffect(() => {
        checkUser();
        fetchPosts();
        fetchMessages();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push('/admin/login');
        }
    };

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (data) setPosts(data);
        setLoading(false);
    };

    const fetchMessages = async () => {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (data) setMessages(data);
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); // Simple slugify
        const excerpt = (form.elements.namedItem('excerpt') as HTMLInputElement).value;
        const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value; // Simple HTML or text
        const cover_image = (form.elements.namedItem('cover_image') as HTMLInputElement).value;

        const { error } = await supabase
            .from('posts')
            .insert([{ 
                title, 
                slug, 
                excerpt, 
                content: `<p>${content.replace(/\n/g, '</p><p>')}</p>`, // Basic paragraph formatting
                cover_image,
                published: true 
            }]);

        if (!error) {
            await fetchPosts();
            setView('dashboard');
        } else {
            alert('Error creating post: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.brand}>VTS Admin</div>
                <nav className={styles.nav}>
                    <div 
                        className={`${styles.navItem} ${view === 'dashboard' ? styles.active : ''}`}
                        onClick={() => setView('dashboard')}
                    >
                        Posts
                    </div>
                    <div 
                        className={`${styles.navItem} ${view === 'messages' ? styles.active : ''}`}
                        onClick={() => setView('messages')}
                    >
                        Messages
                        {messages.length > 0 && <span style={{marginLeft:'auto', background:'red', color:'white', fontSize:'0.7rem', padding:'2px 6px', borderRadius:'10px'}}>{messages.length}</span>}
                    </div>
                    <div 
                        className={`${styles.navItem} ${view === 'create' ? styles.active : ''}`}
                        onClick={() => setView('create')}
                    >
                        New Post
                    </div>
                    <button 
                        className={styles.navItem} 
                        onClick={async () => {
                            await supabase.auth.signOut();
                            router.push('/admin/login');
                        }}
                        style={{marginTop: 'auto', background: 'none', border: 'none', textAlign: 'left', color: 'inherit', font: 'inherit'}}
                    >
                        Sign Out
                    </button>
                    <Link href="/" className={styles.navItem} style={{opacity: 0.5}}>Exit to Site</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                
                {view === 'dashboard' && (
                    <>
                        <header className={styles.header}>
                            <h1 className={styles.title}>Blog Posts</h1>
                            <button className={styles.createBtn} onClick={() => setView('create')}>+ New Post</button>
                        </header>

                        <div className={styles.tableSection}>
                            <div className={styles.tableHeader}>
                                <h3>Published Articles</h3>
                            </div>
                            <div>
                                {loading ? <p>Loading...</p> : posts.map(post => (
                                    <div key={post.id} className={styles.postItem}>
                                        <div>
                                            <div style={{fontWeight: '600'}}>{post.title}</div>
                                            <div style={{fontSize: '0.8rem', color: '#999'}}>
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
                                            <span className={`${styles.status} ${styles.published}`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                            <button 
                                                style={{fontSize:'0.8rem', color:'red', background:'none', border:'none', cursor:'pointer'}}
                                                onClick={async () => {
                                                    if(confirm('Delete?')) {
                                                        await supabase.from('posts').delete().eq('id', post.id);
                                                        fetchPosts();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {posts.length === 0 && !loading && <p style={{color:'#999'}}>No posts found.</p>}
                            </div>
                        </div>
                    </>
                )}

                {view === 'messages' && (
                    <>
                        <header className={styles.header}>
                            <h1 className={styles.title}>Inbox</h1>
                        </header>

                        <div className={styles.tableSection}>
                            {messages.length === 0 ? (
                                <p style={{padding:'2rem', textAlign:'center', color:'#999'}}>No messages yet.</p>
                            ) : (
                                messages.map(msg => (
                                    <div key={msg.id} style={{padding:'1.5rem', borderBottom:'1px solid #eee'}}>
                                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                                            <span style={{fontWeight:'700', fontSize:'1.1rem'}}>{msg.subject || 'No Subject'}</span>
                                            <span style={{fontSize:'0.8rem', color:'#999'}}>{new Date(msg.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{fontSize:'0.9rem', color:'#555', marginBottom:'1rem'}}>
                                            From: <span style={{color:'black', fontWeight:'500'}}>{msg.name}</span> ({msg.email})
                                        </div>
                                        <div style={{background:'#fafafa', padding:'1rem', borderRadius:'4px', lineHeight:'1.5'}}>
                                            {msg.message}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {view === 'create' && (
                    <>
                        <header className={styles.header}>
                            <h1 className={styles.title}>Create New Post</h1>
                            <button className={styles.createBtn} style={{background: 'white', color: 'black', border:'1px solid #ccc'}} onClick={() => setView('dashboard')}>Cancel</button>
                        </header>
                        
                        <form className={styles.tableSection} onSubmit={handleCreatePost}>
                            <div style={{marginBottom: '1.5rem'}}>
                                <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Title</label>
                                <input name="title" required className={styles.loginInput} placeholder="Post Title" />
                            </div>
                            <div style={{marginBottom: '1.5rem'}}>
                                <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Cover Image URL</label>
                                <input name="cover_image" required className={styles.loginInput} placeholder="https://..." />
                            </div>
                            <div style={{marginBottom: '1.5rem'}}>
                                <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Excerpt (Short Description)</label>
                                <input name="excerpt" required className={styles.loginInput} placeholder="A brief summary..." />
                            </div>
                            <div style={{marginBottom: '1.5rem'}}>
                                <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Content</label>
                                <textarea name="content" required className={styles.loginInput} style={{minHeight: '300px', resize:'vertical'}} placeholder="Write your article here..." />
                            </div>
                            <button type="submit" className={styles.createBtn} disabled={loading}>
                                {loading ? 'Publishing...' : 'Publish Post'}
                            </button>
                        </form>
                    </>
                )}

            </main>
        </div>
    );
}
