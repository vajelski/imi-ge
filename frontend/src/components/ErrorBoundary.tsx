import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darker transition-colors duration-300 p-4">
                    <div className="text-center max-w-lg">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
                            <AlertOctagon className="w-10 h-10 text-red-500" />
                        </div>

                        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                            დაფიქსირდა შეცდომა
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 mb-8 font-sans leading-relaxed">
                            სამწუხაროდ, პროგრამაში მოხდა გაუთვალისწინებელი შეცდომა. ჩვენი გუნდი უკვე მუშაობს პრობლემის აღმოფხვრაზე.
                        </p>

                        {this.state.error && (
                            <div className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg text-left mb-8 overflow-auto max-h-40 text-xs font-mono text-gray-500">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-indigo-600 text-white rounded-xl font-heading font-medium transition-colors shadow-lg shadow-primary/20"
                        >
                            <RefreshCw className="w-5 h-5" />
                            გვერდის გადატვირთვა
                        </button>
                    </div>
                </div>
            );
        }

        return (this as any).props.children;
    }
}

export default ErrorBoundary;
