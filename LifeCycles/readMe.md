LifeCycle of react Class components :


# --------------------------------------------------------------------------------------------------------------------
|                                                                                                                    |
------------- Mounting Phase ---------------------|    ---------- Updating Phase --------   |  ---Unmounting phase---|
|                                                                                                                    |
|`constructor --> render() --> componentDidMount() --> render() --> componentDidUpdate() --> componentWillUnmount()` |
|                                                                                                                    |
------------- Mounting Phase ---------------------|    ---------- Updating Phase --------   |  ---Unmounting phase---|
|                                                                                                                    |
# --------------------------------------------------------------------------------------------------------------------


we have three Phases in React lifecycle:
    Mounting --> Adding component to browser
    Updating --> State update
    Unmounting --> removing component from browser

# Mounting: (Mounting means putting elements into the DOM)
`React has four built-in methods that gets called, in this order, when mounting a component`:
    -->  constructor()
    -->  render()
    -->  componentDidMount()
    -->  getDerivedStateFromProps()


    constructor --> getDerivedStateFromProps --> render --> componentDidMount








    

`The render() method is required and will always be called, the others are optional and will be called if you define them.`

### ------------------------------------------------------------------------------------------------------------
# Updating:
    -->  render()
    -->  componentDidUpdate()
    -->  getDerivedStateFromProps()
    -->  shouldComponentUpdate()
    -->  getSnapshotBeforeUpdate()
    
### ------------------------------------------------------------------------------------------------------------

# Unmounting:
    -->  componentWillUnmount()

