



export const formatDate = function (dbDateString) {

  return dbDateString.split('-') // ['2022', '01', '09']
    .map(item => {
      return item[0] === '0' ? item[1] : item
    }) // ['2022', '1', '9']
    .reverse().join('.') // '9.1.2022'
}

// dt, dtToCompare - instance of Date

export const isOlder = function (dt, dtToCompare) {
  return dt.getTime() < dtToCompare.getTime()
}

export const isOlderDateString = function (dtString, dtStringToCompare) {
  return dtString < dtStringToCompare
}

export const isOlderOrEqualDateString = function (dtString, dtStringToCompare) {
  return dtString <= dtStringToCompare
}

