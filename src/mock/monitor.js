const model = {
  code: 200,
  data: {},
  message: 'success'
}
export default {
  monitor: (config) => {
    model.data = {
      status: 1,
      message: "monitor",
    }
    return model
  }
}