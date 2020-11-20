import { authInstance } from '@/api/httpUtil';
import ws from '@/api/websocket';
import store from '@/store/index';
const ChatRoom = {
  scrollBottom() {
    const chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  },
  chatBoxSizeFix() {
    const chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.style.height = window.innerHeight - 50 - 40 + 'px';
  },
  async getMessageList(chatRoomId) {
    const { data } = await authInstance.get('/chat/groupChat/chatList', {
      params: {
        readYn: 'Y',
        chatRoomId: chatRoomId,
      },
    });

    return data.messageList;
  },
  sendMessage(messageContents, chatRoomId) {
    ws.sendMessage('/groupChat.message/send', { messageContents, chatRoomId });
  },
  subChatRoom(chatRoomId, vm) {
    ws.subscribe('/public.' + store.state.uniqId + '.message', function({
      body,
    }) {
      let data = JSON.parse(body);
      if (data.chatRoomId == chatRoomId) {
        vm.chatItemList.push(data);
      }
    });
  },
};

export default ChatRoom;
