import { instance } from '@/api/httpUtil';
const RandomChat = {
  chatBoxSizeFix() {
    const chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.style.height = window.innerHeight - 50 - 40 + 'px';
  },
  async findRanChatUser(vm) {
    let { data } = await instance.get('/chat/join');
    return { chatRoomId: data.chatRoomId, sessionId: data.sessionId };
  },
};
export default RandomChat;
