import React, { useState, useContext } from "react";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { baseUrl, getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";

const UsernameSearch = () => {
  // State to store the search input
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { allUsers, userChats, notifications, createChat, updateCurrentChat } =
    useContext(ChatContext);
  const modifiedNotifications = notifications.map((n) => {
    // assign notification with sender name
    const sender = allUsers.find((user) => user._id === n.senderId);

    return { ...n, senderName: sender?.name };
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // trigger the username search
    if (query.length !== 0) {
      try {
        const response = await getRequest(
          `${baseUrl}/users/search-user?search=${query}`,
        );
        if (response.error) {
          throw error;
        } else {
          setResults(response.length > 0 ? response : null);
        }
      } catch (error) {
        console.error(error);
        setResults(null);
      }
    } else {
      setResults(null);
    }
    setLoading(false);
  };

  const getUserChats = (firstId, secondId) => {
    try {
      const desiredChat = userChats.find((chat) => {
        const chatMembers = [firstId, secondId];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      if (desiredChat === undefined) {
        throw error;
      } else {
        updateCurrentChat(desiredChat);
      }
    } catch (error) {
      console.log("creating chat");
      createChat(firstId, secondId);
      return;
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSearch}
        style={{
          width: "380px",
          margin: "10px 0px",
        }}
      >
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search for a user"
            value={query}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="primary" className="single-user">
            Search
          </Button>
        </InputGroup>
      </Form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="search-results">
          {results ? (
            <ListGroup className="search-results-list">
              {results.map((resultUser, index) => (
                <ListGroup.Item
                  action
                  key={index}
                  onClick={() => {
                    {
                      modifiedNotifications?.length === 0
                        ? getUserChats(user._id, resultUser._id)
                        : modifiedNotifications.map((n) => {
                            markNotificationAsRead(
                              n,
                              userChats,
                              user,
                              notifications,
                            );
                          });
                    }
                  }}
                >
                  {resultUser.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : null}
        </div>
      )}
    </>
  );
};

export default UsernameSearch;
