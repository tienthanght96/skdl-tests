const unavailableItems = [
  { startPx: 10, endPx: 30 },
  { startPx: 55, endPx: 65 },
  { startPx: 35, endPx: 50 },
  { startPx: 20, endPx: 40 },
  { startPx: 60, endPx: 70 },
]

const unionOverlappingItems = (items) => {
  if (!items || !items.length) {
    return []
  }

  const sortedItems = items.sort((first, second) => {
    return first.startPx - second.startPx
  })

  const result = []
  let startPx = sortedItems[0].startPx
  let endPx = sortedItems[0].endPx
  let index = 0

  sortedItems.reduce((currentResult, item) => {
    if (item.startPx >= startPx && item.startPx <= endPx) {
      startPx = Math.min(item.startPx, startPx)
      endPx = Math.max(item.endPx, endPx)
    } else {
      startPx = item.startPx
      endPx = item.endPx
      index += 1
    }
    if (!currentResult[index]) {
      result.push({
        startPx: startPx,
        endPx: endPx,
      })
    } else {
      result[index] = {
        startPx: startPx,
        endPx: endPx,
      }
    }
    return currentResult
  }, result)

  return result
}

const unionItems = unionOverlappingItems(unavailableItems)
console.log(unionItems)
