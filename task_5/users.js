$(document).ready(function() {

    const $users_app = $('#users_app');
    const $users_list = $users_app.find('.js_users_list');

    let users = [{name: 'hi'}];

    let renderUser = makeRender('.js_user_template');

    function renderUsers() {
        let users_html = users.map(function(user) {
            if(user.id === 3 || user.postId === 15){
                return renderUser(user);
            }
        }).join('');

        $users_list.html(users_html);
    }

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/comments',
        method: 'GET',
        data: {},
    }).done(function(data) {
        users = data;
            console.log(data);
            renderUsers();
    })

    renderUsers();
});