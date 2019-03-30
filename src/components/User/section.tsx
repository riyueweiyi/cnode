import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import styles from './styles'
import Item from './item'
import { IUserTopic } from '../../type'

interface ISection {
  classes: any,
  section: {
    title: string,
    icon: any,
    topics: IUserTopic[]
  },
  listItemClickHandle: (e: IUserTopic) => void
}
const Section: React.SFC<ISection> = function ({ section, listItemClickHandle, classes }) {
  const Icon = section.icon
  return <li
    key={`section-${section.title}`}
    className={classes.listSection}
  >
    <ul className={classes.ul}>
      <ListSubheader className={classes.listSubTitle}>
        <Icon className={classes.listSubTitleIcon} />
        {section.title}
      </ListSubheader>
      {section.topics.map(topic => (
        <Item key={topic.id} onClick={_ => listItemClickHandle(topic)} topic={topic} />
      ))}
    </ul>
  </li>
}

export default withStyles(styles as any)(Section)