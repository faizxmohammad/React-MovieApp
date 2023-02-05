LifeCycle of react Class components :


                                                                                                    
|`constructor() --> render() --> componentDidMount() --> render() --> componentDidUpdate() --> componentWillUnmount()` |


### We have three Phases in React lifecycle:
    Mounting --> Adding component to browser
    Updating --> State update
    Unmounting --> removing component from browser

# Mounting: (Mounting means putting elements into the DOM)
`React has four built-in methods that gets called, in this order, when mounting a component`:

```
    -->  constructor()
    -->  render()
    -->  componentDidMount()
    -->  getDerivedStateFromProps()
    
```


    constructor --> getDerivedStateFromProps --> render --> componentDidMount








    

`The render() method is required and will always be called, the others are optional and will be called if you define them.`

### ------------------------------------------------------------------------------------------------------------
# Updating: Changing the state of a component
    -->  render()
    -->  componentDidUpdate()
    -->  getDerivedStateFromProps()
    -->  shouldComponentUpdate()
    -->  getSnapshotBeforeUpdate()
    

  #####  -->  render() -->  componentDidUpdate()
    

    
### ------------------------------------------------------------------------------------------------------------

# Unmounting: removing elements from the Dom
    -->  componentWillUnmount()

