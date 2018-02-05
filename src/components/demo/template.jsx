import m from 'mithril' // eslint-disable-line no-unused-vars

import Tag from '@/components/tag'
import TagList from '@/components/taglist'

export default function (vnode) {
  return (
    <div>
      <div>
        <Tag type='primary' size='m' rounded='true'>
          Testing
        </Tag>
        <Tag type='warning'>
          Warning!
          <button className='delete'/>
        </Tag>
        <Tag type='danger' delete='true'/>
      </div>
      <div className='field is-grouped is-grouped-multiline'>
        <div className='control'>
          <TagList addons='true'>
            <Tag type='danger'>
              Warning!
            </Tag>
            <a class="tag is-delete"></a>
          </TagList>
        </div>
        <div className='control'>
          <TagList addons='true'>
            <Tag type='dark'>build</Tag>
            <Tag type='success'>passing</Tag>
          </TagList>
        </div>
        <div className='control'>
          <TagList addons='true'>
            <Tag type='dark'>library</Tag>
            <Tag type='info'>0.5.2</Tag>
          </TagList>
        </div>
      </div>
    </div>
  )
}
