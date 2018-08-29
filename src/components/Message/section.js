import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import DoneAll from '@material-ui/icons/DoneAll'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import styles from './styles'
import Item from './item'

const Section = ({ section, classes, onClick, markAll, hasnotReadMessages }) => {
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

Section.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Section)