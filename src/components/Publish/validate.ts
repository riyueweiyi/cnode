import { PublicTopic, IPublishForm } from '../../type'


function validate(values: PublicTopic) {
  const map: IPublishForm = {
    title: '标题',
    tab: '发布板块',
    content: '主题内容'
  }
  return ['title', 'tab', 'content'].reduce((errors, field: string) => {
    if (!values[field]) {
      errors[field] = `${map[field]} 不能为空`
    }
    return errors
  }, {} as any)
}

export default validate