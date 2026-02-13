import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Image as ImageIcon, Mic, Wand2, Eye, Upload, Volume2, StopCircle, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithAssistant, generateImage, analyzeImage, chatWithVoiceAssistant } from '@/../services/geminiService';
import SEO from './SEO';

const Demos: React.FC = () => {
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

  // Load usage from local storage
  useEffect(() => {
    const today = new Date().toDateString();
    const storage = localStorage.getItem('voice_usage');

    if (storage) {
      const parsed = JSON.parse(storage);
      if (parsed.date === today) {
        setDailyUsage(parsed.count);
        if (parsed.count >= MAX_DAILY_REQUESTS) setLimitReached(true);
      } else {
        // Reset if new day
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

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Chat Handler ---
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
    const responseText = await chatWithAssistant(history, userMessage.text);

    const botMessage: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsChatLoading(false);
  };

  // --- Image Gen Handler ---
  const handleImageGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim() || isImageLoading) return;

    setIsImageLoading(true);
    setGeneratedImage(null);

    const result = await generateImage(imagePrompt);
    setGeneratedImage(result);
    setIsImageLoading(false);
  };

  // --- Vision AI Handler ---
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

  // --- Voice AI Logic ---
  const startListening = () => {
    if (limitReached) return;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ka-GE'; // Georgian language
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setVoiceTranscript('');
      setVoiceResponse('');
      stopSpeaking(); // Stop any current speech

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceTranscript(transcript);
        setIsListening(false);

        // Increment usage
        incrementUsage();

        // Send to AI
        const response = await chatWithVoiceAssistant(transcript);
        setVoiceResponse(response);
        speak(response);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        alert("ხმის ამოცნობა ვერ მოხერხდა. გთხოვთ შეამოწმოთ მიკროფონი.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("თქვენს ბრაუზერს არ აქვს ხმოვანი მხარდაჭერა. გთხოვთ გამოიყენოთ Google Chrome.");
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any previous speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      // Try to find a Georgian voice, fallback to default
      // Note: Most browsers don't have native Georgian TTS, so it might sound robotic or use a fallback language accent.
      utterance.lang = 'ka-GE';
      utterance.rate = 0.9; // Slightly slower for better clarity

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

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
    <section className="pt-40 pb-24 bg-darker min-h-screen relative">
      <SEO title="Live Demos — IMI.GE" description="Explore our interactive AI and web development demos." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs font-heading font-bold tracking-[0.2em] text-gray-400 uppercase">ინტერაქტიული დემოები</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-widest glow-text">
            გამოცადე <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">მომავალი</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sans font-light leading-relaxed tracking-wide">
            ნახეთ ჩვენი ტექნოლოგიები მოქმედებაში. ესაუბრეთ AI-ს, შექმენით სურათები და გაეცანით ხმოვან შესაძლებლობებს.
          </p>
        </div>

        {/* Demo 1: Chat Assistant */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white tracking-wider">AI კონსულტანტი</h2>
          </div>

          <div className="bg-dark border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[600px] glass-panel">
            <div className="bg-white/5 p-6 border-b border-white/10 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-sans font-medium">Gemini 2.5 Flash (ქართული ენა)</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-dark to-darker">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-purple-600'
                    }`}>
                    {msg.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                  </div>
                  <div className={`max-w-[80%] p-5 rounded-2xl font-sans ${msg.role === 'user'
                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-white rounded-tr-none'
                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-none'
                    }`}>
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
                  className="flex-1 bg-dark border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                  disabled={isChatLoading}
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="bg-primary hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 rounded-xl transition-colors flex items-center justify-center"
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
            <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
              <Eye className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white tracking-wider">Vision AI (სურათის ანალიზი)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="glass-panel p-8 rounded-[2rem] border border-white/10">
              <div className="space-y-6">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-gray-400 font-sans">ატვირთეთ სურათი</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-heading font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">კითხვა სურათის შესახებ</label>
                  <input
                    type="text"
                    value={visionPrompt}
                    onChange={(e) => setVisionPrompt(e.target.value)}
                    placeholder="რა არის გამოსახული სურათზე?"
                    className="w-full bg-darker/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all placeholder-gray-600 font-sans"
                  />
                </div>

                <button
                  onClick={handleVisionAnalyze}
                  disabled={isVisionLoading || !previewUrl || !visionPrompt.trim()}
                  className="w-full bg-accent hover:bg-cyan-600 text-white font-heading font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/25 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVisionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />}
                  ანალიზი
                </button>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[2rem] border border-white/10 bg-darker/50 flex flex-col">
              <h3 className="text-white font-heading font-bold mb-4 uppercase tracking-wider text-sm">AI პასუხი:</h3>
              <div className="flex-grow overflow-y-auto">
                {isVisionLoading ? (
                  <div className="flex items-center gap-3 text-gray-400 font-sans animate-pulse">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI აანალიზებს პიქსელებს...
                  </div>
                ) : visionResult ? (
                  <p className="text-gray-200 font-sans leading-relaxed whitespace-pre-wrap">{visionResult}</p>
                ) : (
                  <p className="text-gray-500 font-sans italic">შედეგი გამოჩნდება აქ...</p>
                )}
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
            <div className="glass-panel p-8 rounded-[2rem] border border-white/10">
              <form onSubmit={handleImageGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-heading font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">აღწერეთ სურათი (ინგლისურად)</label>
                  <textarea
                    rows={4}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="A futuristic city in Georgia with neon lights and flying cars..."
                    className="w-full bg-darker/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all placeholder-gray-600 resize-none font-sans"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isImageLoading || !imagePrompt.trim()}
                  className="w-full bg-secondary hover:bg-fuchsia-600 text-white font-heading font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-secondary/25 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isImageLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                  გენერაცია
                </button>
              </form>
            </div>

            <div className="glass-panel p-4 rounded-[2rem] border border-white/10 flex items-center justify-center min-h-[400px] bg-darker/50 relative overflow-hidden">
              {isImageLoading ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400 font-sans animate-pulse">AI ქმნის თქვენს შედევრს...</p>
                </div>
              ) : generatedImage ? (
                <img src={generatedImage} alt="Generated by AI" className="w-full h-full object-cover rounded-2xl shadow-2xl" />
              ) : (
                <div className="text-center text-gray-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="font-sans">სურათი გამოჩნდება აქ</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demo 4: Voice AI (Interactive) */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <Mic className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white tracking-wider">Voice AI (ხმოვანი ასისტენტი)</h2>
          </div>

          <div className="glass-panel p-12 rounded-[2rem] border border-white/10 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-primary/5"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Limit Indicator */}
              <div className="absolute top-0 right-0 bg-white/5 px-4 py-2 rounded-bl-2xl border-b border-l border-white/10">
                <span className={`text-xs font-heading font-bold tracking-wider ${limitReached ? 'text-red-400' : 'text-green-400'}`}>
                  ლიმიტი: {dailyUsage}/{MAX_DAILY_REQUESTS}
                </span>
              </div>

              <div className="flex justify-center items-center gap-2 mb-8 h-24">
                {isListening || isSpeaking ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 bg-green-500 rounded-full animate-pulse" style={{
                      height: `${Math.random() * 60 + 20}px`,
                      animationDuration: `${Math.random() * 0.3 + 0.2}s`
                    }}></div>
                  ))
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Mic className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </div>

              <h3 className="text-3xl font-heading font-bold text-white mb-6">ისაუბრეთ ბუნებრივად</h3>

              <div className="min-h-[60px] mb-8">
                {voiceTranscript && <p className="text-gray-400 font-sans text-sm mb-2">თქვენ: "{voiceTranscript}"</p>}
                {voiceResponse && <p className="text-white font-sans text-lg">AI: "{voiceResponse}"</p>}
                {limitReached && (
                  <div className="flex items-center justify-center gap-2 text-red-400 mt-4">
                    <AlertTriangle className="w-5 h-5" />
                    <p className="font-sans text-sm">დღიური ლიმიტი ამოწურულია. სცადეთ ხვალ.</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={startListening}
                  disabled={isListening || isSpeaking || limitReached}
                  className={`px-10 py-4 rounded-xl font-heading font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 ${limitReached
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
                    }`}
                >
                  <Mic className="w-5 h-5" />
                  {isListening ? 'გისმენთ...' : 'საუბრის დაწყება'}
                </button>

                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="px-6 py-4 rounded-xl border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <StopCircle className="w-6 h-6" />
                  </button>
                )}
              </div>

              <p className="mt-6 text-xs text-gray-500 font-sans">
                * მუშაობს Chrome ბრაუზერში. დააჭირეთ ღილაკს და დასვით კითხვა ქართულად.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Demos;
