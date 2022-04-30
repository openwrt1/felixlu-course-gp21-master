var ws = new WebSocket('ws://127.0.0.1:9527/')

ws.onopen = () => {
  ws.send('大家好!')
}


ws.onmessage = (msg) => {
  const content = document.getElementById('content')
  content.innerHTML += msg.data + '<br/>'
}

ws.onerror = (err) => {
  console.log(err);
}

ws.onclose = () => {
  console.log('closed~');
}