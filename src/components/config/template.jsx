import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (vnode) {
  const { listing, baseUrl, dbs, selected } = vnode.state
  const loadingClass = listing ? 'is-loading' : ''

  const listDBs = () => { vnode.state.listDBs() }
  const configureDB = () => { vnode.state.configureDB() }

  const setBaseUrl = (v) => { vnode.state.setBaseUrl(v) }
  const setSelected = (v) => { vnode.state.setSelected(v) }

  if (dbs.length === 0) {
    dbs.push({
      disabled: true,
      value: '',
      title: 'No databases available'
    })
  }

  return (
    <div class='box'>
      <div class='card'>
        <header className='card-header'>
          <p className='card-header-title'>
            Choose a Database
          </p>
        </header>

        <div className='card-content'>
          <div className='columns'>
            <div className='column'>
              <label className='label' htmlFor='base-url'>
                Remote Server URL
              </label>

              <div className='field'>
                <div className={'control is-expanded ' + loadingClass}>
                  <input type='url' id='base-url'
                    value={baseUrl}
                    oninput={m.withAttr('value', setBaseUrl)}
                    onkeydown={(e) => { if (e.keyCode === 13) listDBs() }}
                    placeholder='ex, http://localhost:5984/'
                    className='input' />
                </div>
              </div>
            </div>
          </div>

          <div className='columns'>
            <div className='column'>
              <label htmlFor='select-db' className='label'>
                Available Databases:
              </label>

              <div className='field'>
                <div className='control is-expanded'>
                  <div className='select is-fullwidth'>
                    <select id='select-db'
                      onupdate={(v) => setSelected(v.dom.value)}
                      onchange={m.withAttr('value', setSelected)}>
                      {dbs.map(db => m('option', db, db.title))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='columns'>
            <div className='column'>
              <div className='field is-grouped is-grouped-right'>
                <div className='control'>
                  <button className='button is-info'
                    disabled={!/^https?:\/\/\w+/.test(baseUrl)}
                    onclick={listDBs}>
                    Refresh DB List
                  </button>
                </div>

                <div className='control'>
                  <button className='button is-primary'
                    onclick={configureDB}
                    disabled={!selected}>
                    Select DB
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
