import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [modelResponse, setModelResponse] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const createNewChat = () => {
    setModelResponse(null);
    setMessage(null);
    setCurrentTitle(null);
  };
  const handleOldChatClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setModelResponse(null);
    setMessage(null);
  };
  const getMessages = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/chats/chatCompletions",
        {
          prompt: message,
        }
      );
      if (res.data.success === true) {
        setModelResponse(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && message && modelResponse) {
      setCurrentTitle(message);
    }
    if (currentTitle && message && modelResponse) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, content: message },
        { title: currentTitle, content: modelResponse },
      ]);
    }
  }, [modelResponse, currentTitle]);

  const currentChat = previousChats.filter(
    (previousChats) => previousChats.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleOldChatClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made By Abhishek Sharma</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ChatGPT-Clone by Abhishek Sharma</h1>}
        {currentTitle && <h1>{currentTitle}</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index} className="chatMessage">
              <p className="message">{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              type="text"
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
            />
            <div id="submit" onClick={getMessages}>
              ^
            </div>
          </div>
          <p className="info">
            This is a chatGPT clone that is made as a side project by Abhishek
            Sharma. This poject has its own frontend and backend, it uses the
            openai api to leverage the LLM.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
