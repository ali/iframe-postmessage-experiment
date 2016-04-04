(function() {
  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
        fn();
      });
    }
  }
  var $messages

  function handleMessage(event) {
    var origin = event.origin || event.originalEvent.origin
    if (origin !== window.location.origin) { return }

    if (event.data.type === 'message') {
      var $message = document.createElement('tr')
      var $sender = document.createElement('th')
      var $content = document.createElement('td')
      $sender.innerText = event.data.payload.sender
      $sender.className = 'message__sender'
      $content.innerText = event.data.payload.content
      $content.className = 'message__content'
      $content.colspan = '4'
      $message.appendChild($sender)
      $message.appendChild($content)
      $messages.appendChild($message)
      window.scrollTo(0, document.body.scrollHeight)
    }
  }

  function main() {
    console.log('child init. origin: ' + window.location.origin)
    $messages = document.getElementById('messages')
    window.addEventListener('message', handleMessage, false)
    window.parent.postMessage('ready', window.parent.location.origin)

    var h = document.createElement('h1')
    h.innerText = 'big heading from inside frame'
    window.parent.document.getElementById('app').appendChild(h)
  }

  ready(main)
})()
