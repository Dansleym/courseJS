//jQuery;
//$;

$(document).ready(function() {

    const $todo_app = $('#todo_app');
    const $todo_list = $todo_app.find('.js_todo_list');
    const $add_btn = $todo_app.find('.js_add_btn');
    const $save_btn = $todo_app.find('.js_save_btn');
    const $cancel_btn = $todo_app.find('.js_cancel_btn');
    const $add_input = $todo_app.find('.js_add_input');
    const $show_users_btn = $todo_app.find('.js_show_users');
    
    let todo_items = JSON.parse(localStorage.getItem('todo_items')) || [{
        name: 'First',
        status: false
    },{
        name: 'Second',
        status: false
    }];

    function render() {
        let todo_items_html = todo_items.map((el) => {
            return `
                <div class="js_todo_item">
                    <span style="cursor: pointer;" class="js_change_status ${el.status ? 'line-through' : ''}">${el.name}</span>
                    <button class="js_edit" type="button">!</button>
                    <button class="js_remove" type="button">x</button>
                </div>`;
        }).join('');

        $todo_list.html(todo_items_html);
    }

    function save() {
        localStorage.setItem('todo_items', JSON.stringify(todo_items));
    }

    function editStart(index) {
        let todo_item = todo_items[index];
        $add_input.data('index', index);
        $add_btn.hide();
        $save_btn.show();
        $cancel_btn.show();
        $add_input.val(todo_item.name);
    }

    function editEnd() {
        $add_btn.show();
        $save_btn.hide();
        $cancel_btn.hide();
        $add_input.val('');
    }


    $todo_app.on('click.edit', '.js_edit', function(e) {
        console.log(e.target);
        console.log(this);
        let $this = $(this);

        let index = $this.closest('.js_todo_item').index();
        editStart(index);
        //alert(index);

    });

    $todo_app.on('click.remove', '.js_remove', function(e) {
        //alert('Remove');
        let $this = $(this);
        let $todo_item = $this.closest('.js_todo_item');
        let index = $todo_item.index();
        todo_items.splice(index, 1);
        save();

        $todo_item.hide(500, render);
        //render();
    });

    $todo_app.on('click.change.status', '.js_change_status', function() {
        let index = $(this).closest('.js_todo_item').index();
        todo_items[index].status = !todo_items[index].status;
        save();
        render();
    });

    $add_btn.on('click.add', function() {
        todo_items.push({
            name: $add_input.val(),
            status: false
        });

        $add_input.val('');

        save();
        render();

    });

    $add_input.on('keydown', function(e) {
        if (e.code === 'Enter') {
            $add_btn.click();
        }
    });

    $cancel_btn.on('click.cancel', function() {
        editEnd();
    });

    $save_btn.on('click.cancel', function() {
        let index = $add_input.data('index');

        todo_items[index].name = $add_input.val();
        save();
        render();
        editEnd();
    });

    $(document).on('show_todo', function(e, index) {
        //alert(index);

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            method: 'POST',
            data: {
                userId: index
            }
        }).done(function(data) {
            console.log(data);

            todo_items = data.map(function(item) {
                return {
                    name: item.title,
                    status: item.completed
                };
            })

            render();

            $todo_app.show();
        });


        /* let d1 = $.Deffered();
        let d2 = $.Deffered();

        $.when(d1, d2);


        d1.resolve();
        d1.reject(); */

    });
    
    $show_users_btn.on('click', function() {
        $todo_app.hide();
        $(document).trigger('show_users');
    });


    render();
    editEnd();

});