class EventManager {
    listeners = {};

    add(event, fn, context) {
        let event_name = event.split('.')[0];

        if (typeof this.listeners[event_name] === 'undefined') {
            this.listeners[event_name] = [];
        }

        this.listeners[event_name].push({
            id: event,
            fn,
            context,
            status: true
        });
    }

    dispatch(event, props) {
        try {
            let event_name = event.split('.')[0];
            console.log('RUN EVENT: ', event);
            for (let listener of this.listeners[event_name]) {
                if (listener.status) {
                    listener.fn.apply(listener.context, props);
                } 
            }
        } catch (e) {
            console.log(e)
        }
    }

    on(event) {
        this._changeStatus(event, true);
    }

    _changeStatus(event, status) {
        let event_name = event.split('.')[0];
    
        for (let listener of this.listeners[event_name]) {
            if (listener.id === event) {
                listener.status = status;
            }
        }
    }

    off(event) {
        this._changeStatus(event, false);
    }



}