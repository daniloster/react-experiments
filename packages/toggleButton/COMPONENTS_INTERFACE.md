= Components

:numbered:


== File: **

=== ToggleButton

Button that switches between checked and unchecked.   
E.g.   
```   
class Example extends Component {   
  state = {   
    isLightOn: false,   
  }   
   
  toggle = () => {   
    this.setState(({ isLightOn }) => {   
      return { isLightOn: !isLightOn };   
    })   
  }   
   
  render() {   
    return (   
      <ToggleButton   
        onChange={this.toggle}   
        isChecked={this.state.isLightOn}   
      >Lights?</ToggleButton>   
    );   
  }   
}   
   
...   
   
<Example />   
```   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|className applied to the container element in order to change styles from outer world.
|children|node|no|null|It is the label representative for the element.
|nodeOn|node|no|&lt;See the source code&gt;|It is the representative element for checked.
|nodeOff|node|no|&lt;See the source code&gt;|It is the representative element for unchecked.
|onChange|func|yes||It is the event handler for toggling.
|isChecked|bool|yes||It is the value for checked/unchecked representation.

|===


