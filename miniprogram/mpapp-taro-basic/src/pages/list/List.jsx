import React, { Component } from 'react'
import { View } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'

function buildData (offset = 0) {
  return Array(100).fill(0).map((_, i) => i + offset);
}

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index} : {data[index]}
    </View>
  );
})

export default class Index extends Component {
  state = {
    data: buildData(0),
  }

  render() {
    const { data } = this.state
    const dataLen = data.length
    return (
      <VirtualList
        height={500} /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        itemData={data} /* 渲染列表的数据 */
        itemCount={dataLen} /*  渲染列表的长度 */
        itemSize={100} /* 列表单项的高度  */
      >
        {Row}
      </VirtualList>
    );
  }
}