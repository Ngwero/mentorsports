"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, X, Send, RotateCcw, Sparkles } from "lucide-react";
import { faqItems, faqTopics, type FaqItem } from "@/data/content";
import { resolveQuestion } from "@/lib/faqMatcher";

type OnboardingStep = "name" | "phone" | "referral" | "done";

interface UserProfile {
  name: string;
  phone: string;
  referral: string;
}

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  link?: { label: string; href: string };
  suggestions?: FaqItem[];
}

const introMessage: ChatMessage = {
  id: "intro",
  role: "bot",
  text: "Hi! 👋 Welcome to Mentor Sports International Academy. Before we get started, may I have your name?",
};

function getSuggestions(currentIds: string[], askedIds: Set<string>): FaqItem[] {
  return faqItems
    .filter((item) => !currentIds.includes(item.id) && !askedIds.has(item.id))
    .slice(0, 3);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9;
}

function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start faq-message-in">
      <div className="flex items-end gap-2">
        <div className="w-7 h-7 rounded-full bg-ms-blue flex items-center justify-center shrink-0 overflow-hidden">
          <Image src="/logo.png" alt="" width={20} height={20} className="object-contain" />
        </div>
        <div className="bg-white border border-ms-border rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
          <span className="faq-typing-dot w-2 h-2 rounded-full bg-ms-blue/50" />
          <span className="faq-typing-dot w-2 h-2 rounded-full bg-ms-blue/50" />
          <span className="faq-typing-dot w-2 h-2 rounded-full bg-ms-blue/50" />
        </div>
      </div>
    </div>
  );
}

