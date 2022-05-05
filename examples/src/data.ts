import type { DragTreeColumnProps } from '../../src/column'

export const columns: DragTreeColumnProps[] = [{
  width: '40%',
  key: 'title',
  lable: '标题',
}, {
  width: '30%',
  key: 'name',
  lable: '名称',
}, {
  width: '20%',
  key: 'desc',
  lable: '描述',
}, {
  width: '10%',
  key: 'state',
  lable: '状态',
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
