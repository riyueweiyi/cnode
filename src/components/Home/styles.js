const styles = theme => ({
  flex: {
    flexGrow: 1,
  },
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
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  card: {
    marginBottom: theme.spacing.unit * 2,
    borderRadius: 0,
    boxShadow: 'none'
  },
  cardContent: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
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
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3,
    minHeight: '30vh',
    background: '#fff'
  }
})

export default styles