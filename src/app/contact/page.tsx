import ContactForm from '@/components/ContactForm/ContactForm';

export const metadata = {
    title: 'Contact | VIBESTOSTARDOM',
    description: 'Reat out to us. Let\'s create something legendary together.',
};

export default function ContactPage() {
    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h1 className="reveal in-view" style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: '800',
                        marginBottom: 'var(--spacing-sm)',
                        fontFamily: 'var(--font-family-art)',
                        textTransform: 'uppercase'
                    }}>
                        Get In Touch
                    </h1>
                    <p className="reveal stagger-1 in-view" style={{ fontSize: '1.25rem', color: '#666' }}>
                        Whether you’re a talent seeking management or a brand looking for partnership, starts here.
                    </p>
                </div>

                <div className="reveal stagger-2 in-view">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}
