function validate(values) {
  const map = {
    title: '标题',
    tab: '发布板块',
    content: '主题内容'
  }
  return ['title', 'tab', 'content'].reduce((errors, field) => {
    if (!values[field]) {
      errors[field] = `${map[field]} 不能为空`
    }
    return errors
  }, {})
}

export default validate