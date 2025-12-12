import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './blog.module.css';

export const dynamic = 'force-dynamic'; // Fetch fresh data on every request (good for admin testing)

export const metadata = {
    title: 'Journal | VIBESTOSTARDOM',
    description: 'Insights, stories, and news from the forefront of culture.',
};

async function getPosts() {
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    return posts || [];
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className={styles.main}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>The Journal</h1>
                    <p className={styles.subtitle}>Insights on culture, music, and the business of fame.</p>
                </header>

                {posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <p>No articles published yet. Check back soon.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {posts.map((post: any, index: number) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={post.cover_image} alt={post.title} className={styles.image} />
                                </div>
                                <div className={styles.content}>
                                    <span className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</span>
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                    <p className={styles.excerpt}>{post.excerpt}</p>
                                    <span className={styles.readMore}>Read Article</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
