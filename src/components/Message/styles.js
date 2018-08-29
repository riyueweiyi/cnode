
const styles = theme => {
  return {
    fontSize: {
      fontSize: 14
    },
    subtitle: {
      fontSize: 16,
      color: '#333'
    },
    time: {
      color: '#b1b1b1'
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    listSectionSubheader: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    empty: {
      marginTop: theme.spacing.unit * 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: '#999'
    },
    emptyIcon: {
      fontSize: theme.spacing.unit * 10,
    },
    emptyText: {
      fontSize: 14,
      marginTop: theme.spacing.unit
    },
  }
}

export default styles