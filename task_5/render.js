function makeRender(selector) {
    let template = $(selector).html();
    return new Function('data', 'return `' + template + '`');
}