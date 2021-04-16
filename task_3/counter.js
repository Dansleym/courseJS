(function(){
    console.log('COUNTER');


    let counter_el = document.getElementById('counter');

    em.add('Save.counter', function(tasks){
        counter_el.innerHTML = `( ${tasks.length} )`;
    })
})()