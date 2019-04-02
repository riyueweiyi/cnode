import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { styles } from './styles'
import { AllTabKey, IStyle } from '../../type'

interface IFullWidth extends IStyle {
  tab: AllTabKey,
  handleChange(e: React.ChangeEvent<{}>, value: AllTabKey): void,
}

const FullWidthTabs: React.SFC<IFullWidth> = ({ tab, handleChange, children, classes }) => {
  return (
    <div>
      <Tabs
        value={tab}
        onChange={handleChange}
        fullWidth
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        <Tab label="全部" value="" />
        <Tab label="精华" value="good" />
        <Tab label="分享" value="share" />
        <Tab label="问答" value="ask" />
        <Tab label="招聘" value="job" />
      </Tabs>
      <Typography component="div" className={classes.listview}>
        {children}
      </Typography>
    </div>
  )
}

export default withStyles(styles as any, { withTheme: true })(FullWidthTabs)