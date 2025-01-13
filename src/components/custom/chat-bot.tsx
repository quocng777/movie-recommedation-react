
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
import { useLazyGetMoviesFromObjectIdsQuery } from "@/app/api/movies/movie-api-slice";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

export type Message = {
  role: string;
  content: ReactNode;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedValue, setSelectedValue] = useState("Navigate");
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
    } else if (data.data?.route == NavigationRoute.SEARCH_PAGE) {
      const displayParams = data?.data?.params.keyword ? " with keyword" + data?.data?.params.keyword : "";
      setMessages((prev) => {
        return [...prev, {
          content: `I redirected you site to find related movies${displayParams}' 🚀`,
          role: 'ai'
        }];
      })
      navigate(`/movie/search?query=${data?.data?.params.keyword}`);
    } else if (data.data?.route == NavigationRoute.MOVIE_PAGE) {
      const displayParams = data?.data?.params[0].name ? " " + data?.data?.params[0].displayParams : "";
      setMessages((prev) => {
        return [...prev, {
          content: `😆, I found the movie${displayParams}, redirected the detailed site for you 🚀`,
          role: 'ai'
        }];
      });
      navigate(`/movie/${data?.data?.params[0].id}`);
    } else if (data.data?.route == NavigationRoute.GENRE_PAGE) {
      let displayParams = data?.data?.params.map((item : { name: string, id: number}) => item.name).join(", ");
      displayParams = displayParams ? " with genres " + displayParams : "";
      setMessages((prev) => {
        return [...prev, {
          content: `😆, I found some movies matching your requirement${displayParams}, redirected to the site for you 🚀`,
          role: 'ai'
        }];
      });
      navigate(`/movie?genres=${data?.data?.params.map((item : { name: string, id: number}) => item.id).join(",")}`);
    } else if (data.data?.route == NavigationRoute.CAST_PAGE) {
      setMessages((prev) => {
        const displayParams = data?.data?.params[0].name ? " " + data?.data?.params[0].name : "";
        return [...prev, {
          content: `😆, I found some actors for the film${displayParams}, redirected the site for you`,
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
        content: "🥲, something went wrong. Please try again later.",
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
        <div className="flex flex-row items-center space-x-2">
          <h1 className="text-lg font-semibold">TMDB2 AI </h1>
          <Select defaultValue={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="text-xs w-28">{selectedValue}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Navigate">Navigate</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
              <SelectItem value="Text">Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                {message.role !== "user" && (
                  <ChatBubbleAvatar src="" fallback={"🤖"} />
                )}
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