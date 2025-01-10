import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";

export const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);

    // Simple FAQ response system
    const response = getFAQResponse(input.toLowerCase());
    setMessages([...messages, userMessage, { text: response, isUser: false }]);
    setInput("");
  };

  const getFAQResponse = (question: string) => {
    if (question.includes("price") || question.includes("cost")) {
      return "Our property prices range from ₦5,000,000 to ₦500,000,000 depending on location and specifications. Please browse our properties section for detailed pricing.";
    }
    if (question.includes("location") || question.includes("where")) {
      return "We have properties available across major Nigerian cities including Lagos, Abuja, Port Harcourt, and more.";
    }
    if (question.includes("agent") || question.includes("contact")) {
      return "You can contact our agents through the Agents page or call us at +234 801 234 5678.";
    }
    return "Thank you for your question. Please contact our support team for more specific information at support@seler.com";
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-background border rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Chat with Us</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};