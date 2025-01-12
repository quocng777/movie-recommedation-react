
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { ChangeEvent, ChangeEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { Robot } from "react-bootstrap-icons";
import { useLazyAiNavigationQuery } from "@/app/api/ai/ai-api-slice";
import { NavigationRoute } from "@/app/api/types/ai-navigation.type";
import { useNavigate } from "react-router-dom";

export type Message = {
  role: string;
  content: ReactNode;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [getAiNavigation, {isFetching: isGenerating, data, isSuccess, isError}] = useLazyAiNavigationQuery();

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if(!isSuccess) {
      return;
    }
    if(data?.data?.route == NavigationRoute.NONE) {
      setMessages((prev) => {
        return [...prev, {
          content: "Sorry, I can't find any information with your query 😔",
          role: 'ai'
        }];
      })
    } else if(data.data?.route == NavigationRoute.SEARCH_PAGE) {
      setMessages((prev) => {
        return [...prev, {
          content: "I redirected you site to find related movie 🚀",
          role: 'ai'
        }];
      })
      navigate(`/movie/search?query=${data?.data?.params.keyword}`);
    } else {
      setMessages((prev) => {
        return [...prev, {
          content: "😆, I found some actors, redirected the site for you",
          role: 'ai'
        }];
      })
      navigate(`/movie/${data?.data?.params[0].id}#cast`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if(!isError) {
      return;
    }
    setMessages((prev) => {
      return [...prev, {
        content: "Error: Something went wrong",
        role: 'ai'
      }];
    })
  }, [isError])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!input.trim() || isGenerating) {
      return;
    }
    setMessages(prev => {
      return [...prev, {
        content: input,
        role: 'user',
      }]
    })
    setInput('');
    getAiNavigation({query: input});
  };

  const onInputChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  return (
    <ExpandableChat size="md" position="bottom-right" icon={<Robot />}>
      <ExpandableChatHeader className="bg-muted/60 text-center flex justify-between">
        <h1 className="text-lg font-semibold">TMDB2 AI </h1>
        <Button variant="secondary" onClick={() => setMessages([])}>
            New Chat
        </Button>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList className="bg-muted/25" ref={messagesRef}>
          {/* Initial message */}
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="🤖" />
            <ChatBubbleMessage>
              Hello! What does you want to search on TMDB2?
            </ChatBubbleMessage>
          </ChatBubble>

          {/* Messages */}
          {messages &&
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                variant={message.role == "user" ? "sent" : "received"}
              >
                {message.role !== 'user' && <ChatBubbleAvatar
                  src=""
                  fallback={"🤖"}
                />}
                <ChatBubbleMessage
                  variant={message.role == "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

          {/* Loading */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className="bg-muted/25">
        <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
          <ChatInput
            value={input}
            onChange={onInputChange}
            // onKeyDown={onKeyDown}
            className="min-h-12 bg-background shadow-none "
          />
          <Button
            className="absolute top-1/2 right-2 transform  -translate-y-1/2"
            type="submit"
            size="icon"
            // disabled={isLoading || isGenerating || !input}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}