const CURRENT_CHAT_KEY = "@debugbox:currentChat";

export const chatStorage = {
  getCurrentChat: () => {
    return localStorage.getItem(CURRENT_CHAT_KEY);
  },
  setCurrentChat: (chat) => {
    localStorage.removeItem(CURRENT_CHAT_KEY);
    localStorage.setItem(CURRENT_CHAT_KEY, chat);
  },
  clearCurrentChat: () => {
    localStorage.removeItem(CURRENT_CHAT_KEY);
  },
};
