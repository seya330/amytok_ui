import { instance } from '@/api/httpUtil';
const RandomChat = {
  chatBoxSizeFix() {
    const chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.style.height = window.innerHeight - 50 - 40 + 'px';
  },
  async findRanChatUser(vm) {
    let { data } = await instance.get('/chat/join', {
      params: {
        sessionId: vm.sessionId,
      },
    });
    return {
      chatRoomId: data.chatRoomId,
      sessionId: data.sessionId,
      responseResult: data.responseResult,
    };
  },

  async cancelWaiting(vm) {
    await instance.post('/chat/cancel', { sessionId: vm.sessionId });
  },
};
export default RandomChat;
