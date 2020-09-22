# Robot Cleaner

### Installation
```
clone or fork repo
npm install
npm run start OR npm run dev (to watch for changes)
```

### Testing
Jest is used for all the test suites. ts-jest is used to avoid the intermediary step of transpiling the files.
```
npm run test
```

### Linting & Type safety
All formatting is handled by Prettier. Additionally, all the strict TS rules are enabled in order to leverage the full might of TypeScript.

### Assumptions

**Input**

I've made the assumption that the user will correctly format their input. Elsewise unexpected behaviour may occur or even cause the program to crash.

**Forego grid**

Although one could interpret the grid as a 2D array/matrix it is in fact not necessary. All that is required is to know the boundaries (-100 000 < o < 100 000), the starting coordinate (and update as the robot traverses the floor) as well as keep a record of the tiles the robot has cleaned.

**Clean tiles**

In order to keep tabs on the tiles (node in the grid) the robot has cleaned, I have opted for an object, not only to efficiently search/modify values but also because I'm only interested in the tiles I have cleaned. This is also to prevent duplication in the instance that the robot traverses back along a route previously taken.

The format is thus:

```
cleanedTiles = {
  1: { // represents y value
    1: true, // represents x value
    2: true
  }
}

the value true is unnecessary, any value would do so long as the object key exists.
```