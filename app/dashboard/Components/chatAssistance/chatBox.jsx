"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  User,
  Bot,
  Heart,
} from "lucide-react";

const MedicalChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your AI Medical Assistant. I can help you with symptom analysis, medical questions, and provide health guidance. Please describe your symptoms or ask any medical questions you have.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    const structuredPrompt = `
You are a caring and professional medical AI assistant.

A patient reports the following symptoms:
${inputMessage}

Use bullet points for lists, and bold key terms for emphasis and highest text 2-3 line every step.
`;

    try {
      // Simulating API call with setTimeout for demo
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "bot",
          content: `## Possible Causes
Based on your symptoms, here are some **potential causes**:

• **Common cold or flu** - Often includes fever, headache, and body aches
• **Stress or tension** - Can manifest as physical symptoms
• **Dehydration** - May cause headaches and general discomfort

## What You Can Do
• **Rest** and get plenty of sleep
• **Stay hydrated** with water and clear fluids
• **Monitor your temperature** regularly
• **Take over-the-counter pain relievers** if needed

## When to Seek Medical Care
• If symptoms worsen or persist beyond 48 hours
• If you develop severe symptoms like difficulty breathing
• If you have underlying health conditions`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      const fallback = {
        id: messages.length + 2,
        type: "bot",
        content:
          "An error occurred while processing your symptoms. Please try again later.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, fallback]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const suggestedQuestions = [
    "I have a headache and fever, what could it be?",
    "What are the symptoms of diabetes?",
    "How to manage high blood pressure?",
    "When should I see a doctor for chest pain?",
  ];

  return (
    <div className="lg:h-[900px] md:h-[900px] sm:h-[650px] bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header - Hidden on mobile for more space */}
      <div className="hidden sm:block bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                MedAssist AI Doctor
              </h1>
              <p className="text-sm text-gray-600">
                Get expert medical advice and diagnosis support
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden bg-white shadow-sm border-b border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">MedAssist AI</h1>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-blue-600"
                        : "bg-gradient-to-r from-red-500 to-pink-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    )}
                  </div>

                  {/* Bot messages use ReactMarkdown */}
                  {message.type === "bot" ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 lg:p-6 mt-1 shadow-sm">
                      <div className="prose prose-sm sm:prose-base max-w-none">
                        <ReactMarkdown
                          components={{
                            h2: ({ node, children }) => {
                              const text = String(children).toLowerCase();
                              let color = "";
                              if (text.includes("possible")) color = "text-teal-600";
                              else if (text.includes("what you can"))
                                color = "text-green-600";
                              else if (
                                text.includes("emergency") ||
                                text.includes("seek")
                              )
                                color = "text-red-600";

                              return (
                                <h2 className={`text-base sm:text-lg font-semibold mb-2 ${color}`}>
                                  {children}
                                </h2>
                              );
                            },
                            ul: ({ node, children }) => (
                              <ul className="list-disc list-inside pl-2 sm:pl-4 space-y-1">{children}</ul>
                            ),
                            li: ({ node, children }) => (
                              <li className="text-sm sm:text-base leading-relaxed">{children}</li>
                            ),
                            strong: ({ node, children }) => (
                              <strong className="font-semibold">{children}</strong>
                            ),
                            p: ({ node, children }) => (
                              <p className="mb-2 text-sm sm:text-base leading-relaxed">{children}</p>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <p className="text-xs mt-2 text-gray-500">
                        {message.timestamp}
                      </p>
                    </div>
                  ) : (
                    <div className="relative px-3 sm:px-4 py-2 rounded-2xl bg-blue-600 text-white rounded-tr-md">
                      <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <p className="text-xs mt-1 text-blue-100">{message.timestamp}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="bg-white px-3 sm:px-4 py-2 rounded-2xl rounded-tl-md shadow-sm border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-2 sm:px-4 py-2 bg-white border-t max-w-4xl mx-auto w-full">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm border border-gray-200 hover:bg-gray-50 transition flex-shrink-0"
              >
                <span className="block sm:hidden">
                  {question.length > 25 ? question.substring(0, 25) + "..." : question}
                </span>
                <span className="hidden sm:block">{question}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="bg-white border-t border-gray-200 p-2 sm:p-4">
          <div className="flex items-end space-x-2 max-w-4xl mx-auto">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">
              <Paperclip className="h-5 w-5" />
            </button>

          <div className="flex-1 relative min-w-0">
<textarea
  ref={inputRef}
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder="Describe your symptoms or ask a medical question..."
  className="w-full px-3 sm:px-4 py-4 sm:py-6 pr-10 sm:pr-12 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-auto text-sm sm:text-base"
  rows={1}
  style={{
    minHeight: "80px",
    maxHeight: "200px", // allows it to grow on all devices
  }}
/>

  <button
    onClick={toggleRecording}
    className={`absolute right-2 top-2 p-1 rounded-full transition-colors ${
      isRecording
        ? "bg-red-500 text-white"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    {isRecording ? (
      <MicOff className="h-3 w-3 sm:h-4 sm:w-4" />
    ) : (
      <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
    )}
  </button>
</div>


            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ""}
              className={`p-2 rounded-lg transition-colors ${
                inputMessage.trim() === ""
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-2 sm:p-3 text-center text-red-500 text-xs max-w-4xl mx-auto w-full">
          <span className="block sm:hidden">
            Always consult healthcare professionals for proper diagnosis.
          </span>
          <span className="hidden sm:block">
            Suggested medical questions appear above. Always consult with
            healthcare professionals for proper diagnosis and treatment.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedicalChatAssistant;