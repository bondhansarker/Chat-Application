import consumer from "./consumer"


$(document).on('turbolinks:load',function() {

  const room_id = Number($("#room_id").attr("data_room_id"));


  consumer.subscriptions.subscriptions.forEach((subscription) => {
    consumer.subscriptions.remove(subscription)
})



  consumer.subscriptions.create({channel:"RoomChannel",room_id: room_id},{

    connected()
    {
      console.log("connected");
      // Called when the subscription is ready for use on the server
    },

    disconnected()
    {
      console.log("disconnected");

      // Called when the subscription has been terminated by the server
    },

    received(data) {
      let html;
      const user_id = Number($("#user_id").attr("data_user_id"));
      const data_user_id = Number(data.message.user_id);
      if(user_id === data_user_id)
      {
        html = data.mine;
      }
      else
      {
        html = data.theirs;
      }
      const messages = document.getElementById("messages");
      messages.innerHTML =  messages.innerHTML + html;
      console.log(data.message.user_id);
      var scroll=$('#messages');
      scroll.animate({scrollTop: scroll.prop("scrollHeight")});

      // Called when there's incoming data on the websocket for this channel
    }
  });

});

var submit_messages;

$(document).on('turbolinks:load',function()
{
  var scroll=$('#messages');
  scroll.animate({scrollTop: scroll.prop("scrollHeight")});
  submit_messages();
});

submit_messages = function() {
  $('form').on('submit',function(){
    $('#message_content').on('keyup',function(){
      if (event.keyCode === 13)
      {

        event.target.value = "";
        event.preventDefault();
      }
    })
  });
}

