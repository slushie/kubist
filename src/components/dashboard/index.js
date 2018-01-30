import pouch from '@/lib/pouch'
import m from 'mithril'

class Dashboard {
    constructor(vnode) {
        // vnode.state is undefined at this point
        this.kind = "ES6 class"
    }

    oncreate(vnode) {
      console.log('oncreate');
      pouch.local_handler({change: this.change.bind(this), complete: this.complete, error: this.error})
    }

    change(info) {
      this.kind = info.changes[0].rev;
      console.log(info.changes[0].rev, this.kind);
      m.redraw();
    }

    complete(info) {
      console.log('complete', info);
    }

    error(err) {
      console.log('error', err);
    }

    view(vnode) {
      console.log('view', vnode.state);
      return m("div", this.kind)
    }
}

export default Dashboard