/*The get property is the function that is to be computed. It can access the value of atoms and other selectors using the get argument passed to it. Whenever it accesses another atom or selector, a dependency relationship is created such that updating the other atom or selector will cause this one to be recomputed.
*/
/*
A selector is a pure function that accepts atoms or other selectors as input. When these upstream atoms or selectors are updated, the selector function will be re-evaluated. Components can subscribe to selectors just like atoms, and will then be re-rendered when the selectors change.

Selectors are used to calculate derived data that is based on state. This lets us avoid redundant state, usually obviating the need for reducers to keep state in sync and valid. Instead, a minimal set of state is stored in atoms, while everything else is efficiently computed as a function of that minimal state. Since selectors keep track of what components need them and what state they depend on, they make this functional approach more efficient.

From the point of view of components, selectors and atoms have the same interface and can therefore be substituted for one another.

Selectors are defined using the selector function:
*/
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});


/*
Atoms are units of state. They're updateable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value. They can be created at runtime, too. Atoms can be used in place of React local component state. If the same atom is used from multiple components, all those components share their state.

Atoms are created using the atom function:
*/

const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});

/*
Atoms need a unique key, which is used for debugging, persistence, and for certain advanced APIs that let you see a map of all atoms. It is an error for two atoms to have the same key, so make sure they're globally unique. Like React component state, they also have a default value.

To read and write an atom from a component, we use a hook called useRecoilState. It's just like React's useState, but now the state can be shared between components:
*/

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}

/*
Clicking on the button will increase the font size of the button by one. But now some other component can also use the same font size:
*/

function Text() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{fontSize}}>This text will increase in size too.</p>;
}


