import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './post.module.css';

export const revalidate = 60;

// Remove generateStaticParams for dynamic DB fetching unless we implement full build-time generation logic
// For simplicity with DB, we'll let Next.js handle it dynamically on request (+ revalidation)

async function getPost(slug: string) {
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    return post;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <main className={styles.main} style={{ textAlign: 'center', paddingTop: '20vh' }}>
                <h1>Post not found</h1>
                <Link href="/blog" style={{ textDecoration: 'underline' }}>Return to Journal</Link>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <article className={styles.article}>
                <header className={styles.header}>
                    <Link href="/blog" className={styles.backLink}>← Back to Journal</Link>
                    <div className={styles.meta}>
                        <span className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span className={styles.tag}>Editorial</span>
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                </header>

                {post.cover_image && (
                    <div className={styles.heroImageWrapper}>
                        <img src={post.cover_image} alt={post.title} className={styles.heroImage} />
                    </div>
                )}

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <footer className={styles.footer}>
                    <div className={styles.share}>
                        <span>Share this article</span>
                    </div>
                </footer>
            </article>
        </main>
    );
}
