import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (vnode) {
  const { baseUrl, dbs, selection } = vnode.state
  const loadingClass = dbs() ? '' : 'is-loading'

  const selectDB = () => { vnode.state.selectDB() }
  const listDBs = () => { vnode.state.listDBs() }
  const updateSelection = (v) => { v.dom.value = selection() }

  const keydownBaseUrl = (e) => {
    if (e.keyCode === 13) {
      listDBs()
      return false
    }
  }

  const dbOptions = dbs.map((dbs) => dbs.map(db => {
    return (
      <option {...db} key={db.value} selected={db.value === selection()}>
        {db.label}
      </option>
    )
  }))()

  return (
    <div className='box'>
      <div className='card'>
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
                    value={baseUrl()}
                    oninput={m.withAttr('value', baseUrl)}
                    onkeydown={keydownBaseUrl}
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
                      onupdate={updateSelection}
                      onchange={m.withAttr('value', selection)}>
                      {dbOptions}
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
                    disabled={!/^https?:\/\//.test(baseUrl())}
                    onclick={listDBs}>
                    Refresh DB List
                  </button>
                </div>

                <div className='control'>
                  <button className='button is-primary'
                    disabled={!selection()}
                    onclick={selectDB}>
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
