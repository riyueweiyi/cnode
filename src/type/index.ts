
export interface ILoginName {
  loginname: string
}

export interface IAuthor extends ILoginName {
  avatar_url: string
}

export interface ILoginInfo extends ILoginName {
  accesstoken: string
}

export type TabKey = 'good' | 'share' | 'ask' | 'job'
export type AllTabKey = TabKey & ''

export type TabType = {
  [p in TabKey]: string
}
export interface ITopic {
  good: boolean,
  top: boolean,
  author: IAuthor,
  tab: TabKey,
  create_at: string,
  visit_count: number,
  title: string,
  reply_count: number
}

export interface ITopicDetail extends ITopic {
  content: string
}

export type TopicPos = {
  tab: AllTabKey,
  page: number,
  pageSize: number,
  scrollY: number
}

export interface LoadTopicsParams {
  tab: AllTabKey,
  page: number,
  limit: number
}

export interface PublicTopic {
  tab: AllTabKey,
  title: string,
  content: string,
  [k: string]: any
}

export interface IMessage {
  id: string,
  type: string,
  has_read: boolean,
  author: IAuthor,
  create_at: string,
  topic: {
    id: string,
    title: string,
    last_reply_at: string
  },
  reply: {
    id: string
    content: string,
    ups: [],
    create_at: string
  }
}

export interface IUserTopic {
  author: IAuthor,
  last_reply_at: string,
  title: string,
  id: string
}

export interface IReply {
  id: string,
  is_uped: boolean,
  ups: [],
  author: IAuthor,
  content: string
}

export interface IReplyForm {
  reply: string,
  [k: string]: any
}

export interface IPublishForm {
  title: string,
  content: string,
  tab: string,
  [k: string]: any
}

export interface ILoginForm {
  accesstoken: string,
  [k: string]: any
}