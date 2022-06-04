



export const formatDate = function (dbDateString) {

  return dbDateString.split('-') // ['2022', '01', '09']
    .map(item => {
      return item[0] === '0' ? item[1] : item
    }) // ['2022', '1', '9']
    .reverse().join('.') // '9.1.2022'
}

