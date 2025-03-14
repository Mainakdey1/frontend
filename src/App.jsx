import React, { useEffect, useState } from "react";
import { Chat, Channel, Window, MessageList, MessageInput } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = "bknpx6eut9sj";
const userId = "user1";
const chatClient = StreamChat.getInstance(apiKey);

const App = () => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const connectUser = async () => {
      try {
        console.log("Fetching token...");
        const response = await fetch(`https://backend-47ck.onrender.com/token?user_id=${userId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Token received:", data.token);

        await chatClient.connectUser({ id: userId, name: "User 1" }, data.token);

        console.log("User connected. Now watching channel...");
        const channel = chatClient.channel("messaging", "ai-bot", { name: "AI Chat" });

        if (chatClient.user) {
          await channel.watch();
          console.log("Connected to channel:", channel.id);
          setChannel(channel);
        } else {
          console.error("User connection failed!");
        }


        channel.on("message.new", (event) => {
          console.log("New message received:", event.message.text);
        });

      } catch (error) {
        console.error("Error connecting to chat:", error);
      }
    };

    connectUser();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (!channel) return <div>..... Annoying React problems as per usual</div>;

  return (
    <Chat client={chatClient} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default App;
