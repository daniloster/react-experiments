daniloster-base-styles
----------------------
This base styles package defines theme colors, layouts and css features. This packages counts with a series of mixin, such as:
- card
- flyout
- flyoutHoverTransition
- focus
- input
- text
- triangleCorner
- avatar
- grid
- placeInGrid

## files
1. src/index.scss

## How to use

In your `.scss` file:
```
@import '~daniloster-base-styles';

.myClass {
  @include flyout;
}

// Or

.myClass {
  @include flyout(7px 7px 35px -5px rgba(0,0,0,0.45));
}

// Or

.myClass {
  @include flyout($lightCard, 2);
}
```
