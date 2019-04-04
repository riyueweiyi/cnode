import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import DoneAll from '@material-ui/icons/DoneAll'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import { IMessage, IStyle } from '../../type'
import styles from './styles'
import Item from './item'

interface ISetion extends IStyle {
  onClick: (e: IMessage) => void,
  markAll: (e: React.MouseEvent) => void,
  hasnotReadMessages: boolean,
  section: {
    title: string,
    messages: IMessage[]
  }
}

const Section: React.SFC<ISetion> = ({ section, classes, onClick, markAll, hasnotReadMessages }) => {
  return <li className={classes.listSection}>
    <ul className={classes.ul}>
      <ListSubheader className={classes.listSectionSubheader}>
        <p className={classes.subtitle}>{section.title}</p>
        <Button
          type="submit"
          color="primary"
          onClick={markAll}
          disabled={!hasnotReadMessages}
        >
          全部已读 &nbsp;<DoneAll />
        </Button>
      </ListSubheader>
      <Divider />
      {section.messages.map(item => <Item key={item.id} onClick={_ => onClick(item)} item={item}></Item>)}
    </ul>
  </li>
}


export default withStyles(styles)(Section)