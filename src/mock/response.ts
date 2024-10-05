import Mock from 'mockjs'

Mock.setup({
  timeout: 300,
})

const response = (data: any) => {
  return {
    code: 200,
    msg: 'success',
    result: data,
  }
}

export default response