export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [askedIds, setAskedIds] = useState<Set<string>>(new Set());
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("name");
  const [profile, setProfile] = useState<UserProfile>({ name: "", phone: "", referral: "" });
  const [messages, setMessages] = useState<ChatMessage[]>([introMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOnboarding = onboardingStep !== "done";

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, open, scrollToBottom]);

  useEffect(() => {
    if (open) {
      setHasOpened(true);
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [open, onboardingStep]);

  const resetChat = () => {
    setMessages([introMessage]);
    setAskedIds(new Set());
    setActiveTopic(null);
    setInput("");
    setIsTyping(false);
    setOnboardingStep("name");
    setProfile({ name: "", phone: "", referral: "" });
  };

  const appendUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text },
    ]);
  };

  const appendBotMessage = (text: string, suggestions?: FaqItem[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        role: "bot",
        text,
        suggestions,
      },
    ]);
  };

  const sendBotMessage = useCallback(
    (text: string, suggestions?: FaqItem[], delay = 700) => {
      setIsTyping(true);
      window.setTimeout(() => {
        setIsTyping(false);
        appendBotMessage(text, suggestions);
      }, delay + Math.random() * 300);
    },
    []
  );

  const sendBotReply = useCallback(
    (response: ReturnType<typeof resolveQuestion>) => {
      setIsTyping(true);

      window.setTimeout(() => {
        setIsTyping(false);

        const newAskedIds = response.faqIds;
        if (newAskedIds.length > 0) {
          setAskedIds((prev) => {
            const next = new Set(prev);
            newAskedIds.forEach((id) => next.add(id));
            return next;
          });
        }

        const updatedAsked = new Set([...askedIds, ...newAskedIds]);
        const suggestions = getSuggestions(newAskedIds, updatedAsked);

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: response.text,
            link: response.link,
            suggestions: suggestions.length > 0 ? suggestions : undefined,
          },
        ]);
      }, 700 + Math.random() * 400);
    },
    [askedIds]
  );

  const handleOnboardingInput = (text: string) => {
    appendUserMessage(text);
    setInput("");

    if (onboardingStep === "name") {
      if (!isValidName(text)) {
        sendBotMessage("Please enter your full name so we know how to address you.");
        return;
      }
      const name = text.trim();
      setProfile((prev) => ({ ...prev, name }));
      setOnboardingStep("phone");
      sendBotMessage(`Thanks, ${name}! What's your phone number so we can reach you if needed?`);
      return;
    }

    if (onboardingStep === "phone") {
      if (!isValidPhone(text)) {
        sendBotMessage("Please enter a valid phone number (at least 9 digits), e.g. +256 772 404 723.");
        return;
      }
      const phone = text.trim();
      setProfile((prev) => ({ ...prev, phone }));
      setOnboardingStep("referral");
      sendBotMessage(
        "Almost done! How did you hear about Mentor Sports? (e.g. TikTok, Instagram, friend, school event)"
      );
      return;
    }

    if (onboardingStep === "referral") {
      const referral = text.trim();
      const name = profile.name;
      setProfile((prev) => ({ ...prev, referral }));
      setOnboardingStep("done");
      sendBotMessage(
        `Perfect, ${name}! How can I help you today? Ask about trials, fees, schedules, girls' teams, and more.`,
        faqItems.slice(0, 3),
        900
      );
    }
  };

  const handleQuestion = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    if (isOnboarding) {
      handleOnboardingInput(trimmed);
      return;
    }

    appendUserMessage(trimmed);
    setInput("");
    sendBotReply(resolveQuestion(trimmed));
  };

  const handleFaqSelect = (faq: FaqItem, displayText?: string) => {
    if (isTyping || isOnboarding) return;
    const text = displayText ?? faq.question;
    appendUserMessage(text);
    sendBotReply({
      text: faq.answer,
      link: faq.link,
      faqIds: [faq.id],
    });
  };

  const handleTopicSelect = (topicId: string) => {
    if (isOnboarding) return;
    setActiveTopic(activeTopic === topicId ? null : topicId);
  };

  const showWelcomeExtras =
    onboardingStep === "done" && messages.length <= 3 && !isTyping;

  const inputPlaceholder =
    onboardingStep === "name"
      ? "Enter your name..."
      : onboardingStep === "phone"
        ? "Enter your phone number..."
        : onboardingStep === "referral"
          ? "TikTok, Instagram, friend..."
          : isTyping
            ? "Assistant is typing..."
            : "Ask about trials, fees, schedules...";

  const inputType = onboardingStep === "phone" ? "tel" : "text";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`faq-chat-toggle fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-ms-red text-white px-4 py-3 rounded-full shadow-lg hover:bg-ms-red-dark hover:scale-105 active:scale-95 transition-all ${
          !open && !hasOpened ? "faq-chat-toggle-pulse" : ""
        }`}
        aria-label={open ? "Close help chat" : "Open help chat"}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="text-sm font-semibold pr-1">{open ? "Close" : "Ask us"}</span>
      </button>

      <div
        className={`faq-chat-panel fixed bottom-20 right-5 z-50 w-[min(100vw-2.5rem,400px)] bg-white rounded-2xl shadow-2xl border border-ms-border overflow-hidden transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        role="dialog"
        aria-label="FAQ assistant"
        aria-hidden={!open}
      >
        <div className="bg-ms-blue text-white px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 overflow-hidden">
              <Image src="/logo.png" alt="" width={24} height={24} className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">Mentor Sports Assistant</p>
              <p className="text-white/75 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isOnboarding
                  ? onboardingStep === "name"
                    ? "Step 1 of 3 · Your name"
                    : onboardingStep === "phone"
                      ? "Step 2 of 3 · Phone number"
                      : "Step 3 of 3 · How you found us"
                  : profile.name
                    ? `Chatting with ${profile.name}`
                    : "Online · Ready to help"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetChat}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors shrink-0"
            aria-label="Restart conversation"
            title="Start over"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-ms-off-white">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div
                className={`flex items-end gap-2 faq-message-in ${
                  message.role === "user" ? "justify-end flex-row-reverse" : "justify-start"
                }`}
              >
                {message.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-ms-blue flex items-center justify-center shrink-0 overflow-hidden mb-0.5">
                    <Image src="/logo.png" alt="" width={18} height={18} className="object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-ms-red text-white rounded-br-md"
                      : "bg-white text-ms-text border border-ms-border rounded-bl-md shadow-sm"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.link && (
                    <Link
                      href={message.link.href}
                      className={`inline-flex items-center gap-1 mt-2.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                        message.role === "user"
                          ? "bg-white/15 text-white hover:bg-white/25"
                          : "bg-ms-off-white text-ms-blue hover:bg-ms-blue hover:text-white"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {message.link.label} →
                    </Link>
                  )}
                </div>
              </div>

              {message.suggestions && message.suggestions.length > 0 && !isOnboarding && (
                <div className="pl-9 space-y-1.5 faq-message-in">
                  <p className="text-[10px] uppercase tracking-wider text-ms-text-muted flex items-center gap-1">
                    <Sparkles size={10} />
                    You might also ask
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {message.suggestions.map((faq) => (
                      <button
                        key={faq.id}
                        type="button"
                        onClick={() => handleFaqSelect(faq)}
                        disabled={isTyping}
                        className="text-[11px] px-2.5 py-1.5 rounded-full bg-white border border-ms-border text-ms-text hover:border-ms-red hover:text-ms-red hover:shadow-sm transition-all disabled:opacity-50"
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {showWelcomeExtras && (
            <div className="space-y-3 faq-message-in">
              <p className="text-[10px] uppercase tracking-wider text-ms-text-muted pl-1">
                Choose a topic
              </p>
              <div className="grid grid-cols-2 gap-2">
                {faqTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleTopicSelect(topic.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      activeTopic === topic.id
                        ? "border-ms-red bg-ms-red/5 shadow-sm"
                        : "border-ms-border bg-white hover:border-ms-blue hover:shadow-sm"
                    }`}
                  >
                    <span className="text-lg">{topic.icon}</span>
                    <p className="text-xs font-bold mt-1 text-ms-text">{topic.label}</p>
                  </button>
                ))}
              </div>

              {activeTopic && (
                <div className="space-y-1.5 faq-message-in">
                  {faqTopics
                    .find((t) => t.id === activeTopic)
                    ?.faqIds.map((faqId) => {
                      const faq = faqItems.find((f) => f.id === faqId);
                      if (!faq) return null;
                      return (
                        <button
                          key={faq.id}
                          type="button"
                          onClick={() => handleFaqSelect(faq)}
                          disabled={isTyping}
                          className="w-full text-left text-xs px-3 py-2.5 rounded-lg bg-white border border-ms-border hover:border-ms-blue hover:text-ms-blue transition-all disabled:opacity-50"
                        >
                          {faq.question}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {!isOnboarding && (
          <div className="px-3 py-2 border-t border-ms-border bg-white">
            <p className="text-[10px] uppercase tracking-wider text-ms-text-muted mb-2 px-1">
              Popular questions
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {faqItems
                .filter((faq) => !askedIds.has(faq.id))
                .slice(0, 5)
                .map((faq) => (
                  <button
                    key={faq.id}
                    type="button"
                    onClick={() => handleFaqSelect(faq)}
                    disabled={isTyping}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-ms-off-white border border-ms-border text-ms-text whitespace-nowrap hover:border-ms-blue hover:text-ms-blue transition-colors shrink-0 disabled:opacity-50"
                  >
                    {faq.question}
                  </button>
                ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuestion(input);
          }}
          className="flex items-center gap-2 px-3 py-3 border-t border-ms-border bg-white"
        >
          <input
            ref={inputRef}
            type={inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            disabled={isTyping}
            autoComplete={onboardingStep === "name" ? "name" : onboardingStep === "phone" ? "tel" : "off"}
            className="flex-1 px-3 py-2.5 text-sm rounded-lg border border-ms-border focus:outline-none focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/10 disabled:bg-ms-off-white disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-lg bg-ms-red text-white hover:bg-ms-red-dark active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
