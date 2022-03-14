import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '4wiagbme',
  dataset: 'production',
  apiVersion: 'v1',
  token: 'skocb3I60blZh0i4DzXy8TCvCAgVHOmDTJmenzmsxWFyS3m46bjmjXD5WntSdcFebmLE64LLfibFdhAAMKutEKnlrOXKgqmvOFgnYxgvdMLO3U3JJzvy9Mq42BYZYUTh3fMEOPnImPtp1dipPoet6UV02bcpohxez8U00JwkhKp2rHl3JiKv',
  useCdn: false,
})