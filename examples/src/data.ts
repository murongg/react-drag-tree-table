import type { DragTreeColumnProps } from '../../src/column'

export const columns: DragTreeColumnProps[] = [{
  width: '20%',
  key: 'title',
}, {
  width: '20%',
  key: 'name',
}, {
  width: '20%',
  key: 'desc',
}, {
  width: '20%',
  key: 'state',
}]

export const data = [{
  id: 1,
  title: 'a1',
  name: '啊大叔',
  desc: '撒打算打算打算打',
  state: 1,
}, {
  id: 2,
  title: 'a2',
  name: '啊大叔',
  desc: '撒打算打算打算打',
  state: 1312,
  children: [{
    id: 3,
    title: 'a21',
    name: '啊大叔',
    desc: '撒打算打算打算打',
    state: 1312,
    children: [{
      id: 4,
      title: 'a211',
      name: '啊大叔',
      desc: '撒打算打算打算打',
      state: 1312,
    }],
  }],
}]
