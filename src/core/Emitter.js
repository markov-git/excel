export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // Уведомляем слушателей если они есть
    // formula.emit('table:select', {a: 1})
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // listening signals
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
// Example
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('artem', data => console.log('Sub', data))
//
//
//
// setTimeout(()=>{
//     emitter.emit('artem', 'the best 2s')
// }, 2000)
//
// setTimeout(()=>{
//     unsub()
//     console.log('unsub')
// }, 3000)
//
// setTimeout(()=>{
//     emitter.emit('artem', 'the best 4s')
// }, 4000)