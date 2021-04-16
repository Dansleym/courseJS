class EventManager {
    listeners = {};

    add(event, fn, context) {
        
        let event_name = event.split('.')[0];

        if ( !Array.isArray(this.listeners[event_name]) ) {
            this.listeners[event_name] = [];
        }

        this.listeners[event_name].push({
            fn,
            context,
            status: true,
            id: event
        })
    }

    dispatch(event, args) {
        try {
            let event_name = event.split('.')[0];
            console.log('RUN EVENT: ', event);
            
            if (typeof this.listeners[event_name] === 'undefined') {
                return;
            }

            for (let listener of this.listeners[event_name]) {
                if (listener.status) {
                    listener.fn.apply(listener.context, args);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    _changeStatus(event, status) {
        let event_name = event.split('.')[0];
        for (let listener of this.listeners[event_name]) {
            if (listener.id === event) {
                listener.status = status;
            }
        }
    }

    on(event) {
        this._changeStatus(event, true);
    }

    off(event) {
        this._changeStatus(event, false);
    }

    remove(event) {
        let event_name = event.split('.')[0];

        if (event_name === event) {
            delete this.listeners[event];
        } else {
            this.listeners[event_name] = this.listeners[event_name].filter(function(listener) {
                return !(listener.id === event);
            })
        }

    }
}