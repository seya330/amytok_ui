import { authInstance } from '@/api/httpUtil';
import ws from '@/api/websocket';
import store from '@/store/index';
const ChatRoom = {
  scrollBottom() {
    const chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  },
  async getMessageListInit(vm) {
    let param = {
      chatRoomId: vm.chatRoomId,
      'pagingVO.orderBy': 'ASC',
      init: true,
    };

    const { data } = await authInstance.get('/topic/chatList', {
      params: param,
    });
    console.log(data);
    vm.maxPageNo = data.paging.maxPageNo;
    return data.topicChatMessageList;
  },
  sendMessage(messageContents, chatRoomId) {
    ws.sendMessage('/topic.message/send', { messageContents, chatRoomId });
  },
  subChatRoom(chatRoomId, vm) {
    ws.subscribe('/public.' + chatRoomId + '.message', function({ body }) {
      let data = JSON.parse(body);
      vm.chatItemList.push(data);
      vm.$nextTick(() => {
        const chatBox = document.getElementsByClassName('chat-box')[0];
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    });
  },
  async getMessageList(vm) {
    const { data } = await authInstance.get('/topic/chatList', {
      params: {
        chatRoomId: vm.chatRoomId,
        'pagingVO.maxPageNo': vm.maxPageNo,
        'pagingVO.pageNo': vm.viewingPageNo,
        'pagingVO.orderBy': 'DESC',
      },
    });
    return data.topicChatMessageList;
  },
};

export default ChatRoom;
