import httpService from './http.service'

const commentsEndpoint = 'comment/'
const commentsService = {
  createComment: async (payLoad) => {
    const { data } = await httpService.put(
      commentsEndpoint + payLoad._id,
      payLoad
    )

    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentsEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentsEndpoint + commentId)
    return data
  }
}
export default commentsService
