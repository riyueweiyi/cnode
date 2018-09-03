const styles = theme => ({
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit * 2
  },
  loginname: {
    marginLeft: theme.spacing.unit * 2
  },
  header: {
    marginTop: theme.spacing.unit * 7
  },
  subheader: {
    display: 'flex',
    fontSize: 14,
    color: '#999',
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    justifyContent: 'space-between'
  },
  cardActions: {
    paddingRight: 12,
    justifyContent: 'flex-end'
  },
  secondary: {
    color: '#f44336',
    border: '1px solid #f44336',
    display: 'inline-block',
    padding: '0 3px',
    borderRadius: 4,
    background: '#fff'
  },
  primary: {
    color: '#1d8bf1',
    border: '1px solid #1d8bf1',
    display: 'inline-block',
    padding: '0 3px',
    borderRadius: 4,
    background: '#fff',
    marginRight: theme.spacing.unit / 2
  },
  descJob: {
    fontSize: 16,
    color: '#666'
  },
  visit: {
    color: '#999',
    fontSize: 14
  },
  ups: {
    fontSize: 14
  },
  upsIcon: {
    marginRight: theme.spacing.unit / 2,
  },
  drawerTitle: {
    padding: theme.spacing.unit * 2,
    paddingBottom: 0
  },
  formFixed: {
    position: 'fixed',
    bottom: 0,
    zIndex: 9,
    width: '100%',
    background: '#fff',
    padding: '8px 0 0px 16px',
    borderTop: '1px solid #e5e5e5'
  },
  form: {
    paddingLeft: theme.spacing.unit * 2,
  }
})

export default styles