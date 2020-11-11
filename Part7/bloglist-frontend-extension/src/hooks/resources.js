import { useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  console.log(resources)

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => setResources(response.data))
  }

  const create = async resource => {
    console.log(token)
    const config = {
      headers: { Authorization: token },
    }
    console.log(config)
    const response = await axios.post(baseUrl, resource, config)
    return setResources(resources.concat(response.data))
  }

  const remove = id => {
    const config = {
      headers: { Authorization: token },
    }

    axios.delete(`${baseUrl}/${id}`, config)
    return setResources(resources.filter(r => r.id !== id))
  }

  //   doesn't update UI directly like before, have to refresh for it to work

  const update = (id, resource) => {
    const request = axios.put(`${baseUrl}/${id}`, resource)
    const index = resources.findIndex(r => r.id === id)
    request.then(response =>
      resources[index] = response.data)
    return setResources(resources)
  }

  const service = {
    setToken,
    getAll,
    create,
    update,
    remove
  }

  return [
    resources, service
  ]
}

