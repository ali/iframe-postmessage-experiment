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

  var $form, $frame, $input

  function createMessage(content, sender) {
    return {
      type: 'message',
      payload: {
        content: '' + content,
        sender: sender || 'server'
      }
    }
  }

  function handleMessage(event) {
    var origin = event.origin || event.originalEvent.origin
    if (origin !== window.location.origin) { return }

    if (event.data === 'ready') {
      var message = createMessage('hello there', 'server')
      $frame.contentWindow.postMessage(message, origin)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    var message = createMessage($input.value, 'you')
    $frame.contentWindow.postMessage(message, window.location.origin)
    $form.reset()
    return false
  }

  function main() {
    window.foo = 'bar'
    console.log('parent init. origin: ' + window.location.origin)
    $form = document.getElementById('form')
    $frame = document.getElementById('frame')
    $input = document.getElementById('message')

    window.addEventListener('message', handleMessage, false)
    $form.addEventListener('submit', handleSubmit)
  }

  ready(main)
})()
