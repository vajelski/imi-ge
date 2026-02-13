import React from 'react';
import { Link } from '@/i18n/routing';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {

    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-darker transition-colors duration-300 px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="text-center relative z-10 max-w-2xl mx-auto">
                <h1 className="text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 select-none">
                    404
                </h1>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                    გვერდი არ მოიძებნა
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 font-sans leading-relaxed">
                    სამწუხაროდ, გვერდი რომელსაც ეძებთ არ არსებობს, გადატანილია, ან დროებით მიუწვდომელია.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* Back button removed - not needed in Next.js */}

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-2xl font-heading font-medium transition-colors shadow-lg shadow-primary/20"
                    >
                        <Home className="w-5 h-5" />
                        მთავარი გვერდი
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
