const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
}

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "管理员",
    avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:"可以看到除户管理页面之外的所有页面",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:"仅能看到Dashboard、开发文档、权限测试和关于作者四个页面",
  },
}
const model = {
  code: 200,
  data: {},
  message: 'success'
}
export default {
  login: (config) => {
    const { username } = JSON.parse(config.body)
    const token = tokens[username]
    if (!token) {
      return {
        status: 1,
        message: "用户名或密码错误",
      }
    }
    return {
      status: 0,
      token
    }
  },
  userInfo: (config) => {
    const token = config.body
    const userInfo = users[token]
    if (!userInfo) {
      model.data = {
        status: 1,
        message: '获取用户信息失败'
      }
      return model
    }
    model.data = {
      status: 0,
      userInfo
    }
    return model
  },
  getUsers: () => {
    model.data = {
      status: 0,
      users: Object.values(users),
    }
    return model
  },
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body)
    const token = tokens[id]
    if (token) {
      delete tokens[id]
      delete users[token]
    }
    model.data = {
      status: 0
    }
    return model
  },
  editUser: (config) => {
    const data = JSON.parse(config.body)
    const { id } = data
    const token = tokens[id]
    if (token) {
      users[token] = { ...users[token], ...data }
    }
    model.data = {
      status: 0
    }
    return model
  },
  ValidatUserID: (config) => {
    const userID = config.body
    const token = tokens[userID]
    if (token) {
      model.data = {
        status: 1
      }
    } else {
      model.data = {
        status: 0
      }
    }
    return model
  },
  addUser: (config) => {
    const data = JSON.parse(config.body)
    const { id } = data;
    tokens[id] = `${id}-token`
    users[`${id}-token`] = {
      ...users["guest-token"],
      ...data
    }
    model.data = {
      status: 0
    }
    return model
  },
  logout: (_) => {
    model.data = {
      status: 0,
      data: 'success'
    }
    return model
  }
}
