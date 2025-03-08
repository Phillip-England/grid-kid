# gridkid
A web component for making responsive css grids.

## Full Example
gridkid is just a web component. Use it like this:

```html
<header>
  <grid-kid at-default='
    "title"
    "sub"
  ' at-500='
    "sub"
    "title"
  ' at-1024='
    "title"
    "sub"
  '></grid-kid>
  <h1 area='title'>title</h1>
  <p area='sub'>sub</p>
</header> 
```

## Grids
Define a grid by place a `<grid-kid>` element within. The direct parent of `<grid-kid>` will be declared a css grid.

## Areas
Assign a grid child an area:

```html
<h1 area='title'>title</h1>
```

## Breakpoints
The `at-default` attribute establishes the mobile version of the grid layout. For other custom breakpoints, use the `at-[BREAKPOINT]` syntax. For example:

```html
  <grid-kid at-default='
    "title"
    "sub"
  ' at-500='
    "sub"
    "title"
  '></grid-kid>
```