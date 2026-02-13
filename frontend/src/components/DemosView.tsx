'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Image as ImageIcon, Mic, Wand2, Eye, Upload, StopCircle, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '@/types';
import { chatWithAssistant, generateImage, analyzeImage, chatWithVoiceAssistant } from '@/lib/geminiService';
import { useTranslations } from 'next-intl';

const DemosView = () => {
    const t = useTranslations('demos'); // I'll add this to translation files shortly or use direct strings for now as it was in original
    // Since I haven't added 'demos' namespace yet, let's use the strings from the original for now or add them.
    // Actually, I'll use the original strings to move faster and then i18n them if needed.

    // --- Chat State ---
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            text: 'გამარჯობა! მე ვარ AI Solutions-ის ვირტუალური ასისტენტი. როგორ შემიძლია დაგეხმაროთ დღეს?',
            timestamp: new Date()
        }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- Image Gen State ---
    const [imagePrompt, setImagePrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(false);

    // --- Vision AI State ---
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [visionPrompt, setVisionPrompt] = useState('');
    const [visionResult, setVisionResult] = useState('');
    const [isVisionLoading, setIsVisionLoading] = useState(false);

    // --- Voice AI State & Limits ---
    const [isListening, setIsListening] = useState(false);
    const [voiceTranscript, setVoiceTranscript] = useState('');
    const [voiceResponse, setVoiceResponse] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [dailyUsage, setDailyUsage] = useState(0);
    const [limitReached, setLimitReached] = useState(false);
    const MAX_DAILY_REQUESTS = 5;

    useEffect(() => {
        const today = new Date().toDateString();
        const storage = localStorage.getItem('voice_usage');

        if (storage) {
            const parsed = JSON.parse(storage);
            if (parsed.date === today) {
                setDailyUsage(parsed.count);
                if (parsed.count >= MAX_DAILY_REQUESTS) setLimitReached(true);
            } else {
                localStorage.setItem('voice_usage', JSON.stringify({ count: 0, date: today }));
                setDailyUsage(0);
            }
        } else {
            localStorage.setItem('voice_usage', JSON.stringify({ count: 0, date: today }));
        }
    }, []);

    const incrementUsage = () => {
        const today = new Date().toDateString();
        const newCount = dailyUsage + 1;
        setDailyUsage(newCount);
        localStorage.setItem('voice_usage', JSON.stringify({ count: newCount, date: today }));
        if (newCount >= MAX_DAILY_REQUESTS) setLimitReached(true);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleChatSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || isChatLoading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            text: chatInput,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setChatInput('');
        setIsChatLoading(true);

        const history = messages.map(m => ({ role: m.role, text: m.text }));
        const responseText = await chatWithAssistant(history as any, userMessage.text);

        const botMessage: ChatMessage = {
            role: 'model',
            text: responseText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsChatLoading(false);
    };

    const handleImageGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagePrompt.trim() || isImageLoading) return;

        setIsImageLoading(true);
        setGeneratedImage(null);

        const result = await generateImage(imagePrompt);
        setGeneratedImage(result);
        setIsImageLoading(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVisionAnalyze = async () => {
        if (!previewUrl || !visionPrompt.trim() || isVisionLoading) return;

        setIsVisionLoading(true);
        setVisionResult('');

        const result = await analyzeImage(previewUrl, selectedFile?.type || 'image/jpeg', visionPrompt);

        setVisionResult(result);
        setIsVisionLoading(false);
    };

    const startListening = () => {
        if (limitReached) return;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'ka-GE';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            setIsListening(true);
            setVoiceTranscript('');
            setVoiceResponse('');
            stopSpeaking();

            recognition.onresult = async (event: any) => {
                const transcript = event.results[0][0].transcript;
                setVoiceTranscript(transcript);
                setIsListening(false);
                incrementUsage();

                const response = await chatWithVoiceAssistant(transcript);
                setVoiceResponse(response);
                speak(response);
            };

            recognition.onerror = () => {
                setIsListening(false);
                alert("ხმის ამოცნობა ვერ მოხერხდა.");
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        }
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ka-GE';
            utterance.rate = 0.9;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Demo 1: Chat Assistant */}
            <div className="mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white tracking-wider">AI კონსულტანტი</h2>
                </div>

                <div className="bg-dark border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[600px] glass-panel bg-white/5 backdrop-blur-md">
                    <div className="bg-white/5 p-6 border-b border-white/10 flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-white font-sans font-medium">Gemini 2.5 Flash (ქართული ენა)</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-purple-600'}`}>
                                    {msg.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                                </div>
                                <div className={`max-w-[80%] p-5 rounded-2xl font-sans ${msg.role === 'user'
                                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-white rounded-tr-none'
                                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-none'}`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isChatLoading && (
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none">
                                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleChatSend} className="p-4 bg-white/5 border-t border-white/10">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="დასვით კითხვა..."
                                className="flex-1 bg-darker border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                disabled={isChatLoading}
                            />
                            <button
                                type="submit"
                                disabled={isChatLoading || !chatInput.trim()}
                                className="bg-primary hover:bg-indigo-600 disabled:opacity-50 text-white px-8 rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-primary/20"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Demo 2: Vision AI */}
            <div className="mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <Eye className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white tracking-wider">Vision AI (სურათის ანალიზი)</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="glass-panel p-8 rounded-[2rem] border border-white/10 bg-white/5">
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-colors cursor-pointer relative">
                                <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                {previewUrl ? <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" /> : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                        <p className="text-gray-400 font-sans">ატვირთეთ სურათი</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                value={visionPrompt}
                                onChange={(e) => setVisionPrompt(e.target.value)}
                                placeholder="რა არის გამოსახული სურათზე?"
                                className="w-full bg-darker border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:outline-none transition-all font-sans"
                            />
                            <button onClick={handleVisionAnalyze} disabled={isVisionLoading || !previewUrl || !visionPrompt.trim()} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-heading font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 disabled:opacity-50">
                                {isVisionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />} ანალიზი
                            </button>
                        </div>
                    </div>
                    <div className="glass-panel p-8 rounded-[2rem] border border-white/10 bg-white/5 min-h-[300px] flex flex-col">
                        <h3 className="text-white font-heading font-bold mb-4 uppercase tracking-wider text-xs">AI პასუხი:</h3>
                        <div className="flex-grow overflow-y-auto">
                            {isVisionLoading ? <p className="text-cyan-400 font-sans animate-pulse">აანალიზებს...</p> : visionResult ? <p className="text-gray-200 font-sans leading-relaxed">{visionResult}</p> : <p className="text-gray-500 font-sans italic">შედეგი გამოჩნდება აქ...</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 3: Image Generation */}
            <div className="mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
                        <ImageIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white tracking-wider">ვიზუალური AI (Imagen 3)</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="glass-panel p-8 rounded-[2rem] border border-white/10 bg-white/5">
                        <form onSubmit={handleImageGenerate} className="space-y-6">
                            <textarea
                                rows={4}
                                value={imagePrompt}
                                onChange={(e) => setImagePrompt(e.target.value)}
                                placeholder="A futuristic city in Georgia with neon lights..."
                                className="w-full bg-darker border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-secondary focus:outline-none transition-all resize-none font-sans"
                            ></textarea>
                            <button type="submit" disabled={isImageLoading || !imagePrompt.trim()} className="w-full bg-secondary hover:bg-fuchsia-600 text-white font-heading font-bold py-4 rounded-xl transition-all shadow-lg shadow-secondary/20 flex items-center justify-center gap-3 disabled:opacity-50">
                                {isImageLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />} გენერაცია
                            </button>
                        </form>
                    </div>
                    <div className="glass-panel p-4 rounded-[2rem] border border-white/10 bg-white/5 flex items-center justify-center min-h-[400px]">
                        {isImageLoading ? <p className="text-secondary animate-pulse">იქმნება...</p> : generatedImage ? <img src={generatedImage} alt="AI output" className="w-full rounded-2xl shadow-xl" /> : <p className="text-gray-500 font-sans">სურათი გამოჩნდება აქ</p>}
                    </div>
                </div>
            </div>

            {/* Demo 4: Voice AI */}
            <div>
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                        <Mic className="w-6 h-6 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white tracking-wider">Voice AI (ხმოვანი ასისტენტი)</h2>
                </div>

                <div className="glass-panel p-12 rounded-[3rem] border border-white/10 bg-white/5 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8 flex justify-center">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isListening ? 'bg-red-500/20 border-red-500 animate-pulse' : isSpeaking ? 'bg-green-500/20 border-green-500' : 'bg-white/5 border-white/10'}`}>
                                <Mic className={`w-10 h-10 ${isListening ? 'text-red-500' : isSpeaking ? 'text-green-500' : 'text-gray-500'}`} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-white mb-6">ისაუბრეთ ქართულად</h3>
                        <div className="min-h-[80px] mb-8">
                            {voiceResponse && <p className="text-white font-sans text-xl">"{voiceResponse}"</p>}
                            {limitReached && <p className="text-red-400 text-sm mt-4">დღიური ლიმიტი ამოწურულია.</p>}
                        </div>
                        <div className="flex justify-center gap-4">
                            <button onClick={startListening} disabled={isListening || isSpeaking || limitReached} className={`px-10 py-4 rounded-xl font-heading font-bold uppercase tracking-widest transition-all ${isListening ? 'bg-red-500 text-white' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'} disabled:opacity-50`}>
                                {isListening ? 'გისმენთ...' : 'საუბრის დაწყება'}
                            </button>
                            {isSpeaking && <button onClick={stopSpeaking} aria-label="Stop speaking" className="px-6 py-4 rounded-xl border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><StopCircle className="w-6 h-6" /></button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemosView;
