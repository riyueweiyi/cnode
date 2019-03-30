import { Theme } from '@material-ui/core/styles'
export const styles = (theme: Theme) => ({
  tabs: {
    position: 'fixed',
    background: '#fff',
    width: '100%',
    top: theme.spacing.unit * 7,
    zIndex: 9,
    borderBottom: '1px solid #e5e5e5'
  },
  listview: {
    background: '#f4f4f4',
    marginTop: theme.spacing.unit * 13,
  }
})

export const fab = (theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
})

export const circularProgress = (theme: Theme) => ({
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3,
    minHeight: '30vh',
    background: '#fff'
  }
})

export const CardItemStyle = (theme: Theme) => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    borderRadius: 0,
    boxShadow: 'none'
  },
  actions: {
    padding: '8px 16px'
  },
  tag: {
    display: 'flex',
    '& span': {
      marginTop: theme.spacing.unit * 1,
      marginRight: theme.spacing.unit * 1,
    }
  },
  tab: {
    color: '#3f51b5'
  },
  cardContent: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  }
})

export const flex = (theme: Theme) => ({
  flex: {
    flexGrow: 1,
  }
})
