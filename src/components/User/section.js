import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import styles from './styles'
import Item from './item'

const Section = function ({ section, listItemClickHandle, classes }) {
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


Section.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Section)