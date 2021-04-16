(function(){
  const USERS_LINK = 'https://jsonplaceholder.typicode.com/users';
//============ Custom FETCH FN EXAMPLE =========================
  function customFetch(url, settings = {}) {
    settings = Object.assign({
      method: 'GET',
      async: true,
      type: 'json',
      body: {}
    }, settings);

    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(settings.method, url, settings.async);
      xhr.responseType = settings.type;
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      if (settings.method !== 'GET') {
        xhr.send(JSON.stringify(settings.body));
      } else {
        xhr.send();
      }

      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response, xhr);
        } else {
          reject(xhr.response, xhr);
        }
      }
      
      xhr.onerror = () => {
        reject(xhr.response, xhr);
      }
    })
  }

//============  GET REQUEST ==================================
/* customFetch(USERS_LINK).then((response) => {
  console.log('GET REQUEST then1 --->', response);
}).catch((response) => {
  console.log('GET REQUEST catch --->', response);
}).then((response) => {
  console.log('GET REQUEST then2 --->', response);
}) */
//============  GET REQUEST END ==================================


//============  GET REQUEST With ERROR ==================================
/* customFetch(USERS_LINK + 'asdas').then((response) => {
  console.log('GET REQUEST With ERROR then1 --->', response);
}).catch((response) => {
  console.log('GET REQUEST With ERROR catch --->', response);
}).then((response) => {
  console.log('GET REQUEST With ERROR then2 --->', response);
}) */
//============  GET REQUEST With ERROR END ==================================


//============  POST REQUEST ==================================
/* customFetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: {
    id: 55,
    title: 'Test Title',
    userId: 8
  }
}).then((response) => {
  console.log('POST REQUEST then1 --->', response);
}).catch((response) => {
  console.log('POST REQUEST catch --->', response);
}).then((response) => {
  console.log('POST REQUEST then2 --->', response);
}) */
//============  POST REQUEST END ==================================;

/* (async function() {
  let response = await fetch(USERS_LINK);
})() */


/* fetch(USERS_LINK).then((response) => response.json()).then((data) => {
  console.log('Fetch Data', data);
}).catch((response) => {
  console.log('REQUEST fetch catch --->', response);
}).then((response) => {
  console.log('REQUEST fetch then2 --->', response);
}); */


let requests_arr = [];

requests_arr.push(fetch(USERS_LINK));
requests_arr.push(fetch(USERS_LINK));
requests_arr.push(fetch(USERS_LINK));
requests_arr.push(fetch(USERS_LINK));
requests_arr.push(fetch(USERS_LINK));


Promise.all(requests_arr).then((responses_arr) => {
  //console.log('All responses', responses_arr);
}).catch(() => {

})

fetch(' https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderTask(data);
    });

function renderTask(data) {
  let task = document.querySelector(".task");
  let text = '';
  for(let item of data) {
    text += `<li>${item.name} - ${item.phone}</li>`
  }
  task.innerHTML = text;
}


})();