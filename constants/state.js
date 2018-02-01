
// setState(updater, [callback]).

// this.setState((prevState) => {  
//   return {value: prevState.value + 1};
// });

// this.setState((prevState, props) => {
//   return {counter: prevState.counter + props.step};
// });

// shouldComponentUpdate(nextProps, nextState) {
//   return nextProps.text !== this.props.text  
// }


export const crudRender = (tag, screenX, screenY, width, height) => {
  this.crudUpdate(tag, {
    tlX: screenX,
    tlY: screenY,
    brX: screenX + width,
    brY: screenY + height
  });
};

export const crudCreate = title => {
  // Remove tag if it already exists to re-add it to the bottom of the list
  const existingTag = this.state.tags.find(tag => tag.title === title);
  if (existingTag) {
    this.crudDelete(existingTag);
  }
  this.setState(prevState => { 
    return {
      tags: [...prevState.tags, { title }]
    };
  });
};


export const crudUpdate = (tag, props) => {
  this.setState(state => {
    const index = state.tags.findIndex(({ title }) => title === tag.title);
    return {
      tags: [
        ...state.tags.slice(0, index),
        {
          ...state.tags[index],
          ...props
        },
        ...state.tags.slice(index + 1)
      ]
    };
  });
};

export const crudDelete = tag => {
  this.setState(state => {
    const index = state.tags.findIndex(({ title }) => title === tag.title);
    return {
      tags: [
        ...state.tags.slice(0, index),
        ...state.tags.slice(index + 1)
      ]
    };
  });
};

export const filterItemOutOfArr = (key) => {
  let filteredItems = this.state.items.filter(function (item) {
    return (item.key !== key);
  });
  this.setState({
    items: filteredItems
  });
}